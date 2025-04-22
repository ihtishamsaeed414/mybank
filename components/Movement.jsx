import React from "react";

const Movement = ({ movement, index }) => {
  const date = new Date(movement.date);
  const locale = navigator.language;
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const calcDisplayDate = (date) => {
    const daysPassed = Math.round(
      Math.abs((new Date() - date) / (1000 * 60 * 60 * 24))
    );

    const newDate = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    if (daysPassed === 0) return `Today at ${newDate}`;
    if (daysPassed === 1) return `Yesterday at ${newDate}`;
    if (daysPassed <= 7) return `${daysPassed} days ago at ${newDate}`;
    else {
      return new Intl.DateTimeFormat(locale, options).format(date);
    }
  };

  const displayDate = calcDisplayDate(date);

  return (
    <div className="movements__row">
      <div
        className={`movements__type movements__type--${
          movement.amount > 0 ? "deposit" : "withdrawal"
        }`}
      >
        {index + 1} {`${movement.amount > 0 ? "Desposit" : "Withdrawal"}`}
      </div>
      <div className="movements__date">{displayDate}</div>
      <div className="movements__value">{movement.amount}€</div>
    </div>
  );
};

export default Movement;
