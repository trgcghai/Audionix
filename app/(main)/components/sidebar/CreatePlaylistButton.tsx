import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { motion } from "framer-motion";
import { Music, Plus } from "lucide-react";
import { useState } from "react";

const iconVariants = {
  rest: { rotate: 0 },
  hover: { rotate: 30 },
};

const CreateOptionItem = ({ optionItem }: { optionItem: OptionItem }) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      onClick={optionItem.onClick}
      className="w-full"
    >
      <motion.div className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-2 transition-all duration-200 hover:bg-gray-500/30">
        <motion.span variants={iconVariants} transition={{ duration: 0.3 }}>
          <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-gray-400 transition-all duration-200">
            <optionItem.icon className="-ml-0.5 block h-7 w-7 text-white" />
          </div>
        </motion.span>
        <div>
          <p className="text-md font-semibold">{optionItem.title}</p>
          <p className="text-muted-foreground text-sm">
            {optionItem.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CreatePlaylistButton = () => {
  const { handleCreatePlaylist } = usePlaylistAction();
  const [isOpen, setIsOpen] = useState(false);

  const optionItems: OptionItem[] = [
    {
      icon: Music,
      title: "New Playlist",
      description: "Create a new playlist with tracks",
      type: "playlist",
      onClick: handleCreatePlaylist,
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="text-md gap-1 rounded-full">
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
      <DropdownMenuContent align="start" className="w-80 p-3">
        <div className="flex flex-col gap-2">
          {optionItems.map((item, index) => (
            <DropdownMenuItem
              variant="default"
              className="p-0 hover:!bg-gray-500/30"
              key={index}
            >
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
  type: "playlist";
  onClick: () => void;
}
