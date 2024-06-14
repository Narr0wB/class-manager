import CustomTooltip from "@/components/custom/CustomTooltip";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FilterIcon, X } from "lucide-react";
import DateTimePicker from "./DateTimePickers";
import { useRuleset } from "../HomeProvider";
import { filter_rules, FROM_DATE_HOUR_RULE, TO_DATE_HOUR_RULE } from "@/lib/backend/admin";
import { useState } from "react";

type FiltersDropdownProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>

const FiltersDropdown: React.FC<FiltersDropdownProps> = (props) => {
  const [_, setRuleset] = useRuleset();
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();

  return (
    <div id="filters-dropdown" {...props}>
      <DropdownMenu>
        <CustomTooltip content="Filtri" side="bottom">
          <DropdownMenuTrigger id="filters-button" asChild>
            <Button variant="secondary" className="pl-2">
              <FilterIcon className="p-1" />
              Filtri
            </Button>
          </DropdownMenuTrigger>
        </CustomTooltip>
        <DropdownMenuContent>
          <div className="flex flex-row items-center">
            <DropdownMenuLabel>Da</DropdownMenuLabel>
            <DateTimePicker className="border-0" value={from} onChange={(event) => {
              let date_time_from_rule = filter_rules.da_data_ora;
              setFrom(event.target.value);

              date_time_from_rule.values[0] = event.target.value.replace("T", " ") + ":00";

              setRuleset(prev => {
                const new_rs = { ...prev, filterDateHourFrom: date_time_from_rule }
                return new_rs;
              })
            }} />
            <Button onClick={() => {
              setFrom("");
              setRuleset(prev => {
                const new_ruleset = { ...prev, filterDateHourFrom: undefined };
                return new_ruleset;
              });
            }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DropdownMenuSeparator />
          <div className="flex flex-row items-center">
            <DropdownMenuLabel>A&nbsp;&nbsp;</DropdownMenuLabel>
            <DateTimePicker className="border-0" value={to} onChange={(event) => {
              let date_time_to_rule = filter_rules.a_data_ora;

              setTo(event.target.value);

              date_time_to_rule.values[0] = event.target.value.replace("T", " ") + ":00";

              setRuleset(prev => {
                const new_rs = { ...prev, filterDateHourTo: date_time_to_rule }
                return new_rs;
              });
            }} />
            <Button onClick={() => {
              setTo("");
              setRuleset(prev => {
                const new_ruleset = { ...prev, filterDateHourTo: undefined };
                return new_ruleset;
              });
            }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div >
  )
}

FiltersDropdown.displayName = "FiltersDropdown";

export default FiltersDropdown;