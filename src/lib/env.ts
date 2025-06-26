import { z } from "zod";

const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // API Configuration
  NEXT_PUBLIC_API_BASE_URL: z.string().url("Invalid API base URL"),
  NEXT_PUBLIC_API_GATEWAY_URL: z.string().url("Invalid API gateway URL"),
  NEXT_PUBLIC_API_TOKEN: z.string().min(1, "API token is required"),

  // External Services
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z
    .string()
    .min(1, "Google Maps API key is required"),

  // Application Configuration
  NEXT_PUBLIC_HOST: z.string().url("Invalid host URL"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Fyndr"),
  NEXT_PUBLIC_APP_VERSION: z.string().default("1.0.0"),

  // Authentication (server-side only)
  AUTH_SECRET: z
    .string()
    .min(32, "NextAuth secret must be at least 32 characters")
    .optional(),
  AUTH_TRUST_HOST: z.string().url("Invalid Invalid host URL").optional(),
  AUTH_GOOGLE_ID: z.string().min(1, "Google ID is required").optional(),
  AUTH_GOOGLE_SECRET: z.string().min(1, "Google secret is required").optional(),
});

function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      throw new Error(
        `❌ Invalid environment variables:\n${missingVars.join("\n")}\n\nPlease check your .env files.`
      );
    }
    throw error;
  }
}

export const env = validateEnv();

export const config = {
  // Environment
  isDevelopment: env.NODE_ENV === "development",
  isProduction: env.NODE_ENV === "production",
  isTest: env.NODE_ENV === "test",

  // Client-side configuration (safe to expose to browser)
  client: {
    api: {
      baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
      gatewayUrl: env.NEXT_PUBLIC_API_GATEWAY_URL,
      token: env.NEXT_PUBLIC_API_TOKEN,
    },
    app: {
      name: env.NEXT_PUBLIC_APP_NAME,
      version: env.NEXT_PUBLIC_APP_VERSION,
      host: env.NEXT_PUBLIC_HOST,
    },
    services: {
      googleMaps: {
        apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    },
  },

  // Server-side configuration (never exposed to browser)
  server: {
    auth: {
      secret: env.AUTH_SECRET,
      trustHost: env.AUTH_TRUST_HOST,
      google: {
        id: env.AUTH_GOOGLE_ID,
        secret: env.AUTH_GOOGLE_SECRET,
      },
    },
  },
} as const;

export function getEnvConfig<T>(configs: Record<string, T>): T {
  const envConfig = configs[env.NODE_ENV];
  if (!envConfig) {
    throw new Error(`No configuration found for environment: ${env.NODE_ENV}`);
  }
  return envConfig;
}

export const isServer = typeof window === "undefined";

export function getServerConfig() {
  if (!isServer) {
    throw new Error(
      "Server configuration can only be accessed on the server side"
    );
  }
  return config.server;
}

export const devUtils = {
  logEnvVars: () => {
    if (config.isDevelopment) {
      console.log("🔧 Environment Variables:", {
        NODE_ENV: env.NODE_ENV,
        API_BASE_URL: env.NEXT_PUBLIC_API_BASE_URL,
        HOST: env.NEXT_PUBLIC_HOST,
        // Never log sensitive server-side variables
      });
    }
  },

  validateRequiredVars: (requiredVars: string[]) => {
    if (config.isDevelopment) {
      const missing = requiredVars.filter((varName) => !process.env[varName]);
      if (missing.length > 0) {
        console.warn("⚠️  Missing environment variables:", missing.join(", "));
      }
    }
  },
};

export type EnvConfig = typeof config;
export type ClientConfig = typeof config.client;
export type ServerConfig = typeof config.server;
