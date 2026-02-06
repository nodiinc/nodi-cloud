import { Role } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    role?: Role;
    customerId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: Role;
      customerId?: string | null;
    };
    provider?: string;
    googleProfile?: {
      name?: string;
      email?: string;
      picture?: string;
      locale?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
    customerId?: string | null;
    loginAt?: number;
    expired?: boolean;
    provider?: string;
    googleProfile?: {
      name?: string;
      email?: string;
      picture?: string;
      locale?: string;
    };
  }
}
