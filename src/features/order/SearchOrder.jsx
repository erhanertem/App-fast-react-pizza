import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('IIDSAT');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // GUARD CLAUSE - no entry nothing happens
    if (query.trim() === '') return;

    navigate(`/order/${query}`); //Navigate to the entered order#
    setQuery(''); // Clear the input field after submission
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
