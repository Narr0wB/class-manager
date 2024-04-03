import { cn } from '@/lib/utils';

type LeftPanelProps = {
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ className, id, children }) => {
  return (
    <div id={id} className={cn('', className)}>
      {children}
    </div>
  )
}

export default LeftPanel;