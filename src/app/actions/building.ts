'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getBuildings() {
    const buildings = await prisma.building.findMany({
        include: {
            tenants: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    return buildings
}

export async function createBuilding(data: {
    name: string
    address: string
    ownerName: string
    contactNumber: string
    email: string
    tenantIds: string[]
}) {
    try {
        const building = await prisma.building.create({
            data: {
                name: data.name,
                address: data.address,
                ownerName: data.ownerName,
                contactNumber: data.contactNumber,
                email: data.email,
                tenants: {
                    connect: data.tenantIds.map((id) => ({ id })),
                },
            },
        })
        revalidatePath('/admin/generate-qr')
        return { success: true, building }
    } catch (error) {
        console.error('Error creating building:', error)
        return { success: false, error: 'Failed to create building' }
    }
}

export async function updateBuilding(
    id: string,
    data: {
        name: string
        address: string
        ownerName: string
        contactNumber: string
        email: string
        tenantIds: string[]
    }
) {
    try {
        // First disconnect all existing tenants to handle updates correctly
        await prisma.building.update({
            where: { id },
            data: {
                tenants: {
                    set: [],
                },
            },
        })

        const building = await prisma.building.update({
            where: { id },
            data: {
                name: data.name,
                address: data.address,
                ownerName: data.ownerName,
                contactNumber: data.contactNumber,
                email: data.email,
                tenants: {
                    connect: data.tenantIds.map((id) => ({ id })),
                },
            },
        })
        revalidatePath('/admin/generate-qr')
        return { success: true, building }
    } catch (error) {
        console.error('Error updating building:', error)
        return { success: false, error: 'Failed to update building' }
    }
}

export async function deleteBuilding(id: string) {
    try {
        await prisma.building.delete({
            where: { id },
        })
        revalidatePath('/admin/generate-qr')
        return { success: true }
    } catch (error) {
        console.error('Error deleting building:', error)
        return { success: false, error: 'Failed to delete building' }
    }
}
