import { cn } from "@/lib/utils";
import React from "react";

type FloorsContainerProps = {
  children?: React.ReactNode;
  floor: number
  className?: string;
}

const FloorsContainer: React.FC<FloorsContainerProps> = ({ children, className, floor }) => {
  return (
    <div id="floors-container" className={cn("flex justify-center", className)}>
      {
        React.Children.map(children, (child, i) => (
          // Render the floor only if its selected
          (i + 1) == floor &&
          // Use clone to avoid wrapping the child in a div (to use the key prop)
          React.cloneElement(child as React.ReactElement, { key: i })
        ))
      }
    </div>
  )
}

FloorsContainer.displayName = "FloorsContainer"

export default FloorsContainer; 