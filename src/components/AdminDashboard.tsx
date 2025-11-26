'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { format } from 'date-fns'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signOut } from 'next-auth/react'

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
    } | null
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
    chartDataToday: {
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
    const [currentPage, setCurrentPage] = useState(1)
    const [showFilters, setShowFilters] = useState(false)
    const today = new Date().toISOString().split('T')[0]
    const [dateRange, setDateRange] = useState({ from: today, to: today })
    const [filters, setFilters] = useState({
        visitorName: '',
        visitorCompany: '',
        visitorPhone: '',
        hostCompany: '',
        hostName: '',
        purpose: '',
    })

    const itemsPerPage = 10

    const filteredVisits = visits.filter(visit => {
        const matchesFilters =
            visit.visitorName.toLowerCase().includes(filters.visitorName.toLowerCase()) &&
            (visit.visitorCompany || '').toLowerCase().includes(filters.visitorCompany.toLowerCase()) &&
            visit.visitorPhone.toLowerCase().includes(filters.visitorPhone.toLowerCase()) &&
            visit.tenant.name.toLowerCase().includes(filters.hostCompany.toLowerCase()) &&
            (visit.hostName || visit.host?.name || '').toLowerCase().includes(filters.hostName.toLowerCase()) &&
            (visit.purpose || '').toLowerCase().includes(filters.purpose.toLowerCase())

        if (!matchesFilters) return false

        if (dateRange.from && dateRange.to) {
            const visitDate = new Date(visit.checkInTime)
            const fromDate = new Date(dateRange.from)
            const toDate = new Date(dateRange.to)
            // Set end of day for toDate to include the entire day
            toDate.setHours(23, 59, 59, 999)

            return visitDate >= fromDate && visitDate <= toDate
        }

        return true
    })

    const totalPages = Math.ceil(filteredVisits.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const displayedVisits = filteredVisits.slice(startIndex, startIndex + itemsPerPage)

    const buttonClass = "bg-white text-black hover:bg-slate-200 border-0 font-medium transition-all duration-200"

    return (
        <div className="min-h-screen bg-slate-950 p-8 text-slate-50">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 relative flex items-center justify-center">
                            <img src="/Vortexis.png" alt="Vortexis Logo" className="h-10 w-10 object-contain" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Vortexis Admin</h1>
                            <p className="text-sm text-slate-400">Overview & Analytics</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap justify-end">
                        <div className="text-right hidden sm:block mr-2">
                            <div className="text-sm font-medium text-slate-200">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                        <Link href="/">
                            <Button className={buttonClass}>
                                Home
                            </Button>
                        </Link>
                        <Link href="/admin/generate-qr">
                            <Button className={buttonClass}>
                                Generate QR
                            </Button>
                        </Link>
                        <Link href="/admin/masters">
                            <Button className={buttonClass}>
                                Manage Masters
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Logout
                        </Button>
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
                <div className="grid gap-6 md:grid-cols-2">
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

                    {/* Daily Chart */}
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-slate-200">Visitors by Company (Today)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px] w-full">
                                {analytics.chartDataToday && analytics.chartDataToday.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={analytics.chartDataToday}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="visits"
                                                stroke="none"
                                            >
                                                {analytics.chartDataToday.map((entry, index) => (
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
                                ) : (
                                    <div className="h-full flex items-center justify-center text-slate-500">
                                        No visits recorded today
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Visits Table */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-slate-200">
                            Recent Visits
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-2">
                            {showFilters && (
                                <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                                    <Input
                                        type="date"
                                        value={dateRange.from}
                                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                        className="h-8 w-32 bg-slate-800 border-slate-700 text-xs"
                                    />
                                    <span className="text-slate-500 text-xs">to</span>
                                    <Input
                                        type="date"
                                        value={dateRange.to}
                                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                        className="h-8 w-32 bg-slate-800 border-slate-700 text-xs"
                                    />
                                </div>
                            )}
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`border-slate-700 ${showFilters ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 'bg-white text-black hover:bg-slate-200'}`}
                            >
                                {showFilters ? 'Hide Filters' : 'Filter'}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="bg-slate-950/50 [&_tr]:border-b border-slate-800">
                                    <tr className="border-b border-slate-800 transition-colors">
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400 min-w-[200px]">
                                            <div className="space-y-2 py-2">
                                                <span>Visitor</span>
                                                {showFilters && (
                                                    <Input
                                                        placeholder="Filter..."
                                                        className="h-8 bg-slate-900 border-slate-700 text-xs"
                                                        value={filters.visitorName}
                                                        onChange={(e) => setFilters({ ...filters, visitorName: e.target.value })}
                                                    />
                                                )}
                                            </div>
                                        </th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400 min-w-[150px]">
                                            <div className="space-y-2 py-2">
                                                <span>Visitor's Company</span>
                                                {showFilters && (
                                                    <Input
                                                        placeholder="Filter..."
                                                        className="h-8 bg-slate-900 border-slate-700 text-xs"
                                                        value={filters.visitorCompany}
                                                        onChange={(e) => setFilters({ ...filters, visitorCompany: e.target.value })}
                                                    />
                                                )}
                                            </div>
                                        </th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400 min-w-[150px]">
                                            <div className="space-y-2 py-2">
                                                <span>Phone</span>
                                                {showFilters && (
                                                    <Input
                                                        placeholder="Filter..."
                                                        className="h-8 bg-slate-900 border-slate-700 text-xs"
                                                        value={filters.visitorPhone}
                                                        onChange={(e) => setFilters({ ...filters, visitorPhone: e.target.value })}
                                                    />
                                                )}
                                            </div>
                                        </th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400 min-w-[150px]">
                                            <div className="space-y-2 py-2">
                                                <span>Host Company</span>
                                                {showFilters && (
                                                    <Input
                                                        placeholder="Filter..."
                                                        className="h-8 bg-slate-900 border-slate-700 text-xs"
                                                        value={filters.hostCompany}
                                                        onChange={(e) => setFilters({ ...filters, hostCompany: e.target.value })}
                                                    />
                                                )}
                                            </div>
                                        </th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400 min-w-[150px]">
                                            <div className="space-y-2 py-2">
                                                <span>Host</span>
                                                {showFilters && (
                                                    <Input
                                                        placeholder="Filter..."
                                                        className="h-8 bg-slate-900 border-slate-700 text-xs"
                                                        value={filters.hostName}
                                                        onChange={(e) => setFilters({ ...filters, hostName: e.target.value })}
                                                    />
                                                )}
                                            </div>
                                        </th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400 min-w-[150px]">
                                            <div className="space-y-2 py-2">
                                                <span>Purpose</span>
                                                {showFilters && (
                                                    <Input
                                                        placeholder="Filter..."
                                                        className="h-8 bg-slate-900 border-slate-700 text-xs"
                                                        value={filters.purpose}
                                                        onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}
                                                    />
                                                )}
                                            </div>
                                        </th>
                                        <th className="h-12 px-6 align-middle font-medium text-slate-400">Check-in Time</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {displayedVisits.map((visit) => (
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
                                    {displayedVisits.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-500">
                                                No visits found matching your filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {filteredVisits.length > 0 && (
                            <div className="flex items-center justify-between p-4 border-t border-slate-800">
                                <div className="text-sm text-slate-400">
                                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVisits.length)} of {filteredVisits.length} entries
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="border-slate-700 bg-white text-black hover:bg-slate-200 disabled:opacity-50"
                                    >
                                        Previous
                                    </Button>
                                    <div className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <span>Page {currentPage} of {totalPages}</span>
                                        <span className="text-slate-600">|</span>
                                        <span>Total Pages: {totalPages}</span>
                                        <span className="text-slate-600">|</span>
                                        <span>Total Visitors: {filteredVisits.length}</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="border-slate-700 bg-white text-black hover:bg-slate-200 disabled:opacity-50"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
