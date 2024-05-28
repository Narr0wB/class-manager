import { TimeFrame } from "@/lib/backend/database";
import { formatDate, minutesToString } from "@/lib/utils";

type DateTimeInfoProps = {
  timeframe: TimeFrame
} & React.HTMLAttributes<HTMLDivElement>

const DateTimeInfo: React.FC<DateTimeInfoProps> = (props) => {
  const { timeframe, ...others } = props;

  return (
    <div id="datetime-info" className="flex items-center text-end" {...others}>
      {formatDate(timeframe.data)}<br />
      {`${minutesToString(timeframe.inizio)}-${minutesToString(timeframe.fine)}`}
    </div>
  )
}

DateTimeInfo.displayName = "DateTimeInfo";

export default DateTimeInfo;