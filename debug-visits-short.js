const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
    const visits = await prisma.visit.findMany({
        take: 5, orderBy: { checkInTime: 'desc' },
        select: { visitorName: true, tenantId: true }
    })
    console.log(JSON.stringify(visits, null, 2))
    await prisma.$disconnect()
}
main()
