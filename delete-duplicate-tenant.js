const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const duplicateTenantId = 'e48fbbaa-da4b-4b10-8ccf-30da1e3601ec'
    try {
        // Delete visits for this tenant first
        await prisma.visit.deleteMany({
            where: { tenantId: duplicateTenantId }
        })
        // Delete employees for this tenant
        await prisma.employee.deleteMany({
            where: { tenantId: duplicateTenantId }
        })
        // Delete the tenant
        await prisma.tenant.delete({
            where: { id: duplicateTenantId }
        })
        console.log('Deleted duplicate tenant:', duplicateTenantId)
    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
