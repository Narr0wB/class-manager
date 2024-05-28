import { cn, minutesToString } from "@/lib/utils";

type HourRangeTextProps = {
  start: number;
  end: number;
} & React.HTMLAttributes<HTMLDivElement>

const HourRangeText: React.FC<HourRangeTextProps> = (props) => {
  const { className, start, end, ...others } = props;

  return (
    <div id="hour-range-text" className={cn("flex justify-center items-center", className)} {...others}>
      <p className="pl-1">{minutesToString(start)}</p>
      <span className="px-2">-</span>
      <p className="pr-1">{minutesToString(end)}</p>
    </div>
  )
}

HourRangeText.displayName = "HourRangeText";

export default HourRangeText;