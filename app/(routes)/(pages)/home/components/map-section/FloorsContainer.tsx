import { cn } from "@/lib/utils";
import React from "react";
import { useFloor } from "./FloorProvider";

type FloorsContainerProps = {
  children?: React.ReactNode;
  className?: string;
}

const FloorsContainer: React.FC<FloorsContainerProps> = ({ children, className }) => {
  const [floor, setFloor] = useFloor();

  return (
    <div id="floors-container" className={cn("relative flex items-center justify-center", className)}>
      {
        React.Children.map(children, (child, i) => (
          // Render the floor only if its selected
          i == floor &&
          // Use clone to avoid wrapping the child in a div (to use the key prop)
          React.cloneElement(child as React.ReactElement, { key: i })
        ))
      }
    </div>
  )
}

FloorsContainer.displayName = "FloorsContainer"

export default FloorsContainer; 