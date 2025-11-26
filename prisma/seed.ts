import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('password123', 10)

    const tenant = await prisma.tenant.create({
        data: {
            name: 'Acme Corp',
            slackWebhookUrl: '',
        },
    })

    const employee = await prisma.employee.create({
        data: {
            tenantId: tenant.id,
            name: 'John Doe',
            email: 'john@acme.com',
            password: password,
        },
    })

    console.log({ tenant, employee })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
