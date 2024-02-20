import { useSelector } from 'react-redux';

function Username() {
  // Get a hold of the state via react-redux useSelector hook
  const username = useSelector((state) => state.user.username);

  // GUARD CLAUSE - DO NOT RENDER THE COMPONENT IF THERE IS NO USERNAME
  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
