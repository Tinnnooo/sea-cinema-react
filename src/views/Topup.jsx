import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useStateContext } from "../contexts/ContextProvider";
import { formatBalance } from "../utils/formatBalance";
import { useNavigate } from "react-router-dom";

export default function Topup() {
  const { balance, setCinemaBalance } = useStateContext();
  const [topUp, setTopUp] = useState(0);

  const navigate = useNavigate();

  const handleTopup = () => {
    setCinemaBalance(parseInt(balance) + parseInt(topUp));
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <main>
        <div className="wrapper">
          <div className="wrapper-title">Top Up </div>
          <div className="balance-topup-info">
            <div className="current-balance">
              <span>Current balance: </span>
              <span>{formatBalance(balance)}</span>
            </div>
          </div>
          <div className="balance-value">
            <label htmlFor="balance" className="topup-title">
              Top up amount:{" "}
            </label>
            <input
              type="number"
              className="topup-value"
              name="balance"
              id="balance"
              placeholder="Rp."
              onInput={(e) => setTopUp(e.target.value)}
            />
            <button
              type="button"
              className="topup-button"
              onClick={handleTopup}
            >
              Top up
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
