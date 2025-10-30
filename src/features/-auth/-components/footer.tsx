import clsx from "clsx";
import { FaRegCircleCheck } from "react-icons/fa6";

const colors = {
  mainBorder: "border-[#212123]",
  mainText: "text-[#A1A1AA]",
};

function Footer() {
  const features = [
    {
      description: "Create folders to organize your tasks",
      icon: <FaRegCircleCheck className="text-white" size={14} />,
    },
    {
      description: "Set priorities and due dates",
      icon: <FaRegCircleCheck className="text-white" size={14} />,
    },
    {
      description: "Track progress with compilation stats",
      icon: <FaRegCircleCheck className="text-white" size={14} />,
    },
    {
      description: "Search, sort, and filter your tasks",
      icon: <FaRegCircleCheck className="text-white" size={14} />,
    },
  ];

  return (
    <div
      className={clsx(
        "border p-4 rounded-lg flex flex-col gap-4",
        colors.mainBorder
      )}
    >
      <h1 className="text-white text-sm font-quicksand font-semibold">
        Features
      </h1>

      <div className={clsx("text-sm flex flex-col gap-2", colors.mainText)}>
        {features.map((feature, i) => (
          <div className="flex items-center gap-2" key={i}>
            <span>{feature.icon}</span>
            <span>{feature.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
