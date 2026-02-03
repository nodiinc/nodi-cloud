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
      role: Role;
      customerId?: string | null;
    };
  }
}
