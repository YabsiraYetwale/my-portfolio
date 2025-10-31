import { useTheme } from "../contexts/ThemeContext";
import { IoSunny, IoMoon } from "react-icons/io5";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle-btn-top" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <IoMoon /> : <IoSunny />}
    </button>
  );
};

export default ThemeToggle;

