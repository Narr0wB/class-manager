import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SetStateAction } from 'react';

type FloorSelectProps = {
  className?: string;
  items: string[];
  setFloor: React.Dispatch<SetStateAction<number>>;
}

const FloorSelect: React.FC<FloorSelectProps> = ({ className, items, setFloor }) => {
  // piano x => x
  const map = new Map<string, number>();
  items.forEach((item, i) => map.set(item, i));

  return (
    <div className={className}>
      <Select onValueChange={value => setFloor(map.get(value) || 0)}>
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