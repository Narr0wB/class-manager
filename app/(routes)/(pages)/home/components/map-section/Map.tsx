import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { useTimeframe } from "../HomeProvider";
import { useSession } from "next-auth/react";

type MapProps = {
  floor: number
} & React.SVGProps<SVGSVGElement>

const Map: React.FC<MapProps> = (props) => {
  const { floor, ...others } = props;
  const { theme } = useTheme();
  const [svgInnerHtml, setSvgInnerHtml] = useState("");
  const [timeframe, setTimeframe] = useTimeframe();
  const session = useSession();

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `/api/map?floor=${floor}&theme=${theme}&timeframe=${JSON.stringify(timeframe)}&userEmail=${session.data?.user?.email}`,
      { method: "GET" }
    );
    const svgInnerHtml = await res.json();
    return svgInnerHtml;
  }, [theme]);

  useEffect(() => {
    fetchData().then(svgInnerHtml => setSvgInnerHtml(svgInnerHtml))
  }, [timeframe.data, timeframe.inizio, timeframe.fine]);


  return (
    svgInnerHtml ?
      <svg
        {...others}
        key={theme}
        dangerouslySetInnerHTML={{ __html: svgInnerHtml }}
        className="w-full h-full"
      /> : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )
  )
}

Map.displayName = "Map";

export default Map;