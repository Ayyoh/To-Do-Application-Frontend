import clsx from "clsx";
import React from "react";

const colors = {
  mainText: "text-[#8791A3]",
};

function Header() {
  return (
    <div>
      <div className={clsx("text-center", colors.mainText)}>
        <div className="p-4 bg-gradient-to-r from-white to-zinc-500 opacity-60">

        </div>
        <h1>Organize your tasks with folders and priorities</h1>
      </div>
    </div>
  );
}

export default Header;
