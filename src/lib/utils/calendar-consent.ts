export interface CalendarConsentOptions {
  redirectTo?: string;
  onSuccess?: (tokens: {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
  }) => void;
  onError?: (error: Error) => void;
}

export const requestCalendarConsent = async (
  options: CalendarConsentOptions = {}
) => {
  try {
    // Create a popup window for consent
    const consentUrl = buildConsentUrl();
    const popup = window.open(
      consentUrl,
      "google-calendar-consent",
      "width=500,height=600,scrollbars=yes,resizable=yes"
    );

    if (!popup) {
      throw new Error("Popup blocked. Please allow popups for this site.");
    }

    // Listen for the popup to close or receive a message
    return new Promise<{
      accessToken: string;
      refreshToken?: string;
      expiresIn?: number;
    }>((resolve, reject) => {
      // eslint-disable-next-line prefer-const
      let pollTimer: NodeJS.Timeout;

      // Listen for message from popup (when consent is completed)
      const messageListener = (event: MessageEvent) => {
        // Only accept messages from our own origin
        if (event.origin !== window.location.origin) return;

        if (event.data.type === "CALENDAR_CONSENT_SUCCESS") {
          clearInterval(pollTimer);
          popup.close();
          window.removeEventListener("message", messageListener);
          resolve(event.data.tokens);
          options.onSuccess?.(event.data.tokens);
        } else if (event.data.type === "CALENDAR_CONSENT_ERROR") {
          clearInterval(pollTimer);
          popup.close();
          window.removeEventListener("message", messageListener);
          reject(new Error(event.data.error));
          options.onError?.(new Error(event.data.error));
        }
      };

      window.addEventListener("message", messageListener);

      // Fallback: Poll for popup closure (with error handling)
      let pollCount = 0;
      const maxPolls = 300; // 5 minutes max (300 * 1000ms)

      pollTimer = setInterval(() => {
        pollCount++;

        try {
          // Try to access popup.closed - this might throw CORS error
          if (popup.closed) {
            clearInterval(pollTimer);
            window.removeEventListener("message", messageListener);
            reject(new Error("User cancelled the consent process"));
            return;
          }
        } catch (e) {
          // If we can't access popup.closed due to CORS, check if popup still exists
          // This is a fallback - the postMessage should handle success/error cases
          console.log(e);
        }

        // Timeout after 5 minutes
        if (pollCount >= maxPolls) {
          clearInterval(pollTimer);
          window.removeEventListener("message", messageListener);
          popup.close();
          reject(new Error("Consent process timed out"));
        }
      }, 1000);
    });
  } catch (error) {
    options.onError?.(error as Error);
    throw error;
  }
};

const buildConsentUrl = () => {
  // Updated redirect URI to avoid NextAuth conflict
  const redirectUri = `${window.location.origin}/api/calendar/consent/callback`;

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: "code",
    scope:
      "openid profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/business.manage https://www.googleapis.com/auth/userinfo.email",
    access_type: "offline",
    prompt: "consent",
    state: "calendar_consent",
  });

  console.log("OAuth redirect URI:", redirectUri); // Debug log
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

// Store calendar tokens in user session if needed
export const storeCalendarTokensInSession = async (tokens: {
  accessToken: string;
  refreshToken?: string;
}) => {
  try {
    // You can call your backend API to associate these tokens with the user
    const response = await fetch("/api/user/calendar-tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokens),
    });

    if (!response.ok) {
      throw new Error("Failed to store calendar tokens");
    }

    return await response.json();
  } catch (error) {
    console.error("Error storing calendar tokens:", error);
    throw error;
  }
};
