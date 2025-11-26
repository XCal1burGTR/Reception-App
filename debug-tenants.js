const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    try {
        const tenants = await prisma.tenant.findMany({
            select: { id: true, name: true }
        })
        console.log('Tenants:', JSON.stringify(tenants, null, 2))
    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
