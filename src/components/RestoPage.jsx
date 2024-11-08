import React from "react";
import { useState } from "react";
import "./RestoPage.css";
import { Link } from "react-router-dom";

function RestoPage() {
  const [showContactDetails, setShowContactDetails] = useState(false);
  return (
    <>
      <section className="row header-resto">
        <section className="col-lg-12  bg-danger header-resto ">
          <header className="container col-11  d-flex justify-content-between align-items-center py-lg-3 py-1 px-0 ">
            <p className="m-0 fs-3 bg-white text-danger brand fw-bold">
              <Link to={"/"} className="text-dark">
                e!
              </Link>
            </p>
            <div>
              <button className="btn border-0 text-white fs-5 ">Login</button>
              <button className="btn btn-outline-light fs-5 px-lg-3 py-lg-1 px-lg-2 px-2  py-0">
                Create an account
              </button>
            </div>
          </header>
        </section>
      </section>

      <main className="row col-lg-10 m-auto header-resto py-4 ">
        <div className="p-0">
          <img src="./resto page.png" className="col-12" alt="food.png" />
          <h5 className="gallary  fw-bold border px-lg-4 px-2 py-2">
            Click to see Image Gallery
          </h5>
        </div>

        <section className="row gap-lg-2 gap-4  m-0 py-4">
          <div className=" d-flex flex-column gap-2">
            <div>
              <h1>The big chill cakery</h1>
            </div>

            <div className="d-flex justify-content-between align-items-end ">
              <div className="d-flex gap-4">
                <h5
                  className={
                    !showContactDetails
                      ? " text-decoration-underline m-0 fs-4 "
                      : "text-dark fs-4"
                  }
                  onClick={() => setShowContactDetails(false)}
                >
                  Overview
                </h5>
                <h5
                  className={
                    showContactDetails
                      ? " text-decoration-underline m-0 fs-4 "
                      : "text-dark fs-4"
                  }
                  onClick={() => setShowContactDetails(true)}
                >
                  Contact
                </h5>
              </div>
              <button className="placeBtn bg-danger text-white fw-bold px-lg-4 px-3 fs-6 py-2 border border-0">
                Place online order
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
                  <h4>The big chill cakery</h4>
                  <p>
                    Shop 1, Plot D, Samruddhi Complex,
                    <br /> <span>Chincholi, Mumbai-400002, Maharashtra</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className=" d-flex flex-column gap-2">
                <div>
                  <h4>About this place</h4>
                </div>
                <div>
                  <h5>cuisine</h5>
                  <p>Bakery, fast food</p>
                </div>
                <div>
                  <h5>Average Cost</h5>
                  <p>Rs.700 for two persons (aprrox.)</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default RestoPage;