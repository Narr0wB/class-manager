import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { useTimeframe } from "../HomeProvider";
import { useSession } from "next-auth/react";
import Loading from "@/app/components/Loading";

type MapProps = {
  floor: number
} & React.SVGProps<SVGSVGElement>

const Map: React.FC<MapProps> = (props) => {
  const { floor, ...others } = props;
  const { theme } = useTheme();
  const [svgInnerHtml, setSvgInnerHtml] = useState<null | string>(null);
  const [timeframe, setTimeframe] = useTimeframe();
  const session = useSession();

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `/api/map?floor=${floor}&theme=${theme}&timeframe=${JSON.stringify(timeframe)}&userEmail=${session.data?.user?.email}`,
      { method: "GET" }
    );
    const svgInnerHtml = await res.json();
    return svgInnerHtml;
  }, [floor, theme, timeframe.data, timeframe.fine, timeframe.inizio, session.data?.user?.email]);

  useEffect(() => {
    // We put nothing in order to avoid, when a rerender is triggerd,
    // that the old map is shown while the new one is requested.
    // What we should do is: 
    //  - receive the command to re-render
    //  - delete the current html in the svg element so to show nothing
    //  - wait for the new html from the server
    //  - animate the fade in of the new map
    setSvgInnerHtml(null);

    fetchData().then(svgInnerHtml => setSvgInnerHtml(svgInnerHtml));
  }, [theme, timeframe.data, timeframe.inizio, timeframe.fine]);

  return (
    svgInnerHtml
      ? <svg
        {...others}
        key={theme}
        dangerouslySetInnerHTML={{ __html: svgInnerHtml }}
        className="w-full h-full fade-in"
      />
      : <Loading />
  )
}

Map.displayName = "Map";

export default Map;