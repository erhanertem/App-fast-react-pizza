import { Link } from "react-router-dom";

function Button({ children, disabled = false, to, type, onClick }) {
  const styles = {
    base: "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 active:bg-slate-400 disabled:cursor-not-allowed disabled:bg-slate-400",
    primary: "px-4 py-3 sm:px-6 sm:py-4",
    small: "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "px-4 py-2.5 sm:px-6 sm:py-3.5 inline-block rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-400",
    round: "px-2.5 py-1 md:px-3.5 md:p-2 text-sm",
  };

  const style =
    (type === "primary" && styles.base + styles.primary) ||
    (type === "secondary" && styles[type]) ||
    (type === "small" && styles.base + styles.small) ||
    (type === "round" && styles.base + styles.round);

  // Cover for Link button elements
  if (to) {
    return (
      <Link to={to} className={style}>
        {children}
      </Link>
    );
  }

  // Cover for buttons with onClick handler
  if (onClick) {
    return (
      <button className={style} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }

  // Cover for button elements
  return (
    <button className={style} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
