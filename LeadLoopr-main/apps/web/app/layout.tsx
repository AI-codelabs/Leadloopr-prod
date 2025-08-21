import './globals.css';
import { Inter } from 'next/font/google';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { headers } from 'next/headers';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAuthPage = pathname.startsWith("/auth/");
  const isDashboardPage = pathname.startsWith("/dashboard");

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {!isAuthPage && !isDashboardPage && (
            <header className="p-4 flex justify-end gap-4">
              <SignedOut>
                <a href="/auth/sign-in" className="text-blue-600 hover:text-blue-800">Sign In</a>
                <a href="/auth/sign-up" className="text-blue-600 hover:text-blue-800">Sign Up</a>
              </SignedOut>
              <SignedIn>
                <a href="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</a>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </header>
          )}
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
