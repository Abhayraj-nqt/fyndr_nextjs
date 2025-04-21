"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type GoogleMapsContextType = {
  isLoaded: boolean;
  hasError: boolean;
  errorMessage?: string;
};

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  hasError: false,
});

export const useGoogleMaps = () => useContext(GoogleMapsContext);

interface GoogleMapsProviderProps {
  apiKey: string;
  libraries?: string[];
  children: ReactNode;
  callback?: string;
}

let scriptLoadingPromise: Promise<void> | null = null;

export function GoogleMapsProvider({
  apiKey,
  libraries = ["places", "geometry"],
  children,
  callback,
}: GoogleMapsProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If already loaded, set state and return
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // If script is already loading, wait for it
    if (scriptLoadingPromise) {
      scriptLoadingPromise
        .then(() => setIsLoaded(true))
        .catch((error) => {
          setHasError(true);
          setErrorMessage(error.message);
        });
      return;
    }

    const loadScript = () => {
      const script = document.createElement("script");
      const librariesParam =
        libraries.length > 0 ? `&libraries=${libraries.join(",")}` : "";
      const callbackParam = callback ? `&callback=${callback}` : "";

      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${librariesParam}${callbackParam}`;
      script.async = true;
      script.defer = true;
      script.id = "google-maps-script";

      document.head.appendChild(script);

      return new Promise<void>((resolve, reject) => {
        script.addEventListener("load", () => {
          resolve();
        });
        script.addEventListener("error", (e) => {
          const error = new Error(
            `Failed to load Google Maps script: ${e.type}`
          );
          reject(error);
          console.error(error);
        });
      });
    };

    scriptLoadingPromise = loadScript();

    scriptLoadingPromise
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        setHasError(true);
        setErrorMessage(error.message);
      });

    return () => {
      // Cleanup not needed for script loaded in head
    };
  }, [apiKey, libraries, callback]);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, hasError, errorMessage }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}
