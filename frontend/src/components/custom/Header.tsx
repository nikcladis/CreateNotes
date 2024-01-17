import { StickyNote } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Header = () => {
  return (
    <header className="flex justify-between p-4 px-8 border-b">
      <div className="flex items-center gap-2">
        <StickyNote size={28} />
        <h1 className="text-xl">Notes</h1>
      </div>
      <button>
        <ModeToggle />
      </button>
    </header>
  );
};
export default Header;
