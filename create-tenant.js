const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    try {
        const tenant = await prisma.tenant.create({
            data: { name: 'Genexa' }
        })
        console.log('Created tenant:', tenant)
    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
