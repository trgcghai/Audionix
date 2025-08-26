import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.KeyboardEvent) => void;
}

const SearchSection = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
}: SearchSectionProps) => {
  return (
    <div className="relative hidden md:flex">
      <Search className="absolute top-3.5 left-2.5 h-5 w-5 text-gray-400" />
      <Input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="What do you want to play ?"
        className="placeholder:text-md h-9 w-[180px] rounded-full p-6 pl-9 lg:w-[400px]"
      />
    </div>
  );
};
export default SearchSection;
