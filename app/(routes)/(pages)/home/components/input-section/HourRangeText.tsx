import { cn, minutesToString } from "@/lib/utils";

type HourRangeTextProps = {
  start: number;
  end: number;
} & React.HTMLAttributes<HTMLParagraphElement>

const HourRangeText: React.FC<HourRangeTextProps> = (props) => {
  const { className, start, end, ...others } = props;

  return (
    <p id="hour-range-text" className={cn("flex justify-center items-center", className)} {...others}>
      {minutesToString(start)}-{minutesToString(end)}
    </p>
  )
}

HourRangeText.displayName = "HourRangeText";

export default HourRangeText;