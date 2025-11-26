const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    try {
        const visits = await prisma.visit.findMany({
            orderBy: { checkInTime: 'desc' },
            take: 5
        })
        console.log('Recent Visits:', JSON.stringify(visits, null, 2))
    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
