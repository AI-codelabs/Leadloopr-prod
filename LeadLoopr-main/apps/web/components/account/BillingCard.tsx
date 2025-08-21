'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Download, CreditCard } from "lucide-react";

const billingHistory = [
    { period: "Apr 15, 2025 to May 15, 2025", amount: "$410.25", status: "Paid" },
    { period: "Mar 15, 2025 to Apr 15, 2025", amount: "$380.72", status: "Paid" },
    { period: "Feb 15, 2025 to Mar 15, 2025", amount: "$264.43", status: "Paid" },
    { period: "Jan 15, 2025 to Feb 15, 2025", amount: "$49", status: "Paid" },
    { period: "Dec 15, 2024 to Jan 15, 2025", amount: "$49", status: "Paid" },
    { period: "Nov 15, 2024 to Dec 15, 2024", amount: "$49", status: "Paid" },
    { period: "Oct 15, 2024 to Nov 15, 2024", amount: "$49", status: "Paid" },
];

export function BillingCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>Manage your subscription and billing information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Subscription Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Subscription */}
                    <div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="text-sm text-gray-600 mb-2">YOUR SUBSCRIPTION</div>
                            <div className="text-3xl font-bold mb-2">$49 <span className="text-base font-normal text-gray-600">/ month</span></div>
                            <div className="text-base text-gray-600 mb-4">Solopreneur Plan</div>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 mb-4">
                                ✓ Active
                            </Badge>
                            <div className="text-sm text-gray-600">
                                <div className="font-medium mb-2">Add-ons</div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    <span>$12 per extra team member / month</span>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
                                        Change Plan
                                    </Button>
                                    <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                                        Cancel Subscription
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Credit Card */}
                    <div>
                        <div className="relative w-full max-w-sm mx-auto">
                            <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-xl p-6 shadow-xl aspect-[1.6/1] relative overflow-hidden">
                                {/* Background pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white rounded-full"></div>
                                    <div className="absolute top-6 right-6 w-8 h-8 border-2 border-white rounded-full"></div>
                                </div>

                                {/* Card content */}
                                <div className="relative h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="text-xl font-bold tracking-wider">VISA</div>
                                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="font-mono text-lg tracking-widest">
                                            •••• •••• •••• 1134
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-xs text-gray-300 uppercase tracking-wide">Card Holder</div>
                                                <div className="font-medium">InfoAI-Codelab</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-300 uppercase tracking-wide">Expires</div>
                                                <div className="font-medium">01/28</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next payment info below card */}
                            <div className="mt-4 text-center">
                                <div className="text-lg font-semibold text-gray-900">Next Payment: $49</div>
                                <div className="text-sm text-gray-600">On May 15, 2025</div>
                                <div className="mt-2 space-y-1 text-xs text-gray-500">
                                    <div>• 0 Team Users</div>
                                    <div>• 0 Client Users</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Billing History */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                    <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                            <div>Time</div>
                            <div>Amount</div>
                            <div>Status</div>
                            <div>Download/Pay Invoice</div>
                        </div>
                        {billingHistory.map((invoice, index) => (
                            <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0 text-sm">
                                <div className="text-gray-900">Invoice from {invoice.period}</div>
                                <div className="font-medium">{invoice.amount}</div>
                                <div>
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                        ✓ {invoice.status}
                                    </Badge>
                                </div>
                                <div>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Download className="h-3 w-3" />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 