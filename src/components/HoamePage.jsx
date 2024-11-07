import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function HoamePage() {
  const [mealtypesList, setMealTypeList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [showrestaurants, setShowRestaurants] = useState(false);


  // getting the mealtypeList
  const getMealTypesList = async () => {
    try {
      const listOfMealTypes = "http://localhost:3056/getAllmealTypes";

      const response = await axios.get(listOfMealTypes);
      setMealTypeList(response.data);
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  };

  // getting the locationList
  const getLocationList = async () => {
    try {
      const locationList = "http://localhost:3056/getTheNamesOfAllLocations";

      const response = await axios.get(locationList);

      setLocationList(response.data.result);
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  };

  // getting the restaurant list
  const getRestaurantsList = async () => {
    try {
      const restaurantsList = "http://localhost:3056/getAllRestaurants";

      const response = await axios.get(restaurantsList);
      setRestaurantList(response.data.result);
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  };

  useEffect(() => {
    getMealTypesList();
    getLocationList();
    getRestaurantsList();
  }, []);

  return (
    <section className="row">
      <section className="col-12  bg-danger header">
        <header className="col-12 flow py-3 mt-2">
          <section className="container col-12 d-lg-flex flex-row justify-content-end d-none">
            <button className="btn text-white m-0 fs-4">Login</button>
            <button className="btn btn-outline-light px-2 m-0 fs-4">
              Create an account
            </button>
          </section>
        </header>

        <section className="header-main">
          <section className="col-12 d-flex justify-content-center">
            <p className="brand bg-white fs-1 text-danger fw-bold">e!</p>
          </section>

          <section className="col-12 d-flex justify-content-center">
            <h1 className="text-white col-lg-8 col-10 text-center first-heading">
              Find the best restaurants, cafés, and bars
            </h1>
          </section>

          <section className="d-flex justify-content-center align-items-start flex-lg-row flex-column gap-lg-4 gap-2 col-12 my-4 mb-5  ">
            <div className="col-lg-2 col-12">
              <input
                type="text"
                placeholder="Please enter a location"
                className="col-lg-12 col-11 m-lg-0 m-auto form-check border border-0 search-text two_inputs_childs locationInput"
                readOnly
                onClick={() => setShowLocation(!showLocation)}
              />

              {showLocation ? (
                <ul className="list-group locationList col-lg-2 col-11 mx-lg-0  ">
                  {locationList.map((location) => (
                    <li className="list-group-item ">{location.name}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="col-lg-4 col-12 ">
              <input
                type="text"
                placeholder=" Search for restaurants"
                className="col-11 m-lg-0 m-auto col-lg-12 form-check border border-0 search-text two_inputs_childs"
                readOnly
                onClick={() => setShowRestaurants(!showrestaurants)}
              />
              {showrestaurants ? (
                <ul className="list-group restaurantList col-lg-4 col-11 mx-lg-0">
                  {restaurantList.map((restaurant) => (
                    <li className="list-group-item ">{restaurant.name}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        </section>
      </section>

      <section className="my-3">
        <main className="container">
          <section className="my-3 my-headings-2">
            <h1 className="quick-search-text h3 fw-bold fs-2">
              <Link to={"search"} className="text-dark">
                Quick Search's
              </Link>
            </h1>
            <p className="text-muted">Discover restaurants by type of meal</p>
          </section>

          <section className=" d-flex justify-content-between flex-wrap my-4 meal_type_list">
            {/* artcles list */}
            <Link className="w-100 d-flex flex-wrap gap-2" to={"/Resto"}>
              {mealtypesList.map((restaurant) => (
                <article
                  key={restaurant.id}
                  className="article-shadow mb-4 gap-lg-0 meal-member gap-3 d-flex justify-content-start align-items-center bg-white pe-lg-4 p-0"
                >
                  <img
                    src={"/images/" + restaurant.image}
                    alt=""
                    height="140px"
                    width="160px"
                    className="h-100 "
                  />
                  <div className="px-lg-2 col-lg-8 ps-lg-3 px-0 ps-0 pe-1 gap-lg-0 gap-1 d-flex justify-content-evenly flex-column align-items-start m-0">
                    <p className="quick-search-text fw-bold fs-4 m-0">
                      {restaurant.name}
                    </p>
                    <p className="text-muted fs-5 m-0">{restaurant.content}</p>
                  </div>
                </article>
              ))}
            </Link>
          </section>
        </main>
      </section>
    </section>
  );
}

export default HoamePage;
