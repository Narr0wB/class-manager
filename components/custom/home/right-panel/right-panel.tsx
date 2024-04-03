import { cn } from '@/lib/utils';

type RigthPanelProps = {
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

const RigthPanel: React.FC<RigthPanelProps> = ({ className, id, children }) => {
  return (
    <div id={id} className={cn('', className)}>
      {children}
    </div>
  )
}

export default RigthPanel;