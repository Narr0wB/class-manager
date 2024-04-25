import { spliceSVG } from '@/lib/backend/map';
import { Database } from 'lucide-react';
import { useEffect, useState } from 'react';


const Mapp: React.FC = () => {

  //const g_array: string[] = spliceSVG("@/public/pianoprimo.svg")!;

  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
      const fetchData = async () => {
      const res = await fetch("/api/map", {
         method: "GET",
      });

      const eddu = await res.json();

      return eddu;
      };

      fetchData().then(res => {
         setData(res.data);
      })
  }, [])

  
  return (
      <svg>
         {
         data ? data.map((string, idx) => {
            return (
               <g key={idx}>
               {string}
               </g>
            )
         }) : <g></g>
      } 
      </svg>
  )
}

export default Mapp;