import { Link } from "react-router-dom";

function Button({ children, disabled = false, to }) {
  const className =
    "inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 active:bg-slate-400 disabled:cursor-not-allowed disabled:bg-slate-400 sm:px-6 sm:py-4";
  // Cover for Link button elements
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  // Cover for button elements
  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
