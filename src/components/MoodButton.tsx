interface MoodButtonProps {
  emoji: string;
  label: string;
  isActive?: boolean;
  activeColor: string;
  onClick?: () => void;
}

function MoodButton({ emoji, label, isActive, activeColor, onClick }: MoodButtonProps) {

  const currentBackgroundColor = isActive ? activeColor : 'transparent';

  return (
    <button 
      className={`pixel-button mood-button ${isActive ? 'active' : ''}`}
      style={{ backgroundColor: currentBackgroundColor }} 
      onClick={onClick}
    >
      <span className="mood-emoji">{emoji} </span>
      <span className="mood-label">{label}</span>
    </button>
  );
}

export default MoodButton;