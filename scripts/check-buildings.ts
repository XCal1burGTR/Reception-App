
import { prisma } from '@/lib/prisma'

async function main() {
    const buildings = await prisma.building.findMany()
    console.log('Buildings:', buildings)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
