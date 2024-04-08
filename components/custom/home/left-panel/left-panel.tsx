type LeftPanelProps = {
  className?: string;
  children?: React.ReactNode;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ className, children }) => {
  return (
    <div id="left-panel" className={className}>
      {children}
    </div>
  )
}

export default LeftPanel;