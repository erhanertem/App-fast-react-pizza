/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

function LinkButton({ children, to }) {
  // REACT ROUTER PROGRAMMATIC NAVIGATION HOOK
  const navigate = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';
  //GUARD CLAUSE
  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );

  // ALTERNATE SOLUTION
  // function LinkButton({ children, to, onClick }) {
  //   return (
  //     <Link
  //       to={to}
  //       onClick={onClick}
  //       className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
  //     >
  //       {children}
  //     </Link>
  //   );
}

export default LinkButton;
