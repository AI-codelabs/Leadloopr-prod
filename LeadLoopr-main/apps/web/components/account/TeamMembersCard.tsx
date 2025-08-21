'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { InviteMemberModal } from "./InviteMemberModal";

interface TeamMember {
    id: string;
    userId: string;
    name: string;
    email: string;
    role: string;
    initials: string;
    imageUrl?: string | null;
}

export function TeamMembersCard() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/organization/members');
            if (!response.ok) {
                throw new Error('Failed to fetch members');
            }
            const data = await response.json();
            if (data.success) {
                setMembers(data.members);
            } else {
                throw new Error(data.error || 'Failed to fetch members');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch members');
            console.error('Error fetching members:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>Manage who has access to this organization.</CardDescription>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" disabled>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Member
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                        <div>
                                            <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                                            <div className="h-3 bg-gray-200 rounded w-40"></div>
                                        </div>
                                    </div>
                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>Manage who has access to this organization.</CardDescription>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Member
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <p className="text-red-600 mb-4">Failed to load team members</p>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>Manage who has access to this organization.</CardDescription>
                        </div>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => setIsInviteModalOpen(true)}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Member
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">{members.length} of 5 members</p>
                        {members.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <p>No team members found</p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => setIsInviteModalOpen(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Invite your first member
                                </Button>
                            </div>
                        ) : (
                            members.map((member) => (
                                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={member.imageUrl || undefined}
                                                alt={member.name}
                                            />
                                            <AvatarFallback className="bg-gray-600 text-white text-sm">
                                                {member.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{member.name}</p>
                                            <p className="text-sm text-gray-600">{member.email}</p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={member.role === "Admin" ? "secondary" : "secondary"}
                                        className={
                                            member.role === "Admin"
                                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                                : member.role === "Guest"
                                                    ? "bg-gray-100 text-gray-800 border-gray-200"
                                                    : "bg-green-100 text-green-800 border-green-200"
                                        }
                                    >
                                        {member.role}
                                    </Badge>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            <InviteMemberModal
                open={isInviteModalOpen}
                onOpenChange={setIsInviteModalOpen}
            />
        </>
    );
} 