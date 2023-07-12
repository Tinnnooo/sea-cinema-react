import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { balance } = useStateContext();
  const formatBalance = (balance) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(balance);
  };
  return (
    <nav className="nav">
      <div className="title">SEA CINEMA</div>
      <div className="balance">
        <div className="balance-info">
          <span>Balance:</span>
          <span>{balance ? formatBalance(balance) : "-"}</span>
        </div>
        <div className="balance-action">
          <Link to="/balance/topup" className="topup-balance">
            Top up
          </Link>
        </div>
      </div>
    </nav>
  );
}
