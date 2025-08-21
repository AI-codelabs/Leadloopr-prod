import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { syncCurrentUser } from '@/lib/clerk-sync'
import { AccountInformationCard } from '@/components/account/AccountInformationCard'
import { BillingCard } from '@/components/account/BillingCard'
import { TeamMembersCard } from '@/components/account/TeamMembersCard'

export default async function AccountPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect('/auth/sign-in')
    }

    // Sync user with database and get user data
    const user = await syncCurrentUser()

    if (!user) {
        redirect('/auth/sign-in')
    }

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Account settings</h1>
                </div>

                <div className="flex gap-6">
                    {/* Account Information - Fixed width */}
                    <div className="w-80 flex-shrink-0">
                        <AccountInformationCard user={user} />
                    </div>

                    {/* Organization Management & Billing - Flexible width */}
                    <div className="flex-1 space-y-6">
                        {/* Team Members Management */}
                        <TeamMembersCard />

                        {/* Billing Section */}
                        <BillingCard />
                    </div>
                </div>
            </div>
        </div>
    )
} 