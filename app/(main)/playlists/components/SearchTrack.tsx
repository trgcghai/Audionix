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
    <div className="">
      <p className="mb-4 w-2/5 text-xl font-semibold">
        Let&apos;s find something for your playlist
      </p>
      <div className="relative hidden w-1/3 md:flex">
        <Search className="absolute top-2 left-2.5 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="What do you want to play ?"
          className="placeholder:text-md rounded-full pl-9"
        />
      </div>
    </div>
  );
};
export default SearchTrack;
