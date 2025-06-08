import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bot, Music, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const iconVariants = {
  rest: { rotate: 0 },
  hover: { rotate: 30 },
};

const CreateOptionItem = ({ optionItem }: { optionItem: OptionItem }) => {
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" onClick={optionItem.onClick} className="w-full">
      <motion.div className="flex items-center gap-2 hover:bg-gray-500/30 px-1 py-2 rounded-md transition-all duration-200 cursor-pointer">
        <motion.span variants={iconVariants} transition={{ duration: 0.3 }}>
          <div className="h-10 w-10 aspect-square rounded-full transition-all duration-200 bg-gray-400 flex items-center justify-center">
            <optionItem.icon className="h-7 w-7 -ml-0.5 block text-white" />
          </div>
        </motion.span>
        <div>
          <p className="text-md font-semibold">{optionItem.title}</p>
          <p className="text-sm text-muted-foreground">
            {optionItem.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CreatePlaylistButton = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const router = useRouter()
  const optionItems: OptionItem[] = [
    {
      icon: Music,
      title: "New Playlist",
      description: "Create a new playlist with tracks",
      type: "playlist",
      onClick: () => {
        console.log("Create new playlist clicked");
      },
    },
    {
      icon: Bot,
      title: "AI suggest",
      description: "AI suggestions based on your prompt",
      type: "ai-suggest",
      onClick: () => {
        console.log("AI suggest clicked");
        router.push("/playlists/create");
      },
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="rounded-full text-md font-semibold gap-1"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center"
          >
            <Plus className="h-4 w-4" />
          </motion.span>
          <span className="ml-1">Create</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-3">
        <div className="flex flex-col gap-2">
          {optionItems.map((item, index) => (
            <DropdownMenuItem variant="default" className="p-0 hover:!bg-gray-500/30" key={index}>
              <CreateOptionItem key={index} optionItem={item} />
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreatePlaylistButton;

interface OptionItem {
  icon: React.ElementType;
  title: string;
  description: string;
  type: "playlist" | "ai-suggest";
  onClick: () => void;
}
