import { cn } from '@/lib/utils';
import SVG from 'react-inlinesvg';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { spliceSVG } from '@/lib/backend/map';


type FloorProps = {
  className?: string;
  id?: string;
  src: string;
  num: number;
  children?: React.ReactNode;
}

const Floor: React.FC<FloorProps> = ({ className, id, src, num, children }) => {
  const { theme } = useTheme();
  const [loading, isLoading] = useState(true);


  return (
    <>
      {/* <SVG
        // Use the theme as key to trigger a re-render when the theme changes
        key={theme}
        id={id}
        src={src}
        title={`Floor ${num}`}
        description={`The floor ${num} SVG.`}
        loader={
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        }
        onLoad={(src, isCached) => isLoading(false)}
        onError={err => console.log(err.message)}
        preProcessor={code => code.replace("/stroke:\s*([^;]+)/g", `stroke: ${theme === "dark" ? "rgb(255, 255, 255)" : "rgb(200, 200, 200)"}`)}
        className={cn("w-full h-full", className)} /> */}
      <>
        {loading ? <></> : children}
      </>
    </>
  )
}

export default Floor;