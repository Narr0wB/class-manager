import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import React from "react";

type FloorButtonProps = {
  className?: string;
  content: React.ReactNode;
}

const FloorButton: React.FC<FloorButtonProps> = ({ className, content }) => {
  return (
    <g className={className}>
      {content}
    </g>
  );
}

export default FloorButton;