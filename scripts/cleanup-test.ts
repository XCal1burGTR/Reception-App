
import { prisma } from '@/lib/prisma'

async function main() {
    await prisma.building.deleteMany({
        where: {
            name: 'Test Building Script'
        }
    })
    console.log('Cleaned up test building.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
