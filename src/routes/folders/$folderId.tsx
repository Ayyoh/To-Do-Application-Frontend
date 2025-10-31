import Header from "@/features/-todo/-components/folders/header";
import { CheckAuth } from "@/lib/checkAuth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/folders/$folderId")({
  beforeLoad: async () => {
    const user = await CheckAuth();
    if (!user) {
      throw redirect({ to: "/auth/signIn" });
    }

    return { user };
  },

  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
    </div>
  );
}
