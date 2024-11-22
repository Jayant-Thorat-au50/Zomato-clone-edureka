import React, { useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import UseMealTypes from "../Hooks/UseMealTypes";
import UseLocations from "../Hooks/UseLocations";
import UseRestaurantsForTheSElectedLocation from "../Hooks/UseRestaurantsForTheSElectedLocation";
import Header from "./Header/Header";

function HomePage() {
  let initDataOflocation = {
    _id: "",
    name: "",
    location_id: 0,
    country_name: "",
    city_id: 0,
  };

  const [showLocation, setShowLocation] = useState(false);
  // const [showrestaurants, setShowRestaurants] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    ...initDataOflocation,
  });

  const navigate = useNavigate();
  const [mealtypesList] = UseMealTypes();

  // getting the locationList
  const [locationList] = UseLocations();

  //getSelectedLocationDetails
  const getSelectedLocationDetails = (id) => {
    setSelectedLocation(locationList[id]);
    console.log(locationList[id]);
    setShowLocation(false);
  };

  // get restaurants for the selected location by locations id
  const [restaurantList, showrestaurants, setShowRestaurants] =
    UseRestaurantsForTheSElectedLocation(selectedLocation);

  return (
    <section className="row">
      <section className="col-12  bg-danger header ">
  
        <Header
        page={'home'}
        />
  
        <section className="header-main">
          <section className="col-12 d-flex justify-content-center">
            <p className="brand bg-white fs-1 text-danger fw-bold">e!</p>
          </section>

          <section className="col-12 d-flex justify-content-center">
            <h1 className="text-white col-lg-8 col-10 text-center first-heading">
              Find the best restaurants, cafés, and bars
            </h1>
          </section>

          <section className="d-flex justify-content-center align-items-start flex-lg-row flex-column gap-lg-1 gap-2 col-12 my-4 mb-5  ">
          <div className="col-lg-2 col-12 input-wrapper">
          <div className="fs-2  col-lg-0 col-1 px-4 d-flex justify-content-center h-100 align-items-center  my-auto   location-icon">
          <i className="fa-solid fa-location-crosshairs "></i>
                </div>
              <input
                type="text"
                placeholder="  Please enter a location"
                className="col-lg-12 text-center col-11 m-lg-0 m-auto form-check border border-0 search-text two_inputs_childs locationInput"
                readOnly
                value={selectedLocation.name}
                onChange={() => getSelectedLocationDetails()}
                onClick={() => {
                  setShowRestaurants(false);
                  setShowLocation(!showLocation);
                }}
              />

              {showLocation ? (
                <ul className="list-group locationList col-lg-12 col-11 mx-lg-0  ">
                  {locationList.map((location, index) => (
                    <li
                      key={location._id}
                      className="list-group-item  "
                      onClick={() => getSelectedLocationDetails(index)}
                    >
                      {location.name}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="col-lg-4 col-12 d-flex align-items-center input-wrapper justify-content-start   ">
              <div className="col-11 col-lg-12 d-flex  m-lg-0 mx-auto ">
                <div className="fs-2  col-lg-0 col-1 px-4 my-auto  search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                  type="text"
                  placeholder={'      ' + restaurantList.message}
                  className="col-12 m-lg-0 text-start col-lg-11 input-restaurant form-check border border-0 search-text two_inputs_childs"
                  readOnly
                  onClick={() => setShowRestaurants(!showrestaurants)}
                />
              </div>
              {showrestaurants ? (
                <ul className="list-group restaurantList col-lg-11 col-11  mx-lg-0">
                  {restaurantList.list.length == 0
                    ? null
                    : restaurantList.list.map((restaurant) => (
                        <li
                          className="list-group-item d-flex align-items-center fw-bold text-primary col-12"
                          key={restaurant.name}
                          onClick={() =>
                            navigate(`/restaurant_page/${restaurant._id}`)
                          }
                        >
                          <img
                            src={restaurant.thumb}
                            style={{
                              height: 65,
                              width: 75,
                              borderRadius: "15px",
                            }}
                            className="mx-3"
                          />

                          <p className="">
                            {restaurant.name},{restaurant.city_name} <br />
                            <p className=" fw-light text-dark m-0">
                              {restaurant.address}
                            </p>
                          </p>
                        </li>
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
            <h1 className="quick-search-text h3 fw-bold fs-2 text-dark">
              Quick Search's
            </h1>
            <p className="text-muted">Discover restaurants by type of meal</p>
          </section>

          <section className=" d-flex justify-content-between flex-wrap my-4 meal_type_list">
            {/* artcles list */}
            <Link className="w-100 d-flex flex-wrap gap-2" to={"/Resto"}>
              {mealtypesList.map((restaurant) => (
                <article
                  key={restaurant._id}
                  className="article-shadow mb-4 gap-lg-0 meal-member gap-3 d-flex justify-content-start align-items-center bg-white pe-lg-4 p-0"
                >
                  <img
                    src={restaurant.image}
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

export default HomePage;
