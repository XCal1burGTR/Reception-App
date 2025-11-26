import { getVisits, getAnalyticsData } from '@/app/actions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AdminDashboard from '@/components/AdminDashboard'

export default async function AdminPage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect('/auth/signin')
    }

    // Fetch data in parallel
    const [visits, analytics] = await Promise.all([
        getVisits(),
        getAnalyticsData()
    ])

    return <AdminDashboard visits={visits} analytics={analytics} user={session.user} />
}
