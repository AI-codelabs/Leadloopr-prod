'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, LogOut } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

interface User {
    id: string;
    clerkId: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    imageUrl?: string | null;
    currentOrganization?: {
        id: string;
        name: string;
        website?: string | null;
    } | null;
}

interface AccountInformationCardProps {
    user: User;
}

export function AccountInformationCard({ user }: AccountInformationCardProps) {
    const { user: clerkUser } = useUser();
    const [isEditing, setIsEditing] = useState({ firstName: false, lastName: false });
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email,
        organization: user.currentOrganization?.name || 'LeadLoopr',
    });

    const handleEdit = (field: keyof typeof isEditing) => {
        setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSave = async (field: 'firstName' | 'lastName', value: string) => {
        if (!clerkUser) return;

        setIsLoading(true);
        try {
            let updateData = {};
            if (field === 'firstName') {
                updateData = { firstName: value };
            } else {
                updateData = { lastName: value };
            }

            await clerkUser.update(updateData);

            setUserInfo(prev => ({ ...prev, [field]: value }));
            setIsEditing(prev => ({ ...prev, [field]: false }));
            toast.success(`${field === 'firstName' ? 'First name' : 'Last name'} updated successfully. Changes will be reflected shortly.`);

        } catch (error) {
            console.error("Error updating profile via Clerk:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = (field: keyof typeof isEditing) => {
        setIsEditing(prev => ({ ...prev, [field]: false }));
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .filter(Boolean)
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center">
                    <Avatar className="h-20 w-20 bg-pink-600">
                        <AvatarImage
                            src={clerkUser?.imageUrl || user.imageUrl || undefined}
                            alt={`${userInfo.firstName} ${userInfo.lastName}`}
                        />
                        <AvatarFallback className="text-white text-2xl font-bold">
                            {getInitials(`${userInfo.firstName} ${userInfo.lastName}`)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm text-gray-600">First name</Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700"
                                onClick={() => handleEdit('firstName')}
                                disabled={isLoading}
                            >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                            </Button>
                        </div>
                        {isEditing.firstName ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    value={userInfo.firstName}
                                    onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSave('firstName', userInfo.firstName);
                                        else if (e.key === 'Escape') handleCancel('firstName');
                                    }}
                                    autoFocus
                                    className="w-full"
                                    disabled={isLoading}
                                />
                                <Button size="sm" onClick={() => handleSave('firstName', userInfo.firstName)} disabled={isLoading}>
                                    Save
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleCancel('firstName')} disabled={isLoading}>
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <p className="font-medium">{userInfo.firstName || 'Not specified'}</p>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm text-gray-600">Last name</Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700"
                                onClick={() => handleEdit('lastName')}
                                disabled={isLoading}
                            >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                            </Button>
                        </div>
                        {isEditing.lastName ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    value={userInfo.lastName}
                                    onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSave('lastName', userInfo.lastName);
                                        else if (e.key === 'Escape') handleCancel('lastName');
                                    }}
                                    autoFocus
                                    className="w-full"
                                    disabled={isLoading}
                                />
                                <Button size="sm" onClick={() => handleSave('lastName', userInfo.lastName)} disabled={isLoading}>
                                    Save
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleCancel('lastName')} disabled={isLoading}>
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <p className="font-medium">{userInfo.lastName || 'Not specified'}</p>
                        )}
                    </div>

                    <div>
                        <Label className="text-sm text-gray-600">Email</Label>
                        <p className="font-medium">{userInfo.email}</p>
                    </div>

                    <div>
                        <Label className="text-sm text-gray-600">Organization</Label>
                        <p className="font-medium">{userInfo.organization}</p>
                    </div>
                </div>

                <Separator />

                <SignOutButton>
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </SignOutButton>
            </CardContent>
        </Card>
    );
} 