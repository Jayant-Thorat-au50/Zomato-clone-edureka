import React, { useEffect } from "react";
import { useState } from "react";
import "./RestoPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Header from "./Header/Header";

function RestoPage() {
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [MenuList, setMenuList] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);

  const { restaurant_id } = useParams();

  // get restaurants List
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

  const getPaymentView = async () => {
    const url = "http://localhost:3056/create-order";

    const {data} = await axios.post(url, { amount:totalPrice});

   console.log(data);
   

    // Open Razorpay Checkout
    const options = {
      key: "rzp_test_RB0WElnRLezVJ5", // Replace with your Razorpay key_id
      amount: totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Food Delivery App",
      description: "Test Transaction",
      
      order_id: data.order.id, // This is the order_id created in the backend
      // callback_url: "http://localhost:3000/payment-success", // Your success URL
      handler : async (response)=>{
        console.log(response);
        
        const verifyUrl = 'http://localhost:3056/verifyPayment'
        
        let sendData = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        }
        const result = await axios.post(verifyUrl,{data:sendData})

        console.log(result);
        
         
      },
      prefill: {
        name: "deepak shinde",
        email: "jayantthorat1999@gmail.com",
        contact: "916741544474",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
                          <p className="mb-1 fw-bold fs-5 h6">{menu.name}</p>
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
                              <div className="order-item-count d-flex  section  ">
                                <span
                                  className="hand border border-1 bg-secondary px-1"
                                  onClick={() => decQty(index)}
                                >
                                  -
                                </span>
                                <span className="m-0 border border-1 bg-secondary px-2 text-dark">
                                  {menu.qty}
                                </span>
                                <span
                                  className="hand border border-1 bg-secondary px-1"
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

          <div
            className="modal fade"
            id="exampleModalToggle2"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalToggleLabel2">
                    User Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter full Name"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={() => {}}
                    ></textarea>
                  </div>
                  <i>
                    Your payment for this order is{" "}
                    <b className="text-primary">{totalPrice} /-</b>
                  </i>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-danger"
                    data-bs-target="#exampleModalToggle"
                    data-bs-toggle="modal"
                  >
                    Back
                  </button>

                  <button className="btn btn-success" onClick={getPaymentView}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>

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

          <Header />
          <main className="row col-lg-10 m-auto header-resto py-4 ">
            <div className="p-0">
              <img src={restaurant.thumb} className="col-12" alt="food.png" />
              <button
                data-bs-toggle="modal"
                data-bs-target="#slideShow"
                className="gallary btn btn-outline-light fw-bold border px-lg-4 px-2 py-2 text-dark  border-2 border border-dark fw-bold"
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
