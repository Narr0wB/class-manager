import { cn } from "@/lib/utils";

type PulseProps = {
  color?: string;
}

const Pulse: React.FC<PulseProps> = ({ color }) => {
  return (
    <span className="relative flex h-3 w-3">
      <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75", color)}></span>
      <span className={cn("relative inline-flex rounded-full h-3 w-3 bg-sky-500", color)}></span>
    </span>
  )
}

Pulse.displayName = "Pulse";

export default Pulse;