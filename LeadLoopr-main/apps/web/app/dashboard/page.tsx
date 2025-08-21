import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import MetricCard from '@/components/dashboard/MetricCard'
import ProductTraffic from '@/components/dashboard/ProductTraffic'
import TrafficSource from '@/components/dashboard/TrafficSource'
import { ChartLineInteractive } from '@/components/dashboard/ChartLineInteractive'
import { syncCurrentUser } from '@/lib/clerk-sync'

export default async function DashboardPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect('/auth/sign-in')
    }


    return (
        <div className="space-y-6 p-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Leads"
                    value="1,234"
                    change="+12.5%"
                    isPositive={true}
                    color="blue"
                />
                <MetricCard
                    title="Conversion Rate"
                    value="8.2%"
                    change="+2.1%"
                    isPositive={true}
                    color="orange"
                />
                <MetricCard
                    title="Revenue"
                    value="$45.2K"
                    change="+18.3%"
                    isPositive={true}
                    color="blue"
                />
                <MetricCard
                    title="Active Campaigns"
                    value="12"
                    change="-3.2%"
                    isPositive={false}
                    color="orange"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                    <ChartLineInteractive />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProductTraffic />
                <TrafficSource />
            </div>
        </div>
    )
} 

