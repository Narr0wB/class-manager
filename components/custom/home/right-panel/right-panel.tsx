type RightPanelProps = {
  className?: string;
  children?: React.ReactNode;
}

const RightPanel: React.FC<RightPanelProps> = ({ className, children }) => {
  return (
    <div id="right-panel" className={className}>
      {children}
    </div>
  )
}

export default RightPanel;