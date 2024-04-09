import { cn } from '@/lib/utils';
import { useFloor } from '../floor-provider';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';


type FloorProps = {
  className?: string;
  id?: string;
  num: number;
  image: StaticImport;
  children?: React.ReactNode;
}

const Floor: React.FC<FloorProps> = ({ className, id, num, image, children }) => {
  const [floor, setFloor] = useFloor();

  return (
    <div id={id} className={cn(
      "flex justify-center items-center",
      floor === num ? "block" : "hidden",
      "w-full h-full",
      className
    )}>
      {children}
      <Image src={image} width={700} height={500} alt="Icon" style={{ pointerEvents: 'none' }}></Image>
    </div>
  )
}

export default Floor;