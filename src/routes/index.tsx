import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import clsx from "clsx";

export const Route = createFileRoute("/")({
  component: App,
});

const colors = {
  mainBG: "bg-[#0E0B1E]",
};

function App() {
  return (
    <div className="">
      <h1></h1>
    </div>
  );
}
