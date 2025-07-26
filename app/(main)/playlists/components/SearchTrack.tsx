import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchTrack = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => {
  return (
    <div className="mx-2">
      <p className="w-2/5 text-xl font-semibold mb-4">
        Let&apos;s find something for your playlist
      </p>
      <div className="hidden md:flex relative w-1/3">
        <Search className="absolute left-2.5 top-2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="What do you want to play ?"
          className="pl-9 rounded-full placeholder:text-md"
        />
      </div>
    </div>
  );
};
export default SearchTrack;
