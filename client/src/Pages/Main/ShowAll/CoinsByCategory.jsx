import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./CoinsByCategory.css";
import axios from "axios";
export default function CoinsByCategory() {
  const [coins, setCoins] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      navigate(`/search?q=${value.toLowerCase()}`);
    }
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/coins/${category}`)
      .then((response) => {
        const data = response.data;
        setCoins(data);
      })
      .catch((error) => {
        console.error('Error fetching coins:', error);
      });
  }, [category]);
 
  return (
    <div className="category">
      <h1 className="category-name">
        {category.charAt().toUpperCase() + category.slice(1) + " Coins"}
      </h1>

      <div className="search-input">
        <form
          onSubmit={handleSubmit}
          className="search-input-form"
          action="submit"
        >
          <label htmlFor="search-input">Input field</label>
          <div className="input-button">
            <input
              type="text"
              name="search-input"
              id="search-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
      <Link className="back-to-home-page" to="/">
        Back to Home Page
      </Link>
      <div className="coins-by-category-div">
        {coins.map((coin) => {
          return (
            <div className={"coin-by-category"} key={coin._id}>
              <img src={coin.observeLink} alt={coin.coinName} />
              <div className="category-coin-texts">
                <h3 className="coin-name-h3">
                  <Link className="coin-name-h3 " to={"/coin/" + coin._id}>
                    {coin.coinName}
                  </Link>
                </h3>
                <p>{coin.shortDesc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
