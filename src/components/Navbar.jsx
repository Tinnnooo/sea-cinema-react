import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { formatBalance } from "../utils/formatBalance";

export default function Navbar() {
  const { balance } = useStateContext();
  return (
    <nav className="nav">
      <Link to="/" className="link">
        <div className="title">SEA CINEMA</div>
      </Link>
      <div className="balance">
        <div className="balance-info">
          <span>{balance ? formatBalance(balance) : "Rp. 0"}</span>
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
