'use client'

import { OrganizationProfile } from '@clerk/nextjs'
import { X } from 'lucide-react'

interface OrganizationProfileModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function OrganizationProfileModal({ open, onOpenChange }: OrganizationProfileModalProps) {
    if (!open) return null

    // Close modal when clicking the overlay
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onOpenChange(false)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={handleOverlayClick}
        >
            <div className="relative w-full max-w-3xl md:max-w-4xl h-[90vh] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
                {/* Close button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow border border-gray-200 transition"
                    aria-label="Close organization settings"
                >
                    <X className="h-5 w-5 text-gray-700" />
                </button>
                <div className="flex-1 min-h-0 overflow-auto">
                    <OrganizationProfile
                        routing="hash"
                        afterLeaveOrganizationUrl="/dashboard"
                    />
                </div>
            </div>
        </div>
    )
} 