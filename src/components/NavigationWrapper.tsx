import { auth, signOut } from "@/lib/auth";
import Navigation from "./Navigation";

export default async function NavigationWrapper() {
  const session = await auth();

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <Navigation
      user={session?.user}
      signOutAction={handleSignOut}
    />
  );
}
