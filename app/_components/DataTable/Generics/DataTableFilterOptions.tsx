import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

function DataTableFilterOptions<TData>({ table }: { table: Table<TData> }) {
  const filterableColumns = table
    .getAllColumns()
    .filter((col) => col.columnDef.enableColumnFilter);

  return (
    <div className="">
      {filterableColumns.map((column) => {
        const meta = column.columnDef.meta as
          | { label?: string; inputType?: string; options?: string[] }
          | undefined;
        const label = meta?.label;
        const inputType = meta?.inputType;

        if (inputType === "select") {
          const options = meta?.options;
          return (
            <div key={column.id} className="mb-4 flex items-center gap-2">
              <Label className="capitalize w-25">{label ?? column.id}</Label>
              <Select onValueChange={(event) => column.setFilterValue(event)}>
                <SelectTrigger className="w-sm rounded-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="capitalize"
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }

        return (
          <div key={column.id} className="mb-4 flex items-center gap-2">
            <Label className="capitalize w-25">{label ?? column.id}</Label>
            <Input
              placeholder={`Filter ${label ?? column.id}...`}
              value={(column.getFilterValue() as string) ?? ""}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className="w-sm rounded-full"
              type={inputType}
            />
          </div>
        );
      })}
    </div>
  );
}
export default DataTableFilterOptions;
