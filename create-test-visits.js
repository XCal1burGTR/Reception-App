const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    try {
        const genexa = await prisma.tenant.findFirst({ where: { name: 'Genexa' } })
        const acme = await prisma.tenant.findFirst({ where: { name: 'Acme Corp' } })

        if (genexa) {
            await prisma.visit.create({
                data: {
                    tenantId: genexa.id,
                    visitorName: 'Genexa Script Visitor',
                    visitorPhone: '111',
                    visitorAddress: 'G St',
                    visitorCompany: 'G Co',
                    purpose: 'Script Visit G',
                    hostName: 'G Host'
                }
            })
            console.log('Created Genexa visit')
        }

        if (acme) {
            await prisma.visit.create({
                data: {
                    tenantId: acme.id,
                    visitorName: 'Acme Script Visitor',
                    visitorPhone: '222',
                    visitorAddress: 'A St',
                    visitorCompany: 'A Co',
                    purpose: 'Script Visit A',
                    hostName: 'A Host'
                }
            })
            console.log('Created Acme visit')
        }

    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
