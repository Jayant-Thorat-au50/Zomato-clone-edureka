import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Zomatosearchpage.css";
import Header from "./Header/Header";

import UseLocations from "../Hooks/UseLocations";

import axios from "axios";

function Zomatosearchpage() {
  const navigate = useNavigate();
  // getting mealtype id from params
  const { meal_type_id, meal_name } = useParams();

  // default cuisines
  const [cuisinesList] = useState([
    { id: 1, name: "North Indian" },
    { id: 2, name: "South Indian" },
    { id: 3, name: "Chinese" },
    { id: 4, name: "Fast Food" },
    { id: 5, name: "Street Food" },
  ]);

  // default filter object
  const [filterObj, setFilterObj] = useState({
    meal_type: Number(meal_type_id),
    sort_min: 1,
    cuisine_id: [],
  });
  const [restaurantsList, setRestaurantList] = useState([]); // restaurant's list to show
  const [locations] = UseLocations(); // using the location

  // function on useEffect that will be called on change filter obj
  const getFilteredRestaurantsList = async () => {
    const url = "http://localhost:3056/filter";
    const { data } = await axios.post(url, filterObj);
    setRestaurantList(data.result);
  };

  const setFilter = (e, type) => {
    const { value } = e.target;
    const newFilterObj = { ...filterObj };
    switch (type) {
      case "sort":
        newFilterObj["sort_min"] = Number(value);
        break;
      case "cuisine":
        if (e.target.checked) {
          newFilterObj["cuisine_id"].push(Number(value));
        } else {
          newFilterObj["cuisine_id"] = newFilterObj["cuisine_id"].filter(
            (c) => c !== Number(value)
          );
        }
        break;
      case "location":
        if (Number(value) == -1) {
          delete newFilterObj["location_id"];
        } else {
          newFilterObj["location_id"] = Number(value);
        }
        break;
      default:
        break;
    }
    setFilterObj(newFilterObj);
  };

  useEffect(() => {
    getFilteredRestaurantsList();
  }, [filterObj]);

  return (
    <>
      <section className="row">
        <section className="col-12 bg-danger">
          <Header />
        </section>

        <section className="  bg-light col-12 border">
          <section className="col-lg-10 col-12 m-lg-auto ">
            <h2 className="my-4 header-text-color fw-bold d-lg-block d-none">
              Breakfast Places In Mumbai
            </h2>
            <h5 className="my-3 header-text-color fw-bold d-lg-none d-block m-lg-0 mx-lg-0 mx-3">
              Breakfast Places In Mumbai
            </h5>

            <section className=" gap-4 d-lg-flex d-block m-0  col-12 p-0">
              {/* filter details */}
              <section className="col-lg-3 col-11 m-lg-0 m-auto border b-shadow  p-lg-3 p-1 px-lg-3 px-4 pt-2 bg-white mb-4 ">
                <p className="fw-bold text-primary h4  d-lg-block d-none m-lg-0 pb-lg-2 ">
                  filters
                </p>

                <p className=" text-muted h4 d-lg-none d-block  col-12 ">
                  <a
                    href="#collapsecontent"
                    data-bs-toggle="collapse"
                    className="col-12 me-2 text-muted d-flex justify-content-between"
                  >
                    Filters/sort <select name="" id=""></select>{" "}
                  </a>
                </p>
                {/* content for collaps */}
                <div id="collapsecontent" className="collapse d-lg-block ">
                  <div>
                    <label
                      htmlFor=""
                      className="form-label text-primary fw-bold"
                    >
                      Select Location
                    </label>

                    <select
                      name=""
                      className="text-muted form-select"
                      id=""
                      onChange={(e) => setFilter(e, "location")}
                    >
                      <option value="-1">--Select Location--</option>
                      {locations.map((loc, index) => (
                        <option value={Number(loc.location_id)} key={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* cuisines list  */}
                  <div className="my-3">
                    <label htmlFor="" className="fw-bold text-primary">
                      Cuisine
                    </label>

                    {cuisinesList.map((cuisine) => (
                      <div className="my-2 form-check">
                        <input
                          type="checkbox"
                          id="north"
                          key={cuisine.id}
                          value={cuisine.id}
                          className="form-check-input "
                          onChange={(e) => setFilter(e, "cuisine")}
                        />
                        <label htmlFor="north" className="form-check-label">
                          {cuisine.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="my-3">
                    <label htmlFor="" className="fw-bold text-primary">
                      Cost For Two
                    </label>

                    <div className="my-2 form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="cost-range"
                      />
                      <label htmlFor="" className="form-check-label">
                        Less than ` 500
                      </label>
                    </div>
                    <div className="my-2 form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="cost-range"
                      />
                      <label htmlFor="" className="form-check-label">
                        ` 500 to ` 1000`
                      </label>
                    </div>
                    <div className="my-2 form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="cost-range"
                      />
                      <label htmlFor="" className="form-check-label">
                        ` 1000 to ` 1500
                      </label>
                    </div>
                    <div className="my-2 form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="cost-range"
                      />
                      <label htmlFor="" className="form-check-label">
                        ` 1500 to ` 2000
                      </label>
                    </div>
                    <div className="my-2 form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="cost-range"
                      />
                      <label htmlFor="" className="form-check-label">
                        ` 2000+
                      </label>
                    </div>
                  </div>

                  <div className="my-3">
                    <label htmlFor="" className="h4 text-primary fw-bold">
                      Sort
                    </label>

                    <div className="my-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="sort"
                        value={1}
                        onChange={(e) => setFilter(e, "sort")}
                      ></input>
                      <label htmlFor="" className="form-check-label">
                        Price low to high
                      </label>
                    </div>

                    <div className="my-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="sort"
                        value={-1}
                        onChange={(e) => setFilter(e, "sort")}
                      ></input>
                      <label htmlFor="" className="form-check-label">
                        Price high to low
                      </label>
                    </div>
                  </div>
                </div>
              </section>
              {/* restaurants details fetched on the basis default and changed filter */}
              <section className="col-lg-8 col-12 mt-lg-0 mt-2 ">
                {restaurantsList.map((restaurant) => (
                  <article
                    className="w-100 b-shadow col-12 p-lg-4 p-4  pt-lg-4 pt-3 mb-4 bg-white"
                    key={restaurant._id}
                    onClick={() =>
                      navigate(`/restaurant_page/${restaurant._id}`)
                    }
                  >
                    <section className="d-flex col-12 py-lg-2  gap-lg-5 gap-4 justify-content-lg-start justify-content-between">
                      <img
                        src={restaurant.thumb}
                        alt=""
                        height="100px"
                        width="100px"
                        className="display-img d-lg-block d-none "
                      />
                      <img
                        src={restaurant.thumb}
                        alt=""
                        height="100px"
                        width="130px"
                        className="img-sm d-lg-none d-block  "
                      />

                      <div className=" d-flex  col-8 flex-column">
                        <p className="h4 fw-bold header-text-color p-0 my-lg-1 my-0">
                          {restaurant.name}
                        </p>
                        <p className="fw-bold header-text-color p-0 my-lg-3 my-0">
                          {restaurant.locality}
                        </p>
                        <p className="text-muted p-0 my-lg-2 my-0">
                          {restaurant.address}
                        </p>
                      </div>
                    </section>

                    <hr />

                    <section className="d-flex">
                      <div className="col-lg-3 col-6">
                        <p className="m-0">CUISINES:</p>
                        <p className="m-0"> COST FOR TWO:</p>
                      </div>
                      <div className="col-3 col-lg-3 col-6">
                        <p className="m-0">{restaurant.Cuisine[0].name}</p>
                        <p className="m-0">{`₹${restaurant.cost}`}</p>
                      </div>
                    </section>
                  </article>
                ))}
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default Zomatosearchpage;
