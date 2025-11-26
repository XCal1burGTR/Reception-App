'use client'

import { submitVisit } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

interface Tenant {
    id: string
    name: string
}

interface VisitorFormProps {
    tenant?: Tenant | null
    companies: Tenant[]
}

export default function VisitorForm({ tenant, companies }: VisitorFormProps) {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedTenantId, setSelectedTenantId] = useState<string>(tenant?.id || '')

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await submitVisit(formData)
        setLoading(false)

        if (result.success) {
            setSubmitted(true)
        } else {
            alert('Failed to check in. Please try again.')
        }
    }

    if (submitted) {
        return (
            <div className="w-full max-w-md mx-auto mt-10 relative z-10">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25"></div>
                <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-xl relative">
                    <CardHeader>
                        <CardTitle className="text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 text-2xl">Check-in Successful!</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-green-500/50">
                            <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl text-slate-200 font-medium">Welcome to the building.</p>
                            <p className="text-slate-400">Kindly wait in the reception while we notify the host.</p>
                        </div>
                        <Button onClick={() => window.location.reload()} variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300">
                            New Check-in
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md mx-auto mt-10 relative z-10">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25"></div>

            <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-xl relative shadow-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center font-bold">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{tenant ? tenant.name : 'Reception'}</span>
                    </CardTitle>
                    <CardDescription className="text-center text-slate-400">
                        Please enter your details to check in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        {/* If tenant is pre-selected, use hidden input. Otherwise, use Select for tenantId */}
                        {tenant ? (
                            <input type="hidden" name="tenantId" value={tenant.id} />
                        ) : (
                            <div className="space-y-2">
                                <Label htmlFor="tenantId" className="text-slate-300">Select Company to Visit</Label>
                                <Select name="tenantId" required onValueChange={setSelectedTenantId}>
                                    <SelectTrigger className="bg-slate-950/50 border-slate-800 text-slate-200 focus:ring-purple-500/50">
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                                        {companies.map((company) => (
                                            <SelectItem key={company.id} value={company.id} className="focus:bg-slate-800 focus:text-white">
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="visitorName" className="text-slate-300">Full Name</Label>
                            <Input id="visitorName" name="visitorName" placeholder="John Doe" required className="bg-slate-950/50 border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-purple-500/20" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="visitorPhone" className="text-slate-300">Phone Number</Label>
                            <Input id="visitorPhone" name="visitorPhone" type="tel" placeholder="+1 234 567 8900" required className="bg-slate-950/50 border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-purple-500/20" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="visitorAddress" className="text-slate-300">Address</Label>
                            <Input id="visitorAddress" name="visitorAddress" placeholder="123 Main St, City" className="bg-slate-950/50 border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-purple-500/20" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="visitorCompany" className="text-slate-300">Your Company (Optional)</Label>
                            <Input id="visitorCompany" name="visitorCompany" placeholder="Your Organization Name" className="bg-slate-950/50 border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-purple-500/20" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="purpose" className="text-slate-300">Purpose of Visit</Label>
                            <Input id="purpose" name="purpose" placeholder="Meeting, Interview, etc." className="bg-slate-950/50 border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-purple-500/20" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hostName" className="text-slate-300">Whom to Meet</Label>
                            <Input id="hostName" name="hostName" placeholder="Host Name" required className="bg-slate-950/50 border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-purple-500/20" />
                        </div>

                        <Button type="submit" className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 border-0 font-semibold" disabled={loading}>
                            {loading ? 'Checking in...' : 'Check In'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
