import { createFileRoute, redirect } from "@tanstack/react-router";
import "../App.css";
import clsx from "clsx";
import { CheckAuth } from "@/lib/checkAuth";
import { useLogoutMutation } from "@/hooks/useMutation/useLogoutMutation";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const user = await CheckAuth();
    if (!user) {
      throw redirect({ to: "/auth/signIn" });
    }

    return { user };
  },

  component: App,
});

const colors = {
  mainText: "text-[#8791A3]",
};

function App() {
  const logoutMutation = useLogoutMutation();

  return (
    <div className="p-3 flex flex-col gap-4">
      <div className={clsx("text-center", colors.mainText)}>
        <button onClick={() => logoutMutation.mutate()}>
          {logoutMutation.isPending ? "Logging Out" : "Logout"}
        </button>
      </div>
    </div>
  );
}
