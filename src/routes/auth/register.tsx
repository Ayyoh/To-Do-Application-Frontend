import Footer from "@/features/-auth/-components/footer";
import Header from "@/features/-auth/-components/header";
import RegisterForm from "@/features/-auth/-components/registerForm";
import { CheckAuth } from "@/lib/checkAuth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  beforeLoad: async () => {
    const user = await CheckAuth();

    if (user) {
      throw redirect({ to: "/" });
    }

    return { user };
  },

  component: RegisterPage,
});

export function RegisterPage() {
  return (
    <div className="p-3 flex flex-col gap-4">
      <Header />
      <RegisterForm />
      <Footer />
    </div>
  );
}
