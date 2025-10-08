type HeaderProps = {
  title: string;
  onBack?: () => void;
};

export function Header({ title, onBack }: HeaderProps) {
  return (
    <header className="header">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          &larr;
        </button>
      )}
      <h1>{title}</h1>
    </header>
  );
}