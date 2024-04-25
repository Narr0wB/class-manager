import { cn } from '@/lib/utils';
import SVG from 'react-inlinesvg';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { spliceSVG } from '@/lib/backend/map';


type MapProps = {
  children?: React.ReactNode;
}

   const FloorWrapper: React.FC<MapProps> = ({ children }) => {

  const g_array: string[] = spliceSVG("@/public/pianoprimo.svg")!;

  return (
    <>
      <svg>
        {g_array.map((string, idx) => {
         <g>
            {string}
         </g>
        })} 
      </svg>
      {children}
    </>
  )
}

export default FloorWrapper;