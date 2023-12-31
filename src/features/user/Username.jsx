import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.username);
  // console.log(username);

  if (!username) return null; //AVOID RENDERING THE COMPONENT BY RETURNING NULL - beware always a component needs to return something!!

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
