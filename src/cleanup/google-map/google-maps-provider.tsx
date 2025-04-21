"use client";

import { useEffect, useRef } from "react";

type GoogleMapsProviderProps = {
  apiKey: string;
  libraries?: string[];
  onLoad?: () => void;
  onError?: (error: ErrorEvent) => void;
};

declare global {
  interface Window {
    google?: typeof google;
  }
}

export function GoogleMapsProvider({
  apiKey,
  libraries = [],
  onLoad,
  onError,
}: GoogleMapsProviderProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (window.google) {
      onLoad?.();
      return;
    }

    const existing = document.getElementById("google-maps-script");
    if (existing) {
      existing.addEventListener("load", () => onLoad?.());
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${
      libraries.length ? `&libraries=${libraries.join(",")}` : ""
    }`;
    script.async = true;
    script.defer = true;
    script.id = "google-maps-script";

    script.addEventListener("load", () => onLoad?.());
    script.addEventListener("error", (e) => {
      console.error("Google Maps failed to load", e);
      onError?.(e as ErrorEvent);
    });

    document.body.appendChild(script);
    scriptRef.current = script;
  }, [apiKey, libraries, onLoad, onError]);

  return null;
}
