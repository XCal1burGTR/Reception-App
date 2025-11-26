import { getTenant, getTenants } from '@/app/actions'
import VisitorForm from '@/components/VisitorForm'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        companyId: string
    }
}

export default async function CheckInPage({ params }: PageProps) {
    console.error('CheckInPage params:', params)

    const [tenant, companies] = await Promise.all([
        getTenant(params.companyId),
        getTenants()
    ])

    console.error('Tenant found:', tenant ? tenant.id : 'null')
    console.error('Companies found:', companies.length)

    if (!tenant) {
        console.error('Tenant not found, returning error UI')
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-xl text-center">
                    <h1 className="text-xl font-bold text-red-500 mb-2">Tenant Not Found</h1>
                    <p className="text-slate-400">Could not find company with ID: {params.companyId}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <VisitorForm tenant={tenant} companies={companies} />
        </div>
    )
}
