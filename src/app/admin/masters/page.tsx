import { createTenant, getTenants } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'

export default async function MastersPage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect('/auth/signin')
    }

    const tenants = await getTenants()

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin">
                            <Button variant="outline" className="text-black bg-white hover:bg-gray-100">Back to Dashboard</Button>
                        </Link>
                        <h1 className="text-3xl font-bold">Masters Management</h1>
                    </div>
                    <div className="text-sm text-gray-500">
                        Logged in as {session.user.name}
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Company</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action={async (formData) => {
                                'use server'
                                await createTenant(formData)
                            }} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Company Name</Label>
                                    <Input id="name" name="name" placeholder="Acme Inc." required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slackWebhookUrl">Slack Webhook URL (Optional)</Label>
                                    <Input id="slackWebhookUrl" name="slackWebhookUrl" placeholder="https://hooks.slack.com/..." />
                                </div>
                                <Button type="submit" className="w-full">
                                    Add Company
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Existing Companies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {tenants.map((tenant) => (
                                            <tr key={tenant.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle font-medium">{tenant.name}</td>
                                                <td className="p-4 align-middle font-mono text-xs">{tenant.id}</td>
                                            </tr>
                                        ))}
                                        {tenants.length === 0 && (
                                            <tr>
                                                <td colSpan={2} className="p-4 text-center text-muted-foreground">
                                                    No companies found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
