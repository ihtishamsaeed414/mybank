import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestLoan } from "../GlobalState/features/accountSlice";

const Loan = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleLoan = () => {
    if (amount <= 0) return;
    dispatch(requestLoan({ user, amount }));
    setAmount("");
  };
  return (
    <div className="operation operation--loan">
      <h2>Request loan</h2>
      <div className="form form--loan">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="form__input form__input--loan-amount"
        />
        <button onClick={handleLoan} className="form__btn form__btn--loan">
          &rarr;
        </button>
        <label className="form__label form__label--loan">Amount</label>
      </div>
    </div>
  );
};

export default Loan;
