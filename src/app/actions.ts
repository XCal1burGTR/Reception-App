'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTenant(tenantId: string) {
    try {
        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId },
            include: { employees: true },
        })
        return tenant
    } catch (error) {
        console.error('Error fetching tenant:', error)
        return null
    }
}

export async function submitVisit(formData: FormData) {
    const tenantId = formData.get('tenantId') as string
    const visitorName = formData.get('visitorName') as string
    const visitorPhone = formData.get('visitorPhone') as string
    const visitorAddress = formData.get('visitorAddress') as string
    const purpose = formData.get('purpose') as string
    const visitorCompany = formData.get('visitorCompany') as string
    const hostName = formData.get('hostName') as string

    if (!tenantId || !visitorName || !visitorPhone || !hostName) {
        return { error: 'Missing required fields' }
    }

    try {
        // Try to find employee by name
        const hostEmployee = await prisma.employee.findFirst({
            where: {
                tenantId,
                name: {
                    equals: hostName,
                    mode: 'insensitive',
                },
            },
        })

        const visit = await prisma.visit.create({
            data: {
                tenantId,
                visitorName,
                visitorPhone,
                visitorAddress,
                purpose,
                visitorCompany,
                hostName,
                hostEmployeeId: hostEmployee?.id,
            },
            include: {
                host: true,
                tenant: true,
            }
        })

        revalidatePath(`/check-in/${tenantId}`)
        revalidatePath('/admin')
        return { success: true, visit }
    } catch (error) {
        console.error('Error submitting visit:', error)
        return { error: 'Failed to submit visit' }
    }
}

export async function getVisits(tenantId?: string) {
    try {
        const whereClause = tenantId ? { tenantId } : {}
        const visits = await prisma.visit.findMany({
            where: whereClause,
            include: {
                host: true,
                tenant: true
            },
            orderBy: { checkInTime: 'desc' },
        })
        return visits
    } catch (error) {
        console.error('Error fetching visits:', error)
        return []
    }
}

export async function getTenants() {
    try {
        const tenants = await prisma.tenant.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return tenants
    } catch (error) {
        console.error('Error fetching tenants:', error)
        return []
    }
}

export async function createTenant(formData: FormData) {
    const name = formData.get('name') as string
    const slackWebhookUrl = formData.get('slackWebhookUrl') as string

    if (!name) {
        return { error: 'Company name is required' }
    }

    try {
        const tenant = await prisma.tenant.create({
            data: {
                name,
                slackWebhookUrl: slackWebhookUrl || null,
            },
        })
        revalidatePath('/admin/masters')
        return { success: true, tenant }
    } catch (error) {
        console.error('Error creating tenant:', error)
        return { error: 'Failed to create company' }
    }
}

export async function getAnalyticsData() {
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        // 1. Total Visitors Today
        const visitorsToday = await prisma.visit.count({
            where: {
                checkInTime: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        })

        // 2. Visitors by Company (All time)
        // Group by tenantId and count
        const visitsByTenant = await prisma.visit.groupBy({
            by: ['tenantId'],
            _count: {
                id: true,
            },
        })

        // Fetch tenant names for the chart
        const tenants = await prisma.tenant.findMany({
            where: {
                id: {
                    in: visitsByTenant.map((v) => v.tenantId),
                },
            },
            select: {
                id: true,
                name: true,
            },
        })

        // Format data for Recharts
        const chartData = visitsByTenant.map((item) => {
            const tenant = tenants.find((t) => t.id === item.tenantId)
            return {
                name: tenant ? tenant.name : 'Unknown',
                visits: item._count.id,
            }
        })

        return {
            visitorsToday,
            chartData,
        }
    } catch (error) {
        console.error('Error fetching analytics:', error)
        return {
            visitorsToday: 0,
            chartData: [],
        }
    }
}
