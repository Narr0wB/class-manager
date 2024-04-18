import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

type FloorButtonProps = {
  className?: string;
  classRoomNumber: number;
}

const FloorButton: React.FC<FloorButtonProps> = ({ className, classRoomNumber }) => {
  return (
    <Button
      key={classRoomNumber} id={`btn_floor_${classRoomNumber}`} className={cn(className, `absolute bg-gray-300 text-black`)}>
      Aula {classRoomNumber}
    </Button>
  );
}

export default FloorButton;