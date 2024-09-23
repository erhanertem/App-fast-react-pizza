import { Link } from "react-router-dom";

function Button({ children, disabled = false, to, type }) {
  const styles = {
    base: "inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 active:bg-slate-400 disabled:cursor-not-allowed disabled:bg-slate-400",
    primary: "px-4 py-3 sm:px-6 sm:py-4",
    small: "px-4 py-2 md: px-5 md:py-2.5 text-xs",
  };

  const style =
    (type === "primary" && styles.base + styles.primary) ||
    (type === "small" && styles.base + styles.small);

  // Cover for Link button elements
  if (to) {
    return (
      <Link to={to} className={style}>
        {children}
      </Link>
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
