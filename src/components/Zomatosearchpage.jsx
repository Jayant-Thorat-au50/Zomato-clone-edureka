import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Zomatosearchpage.css";
import Header from "./Header/Header";

import UseLocations from "../Hooks/UseLocations";
import UseRestaurantsForTheSElectedLocation from "../Hooks/UseRestaurantsForTheSElectedLocation";

function Zomatosearchpage() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [locations] = UseLocations();

  const [restaurantList] =
    UseRestaurantsForTheSElectedLocation(selectedLocation);

  

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
                      onChange={(e)=>setSelectedLocation(locations[e.target.value])}
                    >
                      <option value="">--Select Location--</option>
                      {locations.map((loc, index) => (
                        <option value={index} key={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="my-3">
                    <label htmlFor="" className="fw-bold text-primary">
                      Cuisine
                    </label>

                    <div className="my-2 form-check">
                      <input type="checkbox" className="form-check-input" />
                      <label htmlFor="" className="form-check-label">
                        North Indian
                      </label>
                    </div>
                    <div className="my-2 form-check">
                      <input type="checkbox" className="form-check-input" />
                      <label htmlFor="" className="form-check-label">
                        South Indian
                      </label>
                    </div>
                    <div className="my-2 form-check">
                      <input type="checkbox" className="form-check-input" />
                      <label htmlFor="" className="form-check-label">
                        Chinese
                      </label>
                    </div>
                    <div className="my-2 form-check">
                      <input type="checkbox" className="form-check-input" />
                      <label htmlFor="" className="form-check-label">
                        Fast Food
                      </label>
                    </div>
                    <div className="my-2  form-check">
                      <input type="checkbox" className="form-check-input" />
                      <label htmlFor="" className="form-check-label">
                        Street Food
                      </label>
                    </div>
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
                      ></input>
                      <label htmlFor="" className="form-check-label">
                        Price high to low
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <section className="col-lg-8 col-12 mt-lg-0 mt-2 ">
                <h4>{`found ${restaurantList.list.length} restaurants in `}</h4>
                {restaurantList.list.map((restaurant) => (
                  <>
              
                  <article
                    className="w-100 b-shadow col-12 p-lg-4 p-4  pt-lg-4 pt-3 mb-4 bg-white"
                    key={restaurant._id}
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
                  </>
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
