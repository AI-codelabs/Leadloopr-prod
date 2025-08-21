// app/api/integrations/google-analytics/auth-url/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_ANALYTICS_SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
];

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("❌ Missing Google OAuth environment variables");
}

export async function GET(request: NextRequest) {
  try {
    const { userId, orgId } = await auth();
    
    if (!userId || !orgId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: "Google OAuth not configured" },
        { status: 500 }
      );
    }

    // Generate state parameter for security (includes orgId)
    const state = Buffer.from(JSON.stringify({ 
      orgId, 
      userId, 
      timestamp: Date.now(),
      integration: "google-analytics"
    })).toString('base64');

    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/google-analytics/callback`,
      response_type: "code",
      scope: GOOGLE_ANALYTICS_SCOPES.join(" "),
      state: state,
      access_type: "offline",
      prompt: "consent", // Force consent to get refresh token
      include_granted_scopes: "true"
    });

    const authUrl = `${GOOGLE_OAUTH_URL}?${params.toString()}`;

    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error("Error generating Google Analytics auth URL:", error);
    return NextResponse.json(
      { error: "Failed to generate auth URL" },
      { status: 500 }
    );
  }
}