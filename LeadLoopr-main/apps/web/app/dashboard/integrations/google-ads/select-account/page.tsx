'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface GoogleAdsAccount {
  customerId: string;
  resourceName: string;
  name?: string;
}

export default function SelectGoogleAdsAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accounts, setAccounts] = useState<GoogleAdsAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    const accountsParam = searchParams.get('accounts');
    const orgParam = searchParams.get('org');

    if (!accountsParam || !orgParam) {
      setError('Missing required parameters');
      return;
    }

    try {
      const parsedAccounts = JSON.parse(decodeURIComponent(accountsParam));
      setAccounts(parsedAccounts);
      setOrgId(orgParam);

      if (parsedAccounts.length === 1) {
        setSelectedAccount(parsedAccounts[0].customerId);
      }
    } catch (err) {
      console.error('Failed to parse accounts:', err);
      setError('Failed to load accounts');
    }
  }, [searchParams]);

  const handleAccountSelect = (customerId: string) => {
    setSelectedAccount(customerId);
  };

  const handleConfirmSelection = async () => {
    if (!selectedAccount || !orgId) {
      setError('Please select an account');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/integrations/google-ads/save-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: selectedAccount, organizationId: orgId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save account');
      }

      router.push('/dashboard/integrations?success=google_ads_connected');
    } catch (err: any) {
      console.error('Failed to save account:', err);
      setError(err.message || 'Failed to save account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/integrations?cancelled=google_ads');
  };

  if (error && accounts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Error Loading Accounts</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleCancel} variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Integrations
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={handleCancel}
            variant="ghost"
            className="mb-4"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Integrations
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Select Google Ads Account
            </h1>
            <p className="text-gray-600 mb-8">
              Choose which Google Ads account you want to connect for conversion tracking
            </p>
          </div>
        </div>

        {accounts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="mb-2">No Google Ads Accounts Found</CardTitle>
              <CardDescription>
                We couldn't find any Google Ads accounts associated with your Google account.
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 mb-8">
              {accounts.map((account) => (
                <Card
                  key={account.customerId}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedAccount === account.customerId
                      ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleAccountSelect(account.customerId)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {account.name || `Account ${account.customerId}`}
                          </h3>
                          {selectedAccount === account.customerId && (
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Customer ID:</span> {account.customerId}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            Google Ads Account
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 font-medium">Error</span>
                </div>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            )}

            <div className="flex justify-between items-center bg-white p-6 rounded-lg border">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {selectedAccount ? 'Account Selected' : 'Select an Account'}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedAccount
                    ? `You've selected account ${selectedAccount}`
                    : 'Choose a Google Ads account to continue'}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSelection}
                  disabled={!selectedAccount || isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Connecting...' : 'Connect Account'}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
