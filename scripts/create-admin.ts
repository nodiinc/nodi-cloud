import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { createHash, createCipheriv, randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function hashEmail(email: string): string {
  return createHash("sha256").update(email.toLowerCase().trim()).digest("hex");
}

function encryptEmail(email: string): string {
  const key = Buffer.from(process.env.EMAIL_ENCRYPTION_KEY!, "base64");
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const normalized = email.toLowerCase().trim();
  let encrypted = cipher.update(normalized, "utf8", "base64");
  encrypted += cipher.final("base64");
  const tag = cipher.getAuthTag();
  return iv.toString("base64") + ":" + tag.toString("base64") + ":" + encrypted;
}

async function main() {
  const email = 'admin@test.com';
  const password = 'admin123';

  const hashedPassword = await bcrypt.hash(password, 12);
  const emailHash = hashEmail(email);
  const emailEncrypted = encryptEmail(email);

  const user = await prisma.user.upsert({
    where: { email: emailHash },
    update: {},
    create: {
      email: emailHash,
      emailEncrypted: emailEncrypted,
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:');
  console.log('  Email: admin@test.com');
  console.log('  Password: admin123');
  console.log('  ID:', user.id);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
