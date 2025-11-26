const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const tenantId = '9e48b316-9208-4e28-b0a1-8cc7d698ae41'

    // Upsert Tenant
    const tenant = await prisma.tenant.upsert({
        where: { id: tenantId },
        update: {},
        create: {
            id: tenantId,
            name: 'Acme Corp',
            slackWebhookUrl: '',
        },
    })

    console.log({ tenant })

    // Upsert Employee
    const password = await bcrypt.hash('password123', 10)
    const employee = await prisma.employee.upsert({
        where: { email: 'john@acme.com' },
        update: {},
        create: {
            email: 'john@acme.com',
            name: 'John Doe',
            password,
            tenantId: tenant.id,
        },
    })

    console.log({ employee })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
