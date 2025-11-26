'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { QRCodeSVG } from 'qrcode.react'
import { getBuildings, createBuilding, updateBuilding, deleteBuilding } from '@/app/actions/building'
import { getTenants } from '@/app/actions'
import { Trash2, Edit, QrCode, Building as BuildingIcon, Phone, Mail, User, MapPin, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Tenant {
    id: string
    name: string
}

interface Building {
    id: string
    name: string
    address: string
    ownerName: string
    contactNumber: string
    email: string
    tenants: Tenant[]
}

export default function GenerateQRPage() {
    const [buildings, setBuildings] = useState<Building[]>([])
    const [tenants, setTenants] = useState<Tenant[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        ownerName: '',
        contactNumber: '',
        email: '',
        tenantIds: [] as string[],
    })
    const [showQR, setShowQR] = useState<Building | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        try {
            setError(null)
            const [buildingsData, tenantsData] = await Promise.all([
                getBuildings(),
                getTenants()
            ])
            setBuildings(buildingsData)
            setTenants(tenantsData)
        } catch (e) {
            console.error(e)
            setError('Failed to load data. Please try refreshing the page.')
        }
    }

    function handleOpenDialog(building?: Building) {
        if (building) {
            setSelectedBuilding(building)
            setFormData({
                name: building.name,
                address: building.address,
                ownerName: building.ownerName,
                contactNumber: building.contactNumber,
                email: building.email,
                tenantIds: building.tenants.map(t => t.id),
            })
        } else {
            setSelectedBuilding(null)
            setFormData({
                name: '',
                address: '',
                ownerName: '',
                contactNumber: '',
                email: '',
                tenantIds: [],
            })
        }
        setIsDialogOpen(true)
    }

    async function handleSubmit() {
        if (selectedBuilding) {
            await updateBuilding(selectedBuilding.id, formData)
        } else {
            await createBuilding(formData)
        }
        setIsDialogOpen(false)
        loadData()
    }

    async function handleDelete(id: string) {
        if (confirm('Are you sure you want to delete this building?')) {
            await deleteBuilding(id)
            loadData()
        }
    }

    function toggleTenantSelection(tenantId: string) {
        setFormData(prev => {
            const exists = prev.tenantIds.includes(tenantId)
            if (exists) {
                return { ...prev, tenantIds: prev.tenantIds.filter(id => id !== tenantId) }
            } else {
                return { ...prev, tenantIds: [...prev.tenantIds, tenantId] }
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 p-8 text-slate-50">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <Link href="/admin">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl">
                                <ArrowLeft className="h-6 w-6" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                Building Management
                            </h1>
                            <p className="text-sm text-slate-400">Manage buildings and generate QR codes</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleOpenDialog()}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25"
                    >
                        Add Building
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
                        {error}
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {buildings.map((building) => (
                            <motion.div
                                key={building.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                            >
                                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group">
                                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                                            <BuildingIcon className="h-5 w-5 text-purple-400" />
                                            {building.name}
                                        </CardTitle>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(building)} className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(building.id)} className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2 text-sm text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-slate-500" />
                                                {building.address}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-slate-500" />
                                                {building.ownerName}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-slate-500" />
                                                {building.contactNumber}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-slate-800">
                                            <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Companies</p>
                                            <div className="flex flex-wrap gap-2">
                                                {building.tenants.length > 0 ? (
                                                    building.tenants.map(t => (
                                                        <span key={t.id} className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-300 border border-slate-700">
                                                            {t.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-slate-600 italic">No companies linked</span>
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                                            onClick={() => setShowQR(building)}
                                        >
                                            <QrCode className="mr-2 h-4 w-4" />
                                            Generate QR Code
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {buildings.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
                            <p className="text-slate-500">No buildings found. Click "Add Building" to create one.</p>
                        </div>
                    )}
                </div>

                {/* Add/Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="bg-slate-900 border-slate-800 text-slate-50 sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>{selectedBuilding ? 'Edit Building' : 'Add New Building'}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Building Name</Label>
                                <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-slate-950 border-slate-800" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="bg-slate-950 border-slate-800" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ownerName">Owner Name</Label>
                                <Input id="ownerName" value={formData.ownerName} onChange={e => setFormData({ ...formData, ownerName: e.target.value })} className="bg-slate-950 border-slate-800" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                    <Input id="contactNumber" value={formData.contactNumber} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} className="bg-slate-950 border-slate-800" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-slate-950 border-slate-800" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Companies Inside</Label>
                                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-slate-950 rounded-md border border-slate-800">
                                    {tenants.map(tenant => (
                                        <div
                                            key={tenant.id}
                                            className={`p-2 rounded cursor-pointer text-sm border transition-colors ${formData.tenantIds.includes(tenant.id) ? 'bg-purple-500/20 border-purple-500/50 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                                            onClick={() => toggleTenantSelection(tenant.id)}
                                        >
                                            {tenant.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-700 hover:bg-slate-800 text-slate-300">Cancel</Button>
                            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white">Save Building</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Building QR Code Dialog */}
                <Dialog open={!!showQR} onOpenChange={(open) => !open && setShowQR(null)}>
                    <DialogContent className="bg-slate-900 border-slate-800 text-slate-50 sm:max-w-[400px]">
                        <DialogHeader>
                            <DialogTitle className="text-center">Building QR Code</DialogTitle>
                        </DialogHeader>
                        {showQR && (
                            <div className="flex flex-col items-center gap-6 py-6">
                                <div className="bg-white p-4 rounded-xl shadow-2xl shadow-purple-500/20">
                                    <QRCodeSVG
                                        value={`${window.location.origin}/check-in?buildingId=${showQR.id}`}
                                        size={200}
                                        level="H"
                                        includeMargin
                                    />
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="font-bold text-lg text-white">{showQR.name}</h3>
                                    <p className="text-sm text-slate-400">{showQR.address}</p>
                                </div>
                                <div className="w-full grid gap-2">
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => window.print()}>
                                        Print QR Code
                                    </Button>
                                    <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300" onClick={() => setShowQR(null)}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
