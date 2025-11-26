
import { prisma } from '@/lib/prisma'

async function main() {
    console.log('Testing Building Creation...')
    try {
        const building = await prisma.building.create({
            data: {
                name: 'Test Building Script',
                address: '123 Script Lane',
                ownerName: 'Script Runner',
                contactNumber: '000-000-0000',
                email: 'script@test.com',
            },
        })
        console.log('Building created:', building)

        const fetched = await prisma.building.findUnique({
            where: { id: building.id },
        })
        console.log('Building fetched:', fetched)

        if (fetched) {
            console.log('SUCCESS: Building persisted.')
        } else {
            console.error('FAILURE: Building not found after creation.')
        }

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
