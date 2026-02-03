function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

function getEnvVarOptional(key: string): string | undefined {
  return process.env[key] || undefined;
}

function getEnvVarInt(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }
  return parsed;
}

export const env = {
  // Server
  port: getEnvVarInt("PORT", 20300),
  host: getEnvVar("HOST", "localhost"),
  nodeEnv: getEnvVar("NODE_ENV", "development"),

  get baseUrl(): string {
    return `http://${this.host}:${this.port}`;
  },

  // Database
  databaseUrl: getEnvVar("DATABASE_URL"),

  // NextAuth
  nextAuthSecret: getEnvVar("NEXTAUTH_SECRET"),
  get nextAuthUrl(): string {
    return process.env.NEXTAUTH_URL ?? this.baseUrl;
  },

  // Google OAuth
  googleClientId: getEnvVarOptional("GOOGLE_CLIENT_ID"),
  googleClientSecret: getEnvVarOptional("GOOGLE_CLIENT_SECRET"),

  // Email
  emailEncryptionKey: getEnvVar("EMAIL_ENCRYPTION_KEY"),

  // AWS SES
  awsRegion: getEnvVar("AWS_REGION", "ap-northeast-2"),
  awsAccessKeyId: getEnvVarOptional("AWS_ACCESS_KEY_ID"),
  awsSecretAccessKey: getEnvVarOptional("AWS_SECRET_ACCESS_KEY"),
  sesFromEmail: getEnvVar("SES_FROM_EMAIL", "noreply@example.com"),

  // Registration
  registrationMode: getEnvVar("REGISTRATION_MODE", "invite_only") as "open" | "invite_only",

  // Kakao Map
  kakaoMapApiKey: getEnvVarOptional("NEXT_PUBLIC_KAKAO_MAP_API_KEY"),
} as const;

export type Env = typeof env;
