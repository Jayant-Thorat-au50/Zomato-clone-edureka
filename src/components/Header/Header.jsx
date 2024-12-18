import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import "../RestoPage.css";
import axios from "axios";

function Header({ page }) {
  const initialUserData = {
    fullName: "",
    email: "",
    mobile_no: "",
    password: "",
    confirmPassword: "",
    address: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({ ...initialUserData });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate()

  let dataInLocal = localStorage.getItem('user');
   dataInLocal = dataInLocal===null ? null : JSON.parse(dataInLocal)
  const [loginDetailsInLocal] = useState(dataInLocal)
  
  // console.log(loginDetailsInLocal);
  

  const setInputData = (e) => {
    const { name } = e.target;

    setUserDetails({ ...userDetails, [name]: e.target.value });
  };

  const signUp = async () => {
    const sendData = {
      name: userDetails.fullName,
      email: userDetails.email,
      password: userDetails.password,
      mobile: userDetails.mobile_no,
      confirmPassword: userDetails.confirmPassword,
      address: userDetails.address,
    };

    const url = "http://localhost:3056/signUp";
    const { data } = await axios.post(url, sendData);

    if (data.success == true) {
      alert("registered successfully");
    } else alert(data.message);

    console.log(data);
  };

  const login = async () => {
    const sendData = {
      email: userDetails.email,
      password: userDetails.password,
    };

    const url = "http://localhost:3056/login";

    const { data } = await axios.post(url, sendData);
    if (data.success == true) {
      alert("user logged in successfully");
      window.location.assign('/')
      localStorage.setItem("user", JSON.stringify(data.message));
    } else {
      alert(data.message);
    }
    console.log(data);
  };

  const logout = () => {
    localStorage.removeItem('user')
    alert('logged out successfully')
    window.location.assign('/')
  }

  return (
    <>
      {/* <!-- Button trigger modal --> */}

      {/* <!-- Modal for sign up --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Register
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" className=" my-auto">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-success"
                    id="basic-addon1"
                  >
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    aria-label="Full Name"
                    aria-describedby="basic-addon1"
                    onChange={setInputData}
                    name="fullName"
                    value={userDetails.fullName}
                  />
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-warning"
                    id="basic-addon1"
                  >
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                    aria-label="Email address "
                    aria-describedby="basic-addon1"
                    onChange={setInputData}
                    name="email"
                    value={userDetails.email}
                  />
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-success"
                    id="basic-addon1"
                  >
                    <i className="fa fa-phone"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="mobile number"
                    aria-label="Email address "
                    aria-describedby="basic-addon1"
                    onChange={setInputData}
                    name="mobile_no"
                    value={userDetails.mobile_no}
                  />
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-danger"
                    id="basic-addon1"
                  >
                    <i className="fa-sharp fa-solid fa-key"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={setInputData}
                    name="password"
                    value={userDetails.password}
                  />
                  <span
                    className="input-group-text bg-danger"
                    onClick={() => setShowPassword(!showPassword)}
                    id="basic-addon1"
                  >
                    {showPassword ? (
                      <i className="fa-solid fa-eye"></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash "></i>
                    )}
                  </span>
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-primary"
                    id="basic-addon1"
                  >
                    <i className="fa-sharp fa-solid fa-key"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    aria-describedby="basic-addon1"
                    onChange={setInputData}
                    name="confirmPassword"
                    value={userDetails.confirmPassword}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text bg-info" id="basic-addon1">
                    <i className="fa-solid fa-address-book"></i>
                  </span>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter your Address"
                    aria-label="Confirm Password"
                    aria-describedby="basic-addon1"
                    onChange={setInputData}
                    name="address"
                    value={userDetails.address}
                  />
                </div>
              </form>
            </div>
            <button
              type="button"
              className="btn btn-primary  col-lg-2 col-4 m-auto"
              onClick={() => signUp()}
            >
              Sign Up
            </button>
            <div className="modal-footer">
              <button
                type="button"
                className="btn m-auto"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalLogin"
              >
                {" "}
                Already have an account?
                <span className=" text-primary"> login</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Button trigger modal --> */}

      {/* <!-- Modal for login --> */}
      <div
        className="modal fade"
        id="exampleModalLogin"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                User Login
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-success"
                    id="basic-addon1"
                  >
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={setInputData}
                    name="email"
                    value={userDetails.email}
                  />
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-warning"
                    id="basic-addon1"
                  >
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    aria-label="password"
                    aria-describedby="basic-addon1"
                    onChange={setInputData}
                    name="password"
                    value={userDetails.password}
                  />
                </div>
              </form>
            </div>
            <button
              type="button"
              className="btn btn-primary col-2 mx-auto"
              onClick={() => login()}
            >
              login
            </button>
            <div className="modal-footer">
              <button
                type="button"
                className=" bg-white mx-auto border border-0"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Dont have an any account?
                <span className="text-primary"> register</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="row header-resto ">
        <section
          className={
            page === "home"
              ? "col-lg-12   bg-transparent "
              : "col-lg-12  bg-danger   "
          }
        >
          <header className="container col-lg-12 d-flex justify-content-between align-items-center py-lg-3 py-1 px-lg-0  px-2">
            {page === "home" ? (
              <p></p>
            ) : (
              <p className="m-0 fs-3 bg-white text-danger brand fw-bold">
                <p to={"/"} className="text-danger" style={{cursor:'pointer'}} onClick={()=> navigate('/')}>
                  e!
                </p>
              </p>
            )}
            { loginDetailsInLocal ? <span className=" d-flex justify-content-center  align-items-center border border-2 border-black fw-bold text-white fs-5 gap-1 text-capitalize"><p>
              Welcome {loginDetailsInLocal.name} 
            </p>
             
             <button className=" btn btn-dark fw-bold  bg-warning"
             onClick={()=> logout()}>
              logout
             </button>

            </span>:
            <div className=" d-flex">
              <button
                className="btn border-0 text-white fs-5 d-lg-block d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalLogin"
              >
                Login
              </button>
              <button
              className="btn btn-outline-light fs-5 px-lg-3 py-lg-1 px-lg-2 px-2 d-lg-block d-none  py-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              >
                Create an account
              </button>
            </div>
              }
          </header>
        </section>
      </section>
    </>
  );
}

export default Header;
