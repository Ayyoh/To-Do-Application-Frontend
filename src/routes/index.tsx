import { createFileRoute, redirect } from "@tanstack/react-router";
import "../App.css";
import { CheckAuth } from "@/lib/checkAuth";
import TodoPage from "@/features/-todo/-components/todoPage";

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

function App() {
  return (
    <div className="p-3 flex flex-col gap-4">
      <TodoPage />
    </div>
  );
}
