import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type CustomTooltipProps = {
  className?: string;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ className, content, side = "right", children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} className={className}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip;