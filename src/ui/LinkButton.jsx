import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  // Cover the button element
  const navigate = useNavigate();
  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  // Cover for regular Link navigation elements
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
