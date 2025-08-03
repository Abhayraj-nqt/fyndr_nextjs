import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");

  console.log("Calendar consent callback received:", {
    code: code ? "present" : "missing",
    error,
    state,
    origin: request.nextUrl.origin,
    fullUrl: request.url,
  });

  // Check if this is a redirect flow or popup flow
  const isPopupFlow = state === "calendar_consent";
  const isRedirectFlow = state?.startsWith("calendar_consent_");

  if (!isPopupFlow && !isRedirectFlow) {
    console.error("Invalid state parameter:", state);

    if (isPopupFlow) {
      return new Response(
        `
        <html>
          <body>
            <script>
              window.opener.postMessage({
                type: 'CALENDAR_CONSENT_ERROR',
                error: 'Invalid state parameter'
              }, window.location.origin);
              window.close();
            </script>
          </body>
        </html>
      `,
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    } else {
      return Response.redirect(
        `${request.nextUrl.origin}/calendar-consent-error?error=invalid_state`
      );
    }
  }

  if (error) {
    console.error("OAuth error:", error);

    if (isPopupFlow) {
      return new Response(
        `
        <html>
          <body>
            <script>
              window.opener.postMessage({
                type: 'CALENDAR_CONSENT_ERROR',
                error: '${error}'
              }, window.location.origin);
              window.close();
            </script>
          </body>
        </html>
      `,
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    } else {
      return Response.redirect(
        `${request.nextUrl.origin}/calendar-consent-error?error=${error}`
      );
    }
  }

  if (!code) {
    console.error("No authorization code received");

    if (isPopupFlow) {
      return new Response(
        `
        <html>
          <body>
            <script>
              window.opener.postMessage({
                type: 'CALENDAR_CONSENT_ERROR',
                error: 'No authorization code received'
              }, window.location.origin);
              window.close();
            </script>
          </body>
        </html>
      `,
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    } else {
      return Response.redirect(
        `${request.nextUrl.origin}/calendar-consent-error?error=no_code`
      );
    }
  }

  try {
    const redirectUri = `${request.nextUrl.origin}/api/calendar/consent/callback`;
    console.log("Token exchange parameters:", {
      client_id: process.env.AUTH_GOOGLE_ID ? "present" : "missing",
      client_secret: process.env.AUTH_GOOGLE_SECRET ? "present" : "missing",
      code: code ? "present" : "missing",
      redirect_uri: redirectUri,
    });

    const tokenRequestBody = new URLSearchParams({
      client_id: process.env.AUTH_GOOGLE_ID!,
      client_secret: process.env.AUTH_GOOGLE_SECRET!,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    });

    console.log("Making token exchange request...");

    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenRequestBody,
    });

    console.log("Token response status:", tokenResponse.status);

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Token exchange failed:", {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        body: errorData,
      });

      if (isPopupFlow) {
        return new Response(
          `
          <html>
            <body>
              <script>
                window.opener.postMessage({
                  type: 'CALENDAR_CONSENT_ERROR',
                  error: 'Token exchange failed: ${tokenResponse.status}'
                }, window.location.origin);
                window.close();
              </script>
            </body>
          </html>
        `,
          {
            headers: { "Content-Type": "text/html" },
            status: 400,
          }
        );
      } else {
        return Response.redirect(
          `${request.nextUrl.origin}/calendar-consent-error?error=token_exchange_failed`
        );
      }
    }

    const tokens = await tokenResponse.json();
    console.log("Token exchange successful:", {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      hasIdToken: !!tokens.id_token, // Check for id_token
      scope: tokens.scope,
    });

    if (isPopupFlow) {
      return new Response(
        `
        <html>
          <body>
            <script>
              window.opener.postMessage({
                type: 'CALENDAR_CONSENT_SUCCESS',
                tokens: {
                  accessToken: '${tokens.access_token}',
                  refreshToken: '${tokens.refresh_token || ""}',
                  expiresIn: ${tokens.expires_in || 3600},
                  scope: '${tokens.scope || ""}'
                }
              }, window.location.origin);
              window.close();
            </script>
          </body>
        </html>
      `,
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    } else {
      // For redirect flow, store tokens in session/cookie and redirect to success page
      // You might want to encrypt these tokens before storing
      const response = Response.redirect(
        `${request.nextUrl.origin}/calendar-consent-success`
      );

      // Store tokens securely (consider encryption)
      response.cookies.set("calendar_access_token", tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: tokens.expires_in || 3600,
      });

      if (tokens.refresh_token) {
        response.cookies.set("calendar_refresh_token", tokens.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
      }

      return response;
    }
  } catch (error) {
    console.error("Token exchange error:", error);

    if (isPopupFlow) {
      return new Response(
        `
        <html>
          <body>
            <script>
              window.opener.postMessage({
                type: 'CALENDAR_CONSENT_ERROR',
                error: 'Failed to obtain calendar access: ${error?.message}'
              }, window.location.origin);
              window.close();
            </script>
          </body>
        </html>
      `,
        {
          headers: { "Content-Type": "text/html" },
          status: 500,
        }
      );
    } else {
      return Response.redirect(
        `${request.nextUrl.origin}/calendar-consent-error?error=server_error`
      );
    }
  }
}
