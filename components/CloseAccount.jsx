import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { closeAccount } from "../GlobalState/features/accountSlice";

const CloseAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleClose = () => {
    if (name != user.owner && Number(pin) != user.pin) {
      alert("Please provide correct credentials");
      return;
    } else {
      dispatch(closeAccount(user));
      navigate("/auth");
    }
  };
  return (
    <div className="operation operation--close">
      <h2>Close account</h2>
      <div className="form form--close">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form__input form__input--user"
        />
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength="6"
          className="form__input form__input--pin"
        />
        <button onClick={handleClose} className="form__btn form__btn--close">
          &rarr;
        </button>
        <label className="form__label">Confirm user</label>
        <label className="form__label">Confirm PIN</label>
      </div>
    </div>
  );
};

export default CloseAccount;
