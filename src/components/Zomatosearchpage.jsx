import React from "react";

import "./Zomatosearchpage.css";
import Header from "./Header/Header";

function Zomatosearchpage() {
  return (
    <>
      <section className="row">
        <section className="col-12 bg-danger">
          <Header/>
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

                    <select name="" className="text-muted form-select" id="">
                      <option value="">---select location---</option>
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
                    <label htmlhtmlFor="" className="h4 text-primary fw-bold">
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
                <article className="w-100 b-shadow col-12 p-lg-4 p-4  pt-lg-4 pt-3 mb-4 bg-white">
                  <section className="d-flex col-12 py-lg-2  gap-lg-5 gap-4 justify-content-lg-start justify-content-between">
                    <img
                      src="./shutterstock_1154073754@2x 1.png"
                      alt=""
                      height="100px"
                      width="100px"
                      className="display-img d-lg-block d-none "
                    />
                    <img
                      src="./shutterstock_1154073754@2x 1.png"
                      alt=""
                      height="100px"
                      width="130px"
                      className="img-sm d-lg-none d-block  "
                    />

                    <div className=" d-flex  col-8 flex-column">
                      <p className="h4 fw-bold header-text-color p-0 my-lg-1 my-0">
                        The Big Chill Cakery
                      </p>
                      <p className="fw-bold header-text-color p-0 my-lg-3 my-0">
                        FORT
                      </p>
                      <p className="text-muted p-0 my-lg-2 my-0">
                        Shop 1, Plot D, Samruddhi Complex, Chincholi …
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
                      <p className="m-0">Bakery</p>
                      <p className="m-0">₹700</p>
                    </div>
                  </section>
                </article>

                <article className=" w-100 b-shadow   col-12 p-lg-4 p-4  pt-lg-4 pt-3 mb-4 bg-white">
                  <section className="d-flex gap-4 py-lg-2">
                    <img
                      src="./shutterstock_1130181932@2x 2.png"
                      alt=""
                      height="100px"
                      width="100px"
                      className="display-img d-lg-block d-none"
                    />
                    <img
                      src="./shutterstock_1154073754@2x 1.png"
                      alt=""
                      height="80px"
                      width="130px"
                      className="img-sm d-lg-none d-block "
                    />

                    <div>
                      <p className="h4 fw-bold header-text-color p-0 my-lg-1 my-0 ">
                        The Bake Studio
                      </p>
                      <p className="fw-bold header-text-color p-0 p-0 my-lg-3 my-0">
                        FORT
                      </p>
                      <p className="text-muted p-0 my-lg-2 my-0">
                        Shop 1, Plot D, Samruddhi Complex, Chincholi …
                      </p>
                    </div>
                  </section>

                  <hr />

                  <section className="row d-lg-block d-lg-flex  col-12">
                    <div className="col-lg-3 col-6">
                      <p className="m-0">CUISINES:</p>
                      <p className="m-0"> COST FOR TWO:</p>
                    </div>
                    <div className="col-3 col-6">
                      <p className="m-0">Bakery</p>
                      <p className="m-0">₹700</p>
                    </div>
                  </section>
                </article>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default Zomatosearchpage;
