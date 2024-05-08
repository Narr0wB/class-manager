import CustomTooltip from "@/components/custom/CustomTooltip";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FilterIcon } from "lucide-react";
import DateTimePicker from "./DateTimePickers";

type FiltersDropdownProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>

const FiltersDropdown: React.FC<FiltersDropdownProps> = (props) => {
  return (
    <div id="filters-dropdown" {...props}>
      <DropdownMenu>
        <CustomTooltip content="Filtri" side="bottom">
          <DropdownMenuTrigger id="filters-button">
            <Button variant={"secondary"} className="pl-2">
              <FilterIcon className="p-1" />
              Filtri
            </Button>
          </DropdownMenuTrigger>
        </CustomTooltip>
        <DropdownMenuContent>
          <div className="flex flex-row items-center">
            <DropdownMenuLabel>Da</DropdownMenuLabel>
            <DateTimePicker className="border-0" />
          </div>
          <DropdownMenuSeparator />
          <div className="flex flex-row items-center">
            <DropdownMenuLabel>A</DropdownMenuLabel>
            <DateTimePicker className="border-0" />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div >
  )
}

FiltersDropdown.displayName = "FiltersDropdown";

export default FiltersDropdown;