import React, { useEffect } from "react";
import { useState } from "react";
import "./RestoPage.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function RestoPage() {
  const [showContactDetails, setShowContactDetails] = useState(false);
  // const [CarouselList, setCarouselList] = useState([' ']);
  const [restaurant, setRestaurant] = useState(null);
  const [MenuList, setMenuList] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  // _id: "",
  // name: "",
  // city_name: "",
  // city: "",
  // area: "",
  // locality: "",
  // thumb: "",
  // cost: "",
  // address: "",
  // Cuisine: [],

  const { restaurant_id } = useParams();

  const getRestaurantDetailsFromId = async () => {
    console.log(restaurant);

    const url = "http://localhost:3056/getSingleRestaurant/" + restaurant_id;
    const { data } = await axios.get(url);
    // setCarouselList([data.result.thumbs]);
    setRestaurant(...data.result);
  };

  //get menu List
  const getMenuList = async () => {
    const url = "http://localhost:3056/getMenuItemsList";
    const response = await axios.get(url);

    console.log(response.data.result);
    setMenuList(response.data.result);
  };

  const incQty = (index) => {
    // incerease the qty
    let newMenuList = [...MenuList];
    newMenuList[index].qty += 1;
    totalPrice += newMenuList[index].price;
    setMenuList(newMenuList);
    // set price in the total price
    setTotalPrice(totalPrice);

  };

  const decQty = (index) => {
    // decrease the qty
    let newMenuList = [...MenuList];
    newMenuList[index].qty -= 1;
    totalPrice -= newMenuList[index].price;
    setMenuList(newMenuList);
    // set price in the total price
    setTotalPrice(totalPrice);

  };

  useEffect(() => {
    getRestaurantDetailsFromId();
    getMenuList();
  }, []);

  return (
    <>
      {restaurant === null ? null : (
        <>
                  {/* select menu modal */}
          <div
            className="modal fade"
            id="exampleModalToggle"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalToggleLabel">
                    {restaurant.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body ">
                  <div></div>
                  {MenuList.map((menu, index) => {
                    return (
                      <div className="row p-2" key={menu._id}>
                        <div className="col-8">
                          <p className="mb-1 h6">{menu.name}</p>
                          <p className="mb-1">₹ {menu.price} /-</p>
                          <p className="small text-muted">{menu.description}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                          <div className="menu-food-item d-flex flex-column align-items-center">
                            <img
                              src={menu.img}
                              alt=""
                              style={{ height: 100, width: 150 }}
                            />
                            {menu.qty === 0 ? (
                              <button
                                onClick={() => incQty(index)}
                                className="btn btn-primary btn-sm add"
                              >
                                Add
                              </button>
                            ) : (
                              <div className="order-item-count d-flex gap-3 section border border-1 border-dark ">
                                <span
                                  className="hand"
                                  onClick={() => decQty(index)}
                                >
                                  -
                                </span>
                                <span>{menu.qty}</span>
                                <span
                                  className="hand"
                                  onClick={() => incQty(index)}
                                >
                                  +
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <hr className=" p-0 my-2" />
                      </div>
                    );
                  })}

                  {totalPrice > 0 ? (
                    <div className="d-flex justify-content-between">
                      <h3>Total: {totalPrice} /-</h3>
                      <button
                        className="btn btn-danger"
                        data-bs-target="#exampleModalToggle2"
                        data-bs-toggle="modal"
                      >
                        Next
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

             {/* user deatils before payment */}






          {/* gallary Carousel Modal */}

          <div
            className="modal fade bg-dark"
            id="slideShow"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" style={{ height: "75vh " }}>
              <div className="modal-content bg-dark">
                <div className=" ">
                  <Carousel showThumbs={false} infiniteLoop={true}>
                    {restaurant.thumbs.map((value, index) => {
                      return (
                        <div key={index} className="w-100">
                          <img
                            className=""
                            style={{ borderRadius: "4%" }}
                            src={value}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>


                 {/* onload UI part */}

          <section className="row header-resto">
            <section className="col-lg-12  bg-danger header-resto ">
              <header className="container col-11  d-flex justify-content-between align-items-center py-lg-3 py-1 px-0 ">
                <p className="m-0 fs-3 bg-white text-danger brand fw-bold">
                  <Link to={"/"} className="text-danger">
                    e!
                  </Link>
                </p>
                <div>
                  <button className="btn border-0 text-white fs-5 ">
                    Login
                  </button>
                  <button className="btn btn-outline-light fs-5 px-lg-3 py-lg-1 px-lg-2 px-2  py-0">
                    Create an account
                  </button>
                </div>
              </header>
            </section>
          </section>

          <main className="row col-lg-10 m-auto header-resto py-4 ">
            <div className="p-0">
              <img src={restaurant.thumb} className="col-12" alt="food.png" />
              <button
                data-bs-toggle="modal"
                data-bs-target="#slideShow"
                className="gallary btn btn-outline-light fw-bold border px-lg-4 px-2 py-2 text-dark bg-transparent border-2 border border-dark fw-bold"
                // onClick={() => setCarouselList(restaurant.thumbs)}
              >
                Click to see Image Gallery
              </button>
            </div>

            <section className="row gap-lg-2  m-0 py-4">
              <div className=" d-flex flex-column gap-2">
                <div>
                  <h1>{restaurant.name}</h1>
                </div>

                <div className="d-flex justify-content-between align-items-end ">
                  <div className="d-flex gap-4">
                    <h5
                      className={
                        !showContactDetails
                          ? " border_bottom m-0 fs-4 col-6"
                          : "text-dark fs-4"
                      }
                      onClick={() => setShowContactDetails(false)}
                    >
                      Overview
                    </h5>
                    <h5
                      className={
                        showContactDetails
                          ? " border_bottom m-0 fs-4 "
                          : "text-dark fs-4"
                      }
                      onClick={() => setShowContactDetails(true)}
                    >
                      Contact
                    </h5>
                  </div>
                  <button
                    className="placeBtn bg-danger text-white fw-bold px-lg-4 px-3 fs-6 py-2 border border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalToggle"
                  >
                    Select menu
                  </button>
                </div>
              </div>
              <hr />

              <div>
                {showContactDetails ? (
                  <div>
                    {" "}
                    <div>
                      <h5>Phone Number</h5>
                      <p>+91 114004566</p>
                    </div>
                    <div>
                      <h4>{restaurant.name}</h4>
                      <p>{restaurant.address}</p>
                    </div>
                  </div>
                ) : (
                  <div className=" d-flex flex-column gap-2">
                    <div>
                      <h4>About this place</h4>
                    </div>
                    <div>
                      <h5>cuisine</h5>
                      <p>
                        {restaurant.Cuisine.map((cuisine) => cuisine.name).join(
                          " , "
                        )}
                      </p>
                    </div>
                    <div>
                      <h5>Average Cost</h5>
                      <p>Rs.{restaurant.cost} for two persons (aprrox.)</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default RestoPage;
