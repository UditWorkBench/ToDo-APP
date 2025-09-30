type HeaderProps = {
  title: string;
  onBack?: () => void;
};

export function Header({ title, onBack }: HeaderProps) {
  return (
    <header className="header">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          &#x1F844;
        </button>
      )}
      <h1>{title}</h1>
    </header>
  );
}