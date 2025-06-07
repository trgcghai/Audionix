import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { Bot, Music, Plus } from "lucide-react";

const iconVariants = {
  rest: { rotate: 0 },
  hover: { rotate: 30 },
};

const CreateOptionItem = ({ optionItem }: { optionItem: OptionItem }) => {
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" onClick={optionItem.onClick}>
      <motion.div className="flex items-center gap-2 hover:bg-gray-500/30 px-1 py-2 rounded-md transition-all duration-200 cursor-pointer">
        <motion.span variants={iconVariants} transition={{ duration: 0.3 }}>
          <div className="h-10 w-10 aspect-square rounded-full transition-all duration-200 bg-gray-400 flex items-center justify-center">
            <optionItem.icon className="h-5 w-5 -ml-0.5 block" />
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
      },
    },
  ];

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3">
        <div className="flex flex-col gap-2">
          {optionItems.map((item, index) => (
            <CreateOptionItem key={index} optionItem={item} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
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
