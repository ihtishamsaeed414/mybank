import React, { useState } from "react";
// import { accounts } from "../../public/data/accounts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../GlobalState/features/authSlice";

const auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const accounts = useSelector((state) => state.users.accounts);

  const handleLogin = () => {
    const account = accounts.find(
      ({ owner, pin }) =>
        owner.toLowerCase() == username.toLowerCase() && pin == password
    );

    if (account) {
      dispatch(login(account));
      navigate("/");
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div className="container">
      <div className="users">
        <div className="users__head">
          <span>username</span>
          <span>pin</span>
        </div>
        {accounts.map(({ owner, pin }, index) => (
          <div key={index}>
            <span>{owner}</span>
            <span>{pin}</span>
          </div>
        ))}
      </div>
      <div className="login">
        <img src="logo.png" alt="logo" height={100} width={100} />
        <h1 className="authheading">Welcome to Bankist</h1>
        <input
          type="text"
          placeholder="user"
          className="login__input login__input--user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="PIN"
          maxLength="4"
          className="login__input login__input--pin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="login__btn">
          login &rarr;
        </button>
      </div>
    </div>
  );
};

export default auth;
