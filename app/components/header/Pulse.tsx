import { cn } from "@/lib/utils";

type PulseProps = {
  color?: string;
  className: string;
}

const Pulse: React.FC<PulseProps> = ({ color, className }) => {
  return (
    <span className={cn("relative flex size-3", className)}>
      <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75", color)}></span>
      <span className={cn("relative inline-flex rounded-full size-3 bg-sky-500", color)}></span>
    </span>
  )
}

Pulse.displayName = "Pulse";

export default Pulse;