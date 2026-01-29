import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

function getEncryptionKey(): Buffer {
  const key = process.env.EMAIL_ENCRYPTION_KEY;
  if (!key) {
    throw new Error("EMAIL_ENCRYPTION_KEY is not set");
  }
  return Buffer.from(key, "base64");
}

export function hashEmail(email: string): string {
  return createHash("sha256").update(email.toLowerCase().trim()).digest("hex");
}

export function encryptEmail(email: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const normalizedEmail = email.toLowerCase().trim();
  let encrypted = cipher.update(normalizedEmail, "utf8", "base64");
  encrypted += cipher.final("base64");

  const tag = cipher.getAuthTag();

  // Format: iv:tag:encrypted
  return `${iv.toString("base64")}:${tag.toString("base64")}:${encrypted}`;
}

export function decryptEmail(encryptedData: string): string {
  const key = getEncryptionKey();
  const [ivB64, tagB64, encrypted] = encryptedData.split(":");

  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}
