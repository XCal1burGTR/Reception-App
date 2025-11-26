import { getTenants, getTenant } from '@/app/actions'
import VisitorForm from '@/components/VisitorForm'

interface PageProps {
    searchParams: {
        buildingId?: string
        tenantId?: string
    }
}

export default async function GenericCheckInPage({ searchParams }: PageProps) {
    const allCompanies = await getTenants()

    let companies = allCompanies
    if (searchParams.buildingId) {
        // If buildingId is provided, filter companies linked to this building
        // Note: In a real app, we should probably fetch this relation directly from DB
        // But for now, we'll filter in memory or update getTenants to support filtering
        // Let's update getTenants in actions.ts to support optional buildingId
        companies = await getTenants(searchParams.buildingId)
    }

    let tenant = null
    if (searchParams.tenantId) {
        tenant = await getTenant(searchParams.tenantId)
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <VisitorForm companies={companies} tenant={tenant} />
        </div>
    )
}
