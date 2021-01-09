import React from "react";
import "./submit.css";
const Submit = ({ cardNo, ownerName, expDate, cvv, month = "", year = "" }) => {
  return (
    <div>
      <div className="row">
        <div className="column">
          <div className="card">
            <h3>Stored Data Successfully</h3>
            <p>CVV: {cvv}</p>
            <p>Card No: {cardNo}</p>
            <p>Owner Name: {ownerName}</p>
            <p>Month: {`${month}`} </p>
            <p>Year: {`${year}`}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => (window.location.href = "/")}
        className="btn-primary"
      >
        Pay Another
      </button>
    </div>
  );
};

export default Submit;
