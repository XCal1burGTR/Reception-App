import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MapPin, Phone, Globe } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-purple-500/30">
            {/* Navigation */}
            <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 relative flex items-center justify-center">
                                <img src="/Vortexis.png" alt="Vortexis Logo" className="h-8 w-8 object-contain" />
                            </div>
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                Vortexis
                            </span>
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/">
                            <Button className="bg-white text-black hover:bg-slate-200 border-0 font-medium transition-all duration-200">
                                Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
                {/* About Section */}
                <section className="space-y-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        About Vortexis
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Vortexis is a forward-thinking technology company dedicated to transforming how businesses manage their physical spaces.
                        Our flagship product, the <strong>Smart Reception Management System</strong>, eliminates the need for clunky hardware and paper logbooks,
                        offering a seamless, secure, and contactless visitor experience.
                    </p>
                </section>

                {/* Contact Section */}
                <section>
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center text-white">Contact Us</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-8 p-8">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-200">Email</h3>
                                        <p className="text-slate-400">contact@vortexis.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-200">Phone</h3>
                                        <p className="text-slate-400">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-200">Address</h3>
                                        <p className="text-slate-400">
                                            123 Innovation Drive<br />
                                            Tech Valley, CA 94043
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
                                        <Globe className="h-5 w-5 text-pink-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-200">Website</h3>
                                        <p className="text-slate-400">www.vortexis.com</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
