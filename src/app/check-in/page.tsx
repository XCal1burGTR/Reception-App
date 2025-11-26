import { getTenants } from '@/app/actions'
import VisitorForm from '@/components/VisitorForm'

export default async function GenericCheckInPage() {
    const companies = await getTenants()

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <VisitorForm companies={companies} />
        </div>
    )
}
