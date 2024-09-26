import { useSelector } from "react-redux";

function Username() {
  // Read state from RTK store
  const username = useSelector((state) => state.user.username);

  // GUARD CLAUSE
  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
