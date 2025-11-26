import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, QrCode, ShieldCheck, Bell, Smartphone, History, LayoutGrid, CheckCircle2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 relative flex items-center justify-center">
              <img src="/Vortexis.png" alt="Vortexis Logo" className="h-8 w-8 object-contain" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Vortexis
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/signin">
              <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-300">
                Admin Login
              </Button>
            </Link>
            <Link href="/check-in">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                Check In Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                The Future of Visitor Management
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                The Front Desk that <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Runs Itself.
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Stop paying for expensive hardware. Upgrade to a contactless, secure, and efficient digital reception for the price of a coffee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/check-in">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-lg bg-white text-slate-950 hover:bg-slate-200 font-semibold">
                    Visitor Check-in
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    Admin Dashboard
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>No Hardware Needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Instant Setup</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 blur-2xl animate-pulse" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
                <img
                  src="/hero-image.png"
                  alt="Digital Reception Dashboard"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Old Way is Broken</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Traditional visitor management is costly, insecure, and inefficient. It's time for an upgrade.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-950 border-slate-800 hover:border-red-500/50 transition-colors group">
              <CardHeader>
                <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <History className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle className="text-white">The Logbook Liability</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">
                Paper logbooks are a data breach waiting to happen. Competitors can see your guest list, and handwriting is impossible to search.
              </CardContent>
            </Card>
            <Card className="bg-slate-950 border-slate-800 hover:border-orange-500/50 transition-colors group">
              <CardHeader>
                <div className="h-12 w-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <LayoutGrid className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-white">The Hardware Trap</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">
                Expensive iPads and bulky kiosks break, get stolen, and cost thousands. Stop buying hardware that depreciates instantly.
              </CardContent>
            </Card>
            <Card className="bg-slate-950 border-slate-800 hover:border-yellow-500/50 transition-colors group">
              <CardHeader>
                <div className="h-12 w-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
                  <Bell className="h-6 w-6 text-yellow-500" />
                </div>
                <CardTitle className="text-white">The Reception Bottleneck</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">
                Manual calls and check-ins kill productivity. Your receptionist shouldn't be a glorified door greeter.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm">The New Way</span>
            <h2 className="text-4xl font-bold mt-2 mb-6">Turn Every Smartphone into a <br />Reception Terminal</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              We removed the hardware, the paper, and the friction. A contactless, QR-based visitor management system that runs entirely on the cloud.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-blue-500/50">
                <QrCode className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">1. Scan & Sign</h3>
              <p className="text-slate-400">
                Visitors scan a QR code using their own phone. No touching shared screens, no app downloads.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-purple-500/50">
                <Bell className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold">2. Instant Notification</h3>
              <p className="text-slate-400">
                Hosts get notified instantly via Slack or Email. "John Doe is in the lobby."
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-emerald-500/50">
                <ShieldCheck className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold">3. Secure & Compliant</h3>
              <p className="text-slate-400">
                Data is encrypted and stored securely. Real-time dashboard for fire drills and audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <Smartphone className="h-8 w-8 text-blue-400 mb-2" />
              <h4 className="font-bold text-lg">Hardware-Free</h4>
              <p className="text-sm text-slate-400">Print the QR code and go live in 30 seconds.</p>
            </div>
            <div className="space-y-2">
              <ShieldCheck className="h-8 w-8 text-purple-400 mb-2" />
              <h4 className="font-bold text-lg">Privacy First</h4>
              <p className="text-sm text-slate-400">Visitors only see their own screen. No prying eyes.</p>
            </div>
            <div className="space-y-2">
              <Bell className="h-8 w-8 text-pink-400 mb-2" />
              <h4 className="font-bold text-lg">Smart Alerts</h4>
              <p className="text-sm text-slate-400">Notify teams where they already work (Slack/Teams).</p>
            </div>
            <div className="space-y-2">
              <History className="h-8 w-8 text-emerald-400 mb-2" />
              <h4 className="font-bold text-lg">Digital Archiving</h4>
              <p className="text-sm text-slate-400">Search visitor history by name, date, or company.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to upgrade your front desk?</h2>
          <p className="text-slate-400 text-lg mb-10">
            Join thousands of smart companies managing visitors the modern way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/check-in">
              <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25">
                Start Check-in
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-700 hover:bg-slate-800">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Vortexis. All rights reserved.</p>
      </footer>
    </div>
  )
}
