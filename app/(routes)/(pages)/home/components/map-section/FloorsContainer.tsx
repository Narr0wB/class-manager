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
      {React.Children.map(children, (child, i) => (
        // Render the floor only if its selected
        i == floor ? (
          <div key={i} id={`floor-${i}`} className="w-full h-full">
            {child}
          </div>
        ) : (
          <></>
        )
      ))}
    </div>
  )
}

FloorsContainer.displayName = "FloorsContainer"

export default FloorsContainer; 