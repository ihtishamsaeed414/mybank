import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transaction } from "../GlobalState/features/accountSlice";

const TransferMoney = () => {
  const dispatch = useDispatch();
  const [recepient, setRecepient] = useState("");
  const [amount, setAmount] = useState("");
  const user = useSelector((state) => state.auth.user);
  const accounts = useSelector((state) => state.users.accounts);

  const account = accounts.find((acc) => acc.owner === user.owner);
  const movements = account.movements;
  let balance = 0;
  movements.forEach((mov) => {
    balance = mov.amount + balance;
  });

  let recepients = [];
  accounts.forEach((acc) => {
    recepients.push(acc.owner);
  });

  const recievers = recepients.filter((rec) => rec != user.owner);

  const handleTransaction = () => {
    const reciever = accounts.find((acc) => acc.owner === recepient);
    if (amount <= 0 && balance >= amount) return;
    const a = Number(amount);

    dispatch(transaction({ user, reciever, a }));
    setRecepient("");
    setAmount("");
  };
  return (
    <div className="operation operation--transfer">
      <h2>Transfer money</h2>
      <div className="form form--transfer">
        <select
          name="name"
          id="name"
          className="form__input form__input--to"
          onChange={(e) => setRecepient(e.target.value)}
          value={recepient}
        >
          {recievers.map((r, index) => (
            <option key={index} value={r}>
              {r}
            </option>
          ))}
        </select>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="form__input form__input--amount"
        />
        <button
          onClick={handleTransaction}
          className="form__btn form__btn--transfer"
        >
          &rarr;
        </button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </div>
    </div>
  );
};

export default TransferMoney;
