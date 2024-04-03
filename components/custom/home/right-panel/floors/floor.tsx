import { cn } from '@/lib/utils';
import { useFloor } from '../floor-provider';

type FloorProps = {
  className?: string;
  id?: string;
  num: number;
}

const Floor: React.FC<FloorProps> = ({ className, id, num }) => {
  const [floor, setFloor] = useFloor();

  return (
    <div id={id} className={cn(
      floor === num ? "block" : "hidden",
      "w-[95%] h-[95%]",
      className
    )}>
    </div>
  )
}

export default Floor;