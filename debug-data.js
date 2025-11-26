const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    try {
        console.log('--- ADMIN USER ---')
        const admin = await prisma.employee.findUnique({
            where: { email: 'john@acme.com' },
            select: { id: true, name: true, tenantId: true }
        })
        console.log(JSON.stringify(admin, null, 2))

        console.log('\n--- ACME CORP TENANTS ---')
        const acmeTenants = await prisma.tenant.findMany({
            where: { name: 'Acme Corp' },
            select: { id: true, name: true }
        })
        console.log(JSON.stringify(acmeTenants, null, 2))

        console.log('\n--- LAST 5 VISITS ---')
        const visits = await prisma.visit.findMany({
            take: 5,
            orderBy: { checkInTime: 'desc' },
            select: { id: true, visitorName: true, tenantId: true, checkInTime: true }
        })
        console.log(JSON.stringify(visits, null, 2))

    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
