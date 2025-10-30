import Footer from "@/features/-auth/-components/footer";
import Header from "@/features/-auth/-components/header";
import { SignInForm } from "@/features/-auth/-components/signInForm";
import { api } from "@/lib/axios";
import { CheckAuth } from "@/lib/checkAuth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signIn")({
  beforeLoad: async () => {
    const user = await CheckAuth();
    if (user) {
      throw redirect({ to: "/" });
    }

    return { user };
  },

  component: signInPage,
});

function signInPage() {
  return (
    <div className="p-3 flex flex-col gap-4">
      <Header />
      <SignInForm />
      <Footer />
    </div>
  );
}
