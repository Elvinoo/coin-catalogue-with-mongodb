import React, { useEffect, useState } from "react";
import "./AdminPanelEdit.css";
import ellipse from "../../../ellipse-with-plus.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../../../Redux/Features/dataSlice/dataSlice";
import Pagination from "../../../Components/Pagination";
import { useDispatch, useSelector } from "react-redux";
export default function AdminPanelEdit() {
  /* const [coins, setCoins] = useState([]); */
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const [value, setValue] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchData, setSearchData] = useState([]);
  //eslint-disable-line react-hooks/exhaustive-deps
  const navigate = useNavigate();
  const location = useLocation();
  const searchHandler = (e) => {
    e.preventDefault();
    console.log(location.pathname);

    if (value !== "") {
      navigate(location.pathname + `?q=${value.toLowerCase()}`);
      fetch(`http://localhost:5000/search?q=${value}`, {
        headers: {
          "api-key": "Elvin1234",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSearchData(data);
          setSearchClicked(true);
        });
    } else {
      setSearchClicked(false);
    }
  };

  return (
    <>
      <h1 className="home-page-header admin-header">Admin Panel</h1>
      <form
        className="search-input-form"
        action="submit"
        onSubmit={searchHandler}
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
      <div className="editable-coins">
        {!searchClicked ? (
          <Pagination data={data} itemsPerPage={3} />
        ) : (
          <Pagination data={searchData} itemsPerPage={2} />
        )}

        <div className="new edit-coin">
          <img src={ellipse} alt="ellipse" />
          <div className="texts">
            <Link to="/admin-panel/addCoin">Add a new coin</Link>
          </div>
        </div>
      </div>
    </>
  );
}
