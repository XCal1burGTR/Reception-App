'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { format } from 'date-fns'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

interface Visit {
    id: string
    visitorName: string
    visitorPhone: string
    visitorAddress?: string | null
    visitorCompany?: string | null
    purpose?: string | null
    hostName?: string | null
    checkInTime: Date
    host: {
        name: string
    }
    tenant: {
        name: string
    }
}

interface AnalyticsData {
    visitorsToday: number
    chartData: {
        name: string
        visits: number
    }[]
}

interface AdminDashboardProps {
    visits: Visit[]
    analytics: AnalyticsData
    user: {
        name?: string | null
        email?: string | null
    }
}

export default function AdminDashboard({ visits, analytics, user }: AdminDashboardProps) {
    return (
        <div className="min-h-screen bg-slate-950 p-8 text-slate-50">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 relative flex items-center justify-center">
                            <img src="/Vortexis.png" alt="Vortexis Logo" className="h-10 w-10 object-contain" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Vortexis Admin</h1>
                            <p className="text-sm text-slate-400">Overview & Analytics</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-medium text-slate-200">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                        <Link href="/admin/masters">
                            <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300">
                                Manage Masters
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Analytics Cards */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Total Visits (All Time)</CardTitle>
                            <div className="h-8 w-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                <span className="text-purple-400 text-xs font-bold">ALL</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-white">{visits.length}</div>
                            <p className="text-xs text-slate-500 mt-1">Recorded check-ins</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-green-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Visitors Today</CardTitle>
                            <div className="h-8 w-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                                <span className="text-green-400 text-xs font-bold">24H</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-green-400">{analytics.visitorsToday}</div>
                            <p className="text-xs text-slate-500 mt-1">Active today</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Visitors by Company</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={analytics.chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="visits"
                                        stroke="none"
                                    >
                                        {analytics.chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                        itemStyle={{ color: '#f8fafc' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Visits Table */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Recent Visits</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="bg-slate-950/50 [&_tr]:border-b border-slate-800">
                                    <tr className="border-b border-slate-800 transition-colors">
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400">Visitor</th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400">Visitor's Company</th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400">Phone</th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400">Host Company</th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400">Host</th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400">Purpose</th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400">Check-in Time</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {visits.map((visit) => (
                                        <tr key={visit.id} className="border-b border-slate-800/50 transition-colors hover:bg-slate-800/30">
                                            <td className="p-6 align-middle font-medium">
                                                <div className="text-slate-200">{visit.visitorName}</div>
                                                <div className="text-xs text-slate-500">{visit.visitorAddress}</div>
                                            </td>
                                            <td className="p-6 align-middle text-slate-400">{visit.visitorCompany || '-'}</td>
                                            <td className="p-6 align-middle text-slate-400">{visit.visitorPhone}</td>
                                            <td className="p-6 align-middle">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                    {visit.tenant.name}
                                                </span>
                                            </td>
                                            <td className="p-6 align-middle text-slate-300">{visit.hostName || visit.host?.name || '-'}</td>
                                            <td className="p-6 align-middle text-slate-400">{visit.purpose || '-'}</td>
                                            <td className="p-6 align-middle text-slate-500">{format(new Date(visit.checkInTime), 'PP p')}</td>
                                        </tr>
                                    ))}
                                    {visits.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-500">
                                                No visits recorded yet.
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
    )
}
