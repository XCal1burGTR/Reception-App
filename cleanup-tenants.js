const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const acmeId = '9e48b316-9208-4e28-b0a1-8cc7d698ae41'
    try {
        const tenants = await prisma.tenant.findMany({
            where: {
                id: { not: acmeId }
            }
        })

        for (const tenant of tenants) {
            console.log('Deleting tenant:', tenant.name, tenant.id)
            await prisma.visit.deleteMany({ where: { tenantId: tenant.id } })
            await prisma.employee.deleteMany({ where: { tenantId: tenant.id } })
            await prisma.tenant.delete({ where: { id: tenant.id } })
        }
    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
