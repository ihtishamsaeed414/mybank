import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Movement from "../../components/Movement";
import TransferMoney from "../../components/TransferMoney";
import Loan from "../../components/Loan";
import { logout } from "../../GlobalState/features/authSlice";
import CloseAccount from "../../components/CloseAccount";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const accounts = useSelector((state) => state.users.accounts);

  useEffect(() => {
    !user.owner && navigate("/auth");
  }, []);

  const account = accounts.find((acc) => acc.owner === user.owner);

  let movements = account.movements.slice().reverse();

  // calculate balance
  let balance = 0;
  movements.forEach((mov) => {
    balance = mov.amount + balance;
  });

  // calculate income

  // let income = 0;
  // movements.forEach((mov) => {
  //   if (mov.amount > 0) {
  //     income = mov.amount + income;
  //   }
  // });

  const income = movements
    .filter((mov) => mov.amount > 0)
    .map((deposit) => deposit.amount)
    .reduce((acc, deposit) => acc + deposit, 0);

  // calculate out
  const out = movements
    .filter((mov) => mov.amount < 0)
    .map((deposit) => deposit.amount)
    .reduce((acc, withdrawal) => acc + withdrawal, 0);

  // calculate interest
  const interest = movements
    .filter((mov) => mov.amount > 0)
    .map((deposit) => (deposit.amount * account.interestRate) / 100)
    .reduce((acc, desposit) => acc + desposit, 0);

  // logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  // calculating current date and time
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };
  const locale = navigator.language;
  const presentDate = new Intl.DateTimeFormat(locale, options).format(
    new Date()
  );

  return (
    <>
      {user.owner && (
        <>
          <nav>
            <p className="welcome">Welcome Mr. {user.owner}</p>
            <img src="logo.png" alt="Logo" className="logo" />
            <div>
              <button onClick={handleLogout} className="logout__btn">
                logout
              </button>
            </div>
          </nav>
          {/* main */}
          <main className="app">
            {/*  BALANCE  */}
            <div className="balance">
              <div>
                <p className="balance__label">Current balance</p>
                <p className="balance__date">
                  As of <span className="date">{presentDate}</span>
                </p>
              </div>
              <p className="balance__value">{balance.toFixed(2)}€</p>
            </div>

            {/* MOVEMENTS  */}
            <div className="movements">
              {movements.map((mov, index) => (
                <Movement key={index} movement={mov} index={index} />
              ))}
            </div>

            {/*  SUMMARY  */}
            <div className="summary">
              <p className="summary__label">In</p>
              <p className="summary__value summary__value--in">
                {income.toFixed(2)}€
              </p>
              <p className="summary__label">Out</p>
              <p className="summary__value summary__value--out">
                {Math.abs(out).toFixed(2)}€
              </p>
              <p className="summary__label">Interest</p>
              <p className="summary__value summary__value--interest">
                {interest.toFixed(2)}€
              </p>
              <button className="btn--sort">&darr; SORT</button>
            </div>

            {/* OPERATION: TRANSFERS  */}
            <TransferMoney />

            {/*  OPERATION: LOAN  */}
            <Loan />

            {/* OPERATION: CLOSE  */}
            <CloseAccount />

            {/* LOGOUT TIMER  */}
            <p className="logout-timer">
              You will be logged out in <span className="timer">05:00</span>
            </p>
          </main>
        </>
      )}
    </>
  );
};

export default Home;
