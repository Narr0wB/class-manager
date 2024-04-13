import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFloor } from '../floor-provider';

type FloorSelectProps = {
  className?: string;
  items: string[];
}

const FloorSelect: React.FC<FloorSelectProps> = ({ className, items }) => {
  const [floor, setFloor] = useFloor();

  // piano x => x
  const map = new Map<string, number>();
  items.forEach((item, i) => map.set(item, i));

  return (
    <div className={className}>
      <Select onValueChange={(value) => setFloor(map.get(value) || 0)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleziona un piano..." />
        </SelectTrigger>
        <SelectContent>
          {items.map(item => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FloorSelect;