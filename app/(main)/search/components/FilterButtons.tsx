import { Button } from "@/components/ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const FILTERS = [
  { label: "Tracks", value: "tracks" },
  { label: "Artists", value: "artists" },
  { label: "Albums", value: "albums" },
];

const FilterButtons = () => {
  const { type } = useParams<{ type: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className="flex items-center justify-start gap-2">
      <Button
        variant={!type ? "default" : "outline"}
        className="text-md rounded-full font-medium dark:text-white"
        onClick={() =>
          router.push(`/search?searchTerm=${searchParams.get("searchTerm")}`)
        }
      >
        All
      </Button>
      {FILTERS.map((filter) => (
        <Button
          key={filter.value}
          variant={type === filter.value ? "default" : "outline"}
          className="text-md rounded-full font-medium dark:text-white"
          onClick={() => {
            router.push(
              `/search/${filter.value}?searchTerm=${searchParams.get("searchTerm")}`,
            );
          }}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
export default FilterButtons;
