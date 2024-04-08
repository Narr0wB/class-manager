type RigthPanelProps = {
  className?: string;
  children?: React.ReactNode;
}

const RigthPanel: React.FC<RigthPanelProps> = ({ className, children }) => {
  return (
    <div id="rigth-panel" className={className}>
      {children}
    </div>
  )
}

export default RigthPanel;