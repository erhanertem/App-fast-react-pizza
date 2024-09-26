import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  // NOTE: Temp user inputs are stored within the component. Storing them @ RTK global UI store is a very bad idea.
  const [username, setUsername] = useState("");
  // #1. Create a dispatch for updating RTK store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // NOTE: We only store this final input @ RTK store
    // GUARD CLAUSE
    if (!username) return;
    // Dispatch an action creator function automatically created for us @ userSlice.js - this action creator function takes in payload argument - see updateName reducer
    dispatch(updateName(username));
    // Programmatically navigate to '/menu' endpoint
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="input mb-8 w-72"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
