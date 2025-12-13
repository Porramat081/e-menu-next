import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdowmMenuProps {
  triggerTitle: string;
  listMenu: React.ReactNode[];
  isLast?: boolean;
}

export default function DropdowmMenu(props: DropdowmMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: any) => {
    if (
      boxRef.current &&
      !boxRef.current.contains(event.target) &&
      btnRef.current &&
      !btnRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, []);

  return (
    <div className="relative overflow-visible">
      <button
        type="button"
        ref={btnRef}
        className={`border rounded-full p-2 cursor-pointer flex items-center justify-between gap-1 ${
          isOpen && "bg-gray-600 text-white"
        }`}
        onClick={toggleOpen}
      >
        {props.triggerTitle}
        <EllipsisVertical size={16} />
      </button>

      <div
        ref={boxRef}
        className={`${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } transition ease-in-out duration-150 absolute origin-top mt-1 -left-20 sm:-left-12 z-5 w-[100px] bg-gray-300 rounded-lg overflow-hidden ${
          props.isLast && "-top-full translate-y-[-50%] origin-bottom!"
        }`}
      >
        {props.listMenu.map((item, index) => (
          <div
            onClick={() => toggleOpen()}
            className={`text-center ${
              index !== props.listMenu.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
