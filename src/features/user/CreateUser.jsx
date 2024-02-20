import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '../../ui/Button';

import { updateName } from './userSlice';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // REDUX STORE SHOULD BE ONLY CHANGED WHEN WE GOT THE FINAL NAME - THIS IS THE PLACE WHERE WE UPDATE THE REDUX STATE
  function handleSubmit(e) {
    e.preventDefault();

    // GUARD CLAUSE - PREVENT INADVERTANT BLANK ENTRY
    if (!username) return;

    // > CORE LOGIC
    // Update REDUX STORE
    dispatch(updateName(username));
    // Programmaticaly NAVIGATE TO menu
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        // IMPORTANT!! WE DONT CHANGE THE REDUX STATE DIRECTLY. WE DECLARE A LOCAL USESTATE TO UPDATE THE STATE LOCALLY. ONCE WE HAVE THE FINAL NAME FOR SUBMISSION TO REDUX WE GOT TO HANDLE @ HANDLESUBMIT FUNCTION
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
