import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Tabs defaultValue={type || "all"} className="w-[400px]">
      <TabsList>
        <TabsTrigger
          value="all"
          onClick={() =>
            router.push(`/search?searchTerm=${searchParams.get("searchTerm")}`)
          }
        >
          All
        </TabsTrigger>
        {FILTERS.map((filter) => (
          <TabsTrigger
            key={filter.value}
            value={filter.value}
            onClick={() =>
              router.push(
                `/search/${filter.value}?searchTerm=${searchParams.get("searchTerm")}`,
              )
            }
          >
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
export default FilterButtons;
