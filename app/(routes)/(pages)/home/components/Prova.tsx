import { cn } from '@/lib/utils';
import { useTimeframe } from './HomeProvider';
import { Button } from '@/components/ui/button';

type ProvaProps = {
    className?: string;
    id?: string;
    children?: React.ReactNode;
}

const Prova: React.FC<ProvaProps> = ({className, id, children}) => {
    const [timeframe, setTimeframe] = useTimeframe();

    return (
        <div id={id} className={cn('', className)}>
           <Button onClick={() => {
               setTimeframe(prevState => {
                console.log("eddu")
                prevState.fine = 900;
                prevState.inizio = 800;
                return prevState;
              });
           }}>
            </Button> 
            {children}
        </div>
    )
}

export default Prova;