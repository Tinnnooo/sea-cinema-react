import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { formatBalance } from "../utils/formatBalance";

export default function Ticket() {
  const { balance, setCinemaBalance } = useStateContext();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [oldSelectedSeats, setOldSelectedSeats] = useState(() => {
    const storedSelectedSeats = localStorage.getItem("sea-cinema");
    return storedSelectedSeats
      ? JSON.parse(storedSelectedSeats).selectedSeats
      : [];
  });
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [movie, setMovie] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [payment, setPayment] = useState(false);

  const { title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_MOVIE}`)
      .then(({ data }) => {
        const movie = data.find((movie) => movie.title === title);
        setMovie(movie);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSeatSelection = (seatNumber) => {
    setErrorMessage("");
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length >= 6) {
        setErrorMessage("Only 6 seats allowed");
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !age || selectedSeats.length <= 0) {
      setErrorMessage("Please fill in all fields");
    } else {
      if (parseInt(age) < movie.age_rating) {
        setErrorMessage("You are not old enough to watch this movie.");
      } else {
        setErrorMessage("");
        setPayment(true);
      }
    }
  };

  const handlePayment = () => {
    if (balance >= movie.ticket_price) {
      const order = {
        name: name,
        age: age,
        title: movie.title,
        price_total: movie.ticket_price * selectedSeats.length,
        selectedSeats: selectedSeats,
      };

      localStorage.setItem("sea-cinema", JSON.stringify(order));
      setCinemaBalance(balance - movie.ticket_price * selectedSeats.length);

      navigate("/");
    } else {
      setErrorMessage("Insufficient balance. Please top up your account");
    }
  };

  const handleCancelOrder = () => {
    setSelectedSeats([]);
    setName("");
    setAge("");
    setErrorMessage("");
  };

  return (
    <>
      <Navbar />
      {!payment && (
        <div className="wrapper">
          <h1 className="wrapper-title">Ticket Booking</h1>
          <div className="select-seat">
            <h2>Select Seats</h2>
            <div className="seats">
              {Array.from({ length: 64 }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handleSeatSelection(index + 1)}
                  disabled={oldSelectedSeats.includes(index + 1)}
                  className={`seat-button ${
                    selectedSeats.includes(index + 1) ? "selected" : ""
                  }`}
                >
                  Seat {index + 1}
                </button>
              ))}
            </div>
          </div>

          {errorMessage && <div className="error">{errorMessage}</div>}

          <div className="identity">
            <h2>Identity Form</h2>
            <form onSubmit={handleFormSubmit} className="identity-input">
              <div className="name-input">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="age-input">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <button type="submit" className="continue-button">
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {payment && (
        <div className="wrapper">
          <h1 className="wrapper-title">Ticket Payment</h1>
          <div className="payment-detail">
            <p>
              Payment amount:{" "}
              {formatBalance(movie.ticket_price * selectedSeats.length)}
            </p>
            {errorMessage && <div className="error">{errorMessage}</div>}
          </div>
          <div className="button-payment">
            <button onClick={handlePayment}>Payment</button>
            <button onClick={handleCancelOrder}>Cancel Order</button>
          </div>
        </div>
      )}
    </>
  );
}
