import { cn } from '@/lib/utils';

type ProvaProps = {
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

const Prova: React.FC<ProvaProps> = ({ className, id, children }) => {
  return (
    <div id={id} className={cn('', className)}>
      {children}
    </div>
  )
}

export default Prova;