import { Button } from 'react-day-picker';
import CustomTooltip from './custom-tooltip';

type CustomButtonProps = {
  className?: string;
  id?: string;
  children?: React.ReactNode;
  content: string
}

const CustomButton: React.FC<CustomButtonProps> = ({ className, id, children, content }) => {
  return (
    <CustomTooltip content={content}>
      <Button id={id} className={className}>
        {children}
      </Button>
    </CustomTooltip>
  )
}

export default CustomButton;