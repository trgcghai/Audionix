import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const FilterButtons = ({
  selected,
  onSelect,
  options,
}: {
  selected: string;
  onSelect: (filter: string) => void;
  options: string[];
}) => (
  <div className="flex gap-2 mt-2">
    {selected ? (
      <>
        <Button
          variant="outline"
          onClick={() => onSelect("")}
          className="text-sm font-medium aspect-square rounded-full"
        >
          <XIcon />
        </Button>
        <Button variant="default" className="text-sm font-medium rounded-full">
          {selected}
        </Button>
      </>
    ) : (
      options.map((button) => (
        <Button
          key={button}
          onClick={() => onSelect(button)}
          variant="outline"
          className="text-md font-medium rounded-full dark:text-white"
        >
          {button}
        </Button>
      ))
    )}
  </div>
);

export default FilterButtons;
