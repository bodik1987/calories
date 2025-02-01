import ThemeToggle from "../../ui/theme-toggle";

type ThemeProps = {};

export default function Theme({}: ThemeProps) {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
    </div>
  );
}
