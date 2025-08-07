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
  <div className="mt-2 flex gap-2">
    {selected ? (
      <>
        <Button
          variant="outline"
          onClick={() => onSelect("")}
          className="aspect-square rounded-full text-sm font-medium"
        >
          <XIcon />
        </Button>
        <Button variant="default" className="rounded-full text-sm font-medium">
          {selected}
        </Button>
      </>
    ) : (
      options.map((button) => (
        <Button
          key={button}
          onClick={() => onSelect(button)}
          variant="outline"
          className="text-md dark:text-muted-foreground rounded-full font-medium hover:dark:text-white"
        >
          {button}
        </Button>
      ))
    )}
  </div>
);

export default FilterButtons;
