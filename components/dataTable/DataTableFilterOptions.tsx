import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

interface DataTableFilterOptionsProps<TData> {
  table: Table<TData>;
  className?: string;
  itemClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

function DataTableFilterOptions<TData>({
  table,
  className,
  itemClassName = "",
  inputClassName = "",
  labelClassName = "",
}: DataTableFilterOptionsProps<TData>) {
  const itemBaseClassName = "mb-4 flex items-center gap-2";
  const inputBaseClassName = "w-sm rounded-full";
  const labelBaseClassName = "capitalize w-25";

  const filterableColumns = table
    .getAllColumns()
    .filter((col) => col.columnDef.enableColumnFilter);

  return (
    <>
    <div className={className}>
      {filterableColumns.map((column) => {
        const meta = column.columnDef.meta as
          | { label?: string; inputType?: string; options?: string[] }
          | undefined;
        const label = meta?.label;
        const inputType = meta?.inputType;

        if (inputType === "select") {
          const options = meta?.options;
          return (
            <div
              key={column.id}
              className={cn(itemBaseClassName, itemClassName)}
            >
              <Label className={cn(labelBaseClassName, labelClassName)}>
                {label ?? column.id}
              </Label>
              <Select onValueChange={(event) => column.setFilterValue(event)}>
                <SelectTrigger
                  className={cn(inputBaseClassName, inputClassName)}
                >
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
          <div key={column.id} className={cn(itemBaseClassName, itemClassName)}>
            <Label className={cn(labelBaseClassName, labelClassName)}>
              {label ?? column.id}
            </Label>
            <Input
              placeholder={`Filter ${label ?? column.id}...`}
              value={(column.getFilterValue() as string) ?? ""}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className={cn(inputBaseClassName, inputClassName)}
              type={inputType}
            />
          </div>
        );
      })}
    </div>

    <Button className="rounded-full" size={"sm"} onClick={() => {
      table.resetColumnFilters()
      table.resetColumnOrder()
    }}>
      Clear Filters
    </Button>
    </>
  );
}
export default DataTableFilterOptions;
