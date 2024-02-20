import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  function handleSubmit(event) {
    //Disable auto submit/navigation behaviour of the form element
    event.preventDefault();
    // GUARD CLAUSE
    if (!query) return;

    // HIT THE ORDER/ID ROUTE PROGRAMATICALLY WHEN THE QUERY SUBMITTED
    navigate(`/order/${query}`);

    //CLEANUP
    setQuery('');
  }

  return (
    // NOTE: Wrap w/ form element so that we can submit the entry via simply pressing enter key
    <form onSubmit={handleSubmit}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        placeholder="search order #"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      ></input>
    </form>
  );
}

export default SearchOrder;
