
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

type FloorButtonProps = {
  className?: string;
  id?: string;
  numero_aula: number;
}

const FloorButton: React.FC<FloorButtonProps> = ({ className, id, numero_aula }) => {
    return (
        <Button className={cn(className, "bg-gray-300 rounded-none text-black")}>
            Aula no. {numero_aula}
        </Button>
    );
}

export default FloorButton;