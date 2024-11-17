import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../RestoPage.css'

function Header() {
  const initialUserData = {
    fullName:'',
    email:'',
    mobile_no:'',
    password:'',
    address:''
  }

  const [showPassword, setShowPassword] = useState(false)
  const [userDetails, setUserDetails] = useState({...initialUserData})

    return (

      <>
      {/* <!-- Button trigger modal --> */}


{/* <!-- Modal for sign up --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Register</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form action="" className=' my-auto'>
      <div class="input-group mb-3">
  <span className="input-group-text bg-success" id="basic-addon1"><i class="fa-regular fa-user"></i></span>
  <input type="text" class="form-control" placeholder="Full Name" aria-label="Full Name" aria-describedby="basic-addon1"/>
</div>
<div class="input-group mb-3">
  <span className="input-group-text bg-warning" id="basic-addon1">@</span>
  <input type="text" class="form-control" placeholder="Email address" aria-label="Email address " aria-describedby="basic-addon1"/>
</div>
<div class="input-group mb-3">
  <span className="input-group-text bg-success" id="basic-addon1"><i className='fa fa-phone' ></i></span>
  <input type="text" class="form-control" placeholder="mobile number" aria-label="Email address " aria-describedby="basic-addon1"/>
</div>
<div class="input-group mb-3">
  <span class="input-group-text bg-danger" id="basic-addon1"><i class="fa-sharp fa-solid fa-key"></i></span>
  <input type={showPassword?'text':'password'} class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
  />
  <span class="input-group-text bg-danger" onClick={()=> setShowPassword(!showPassword)} id="basic-addon1">{showPassword?<i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash "></i>}</span>

</div>
<div class="input-group mb-3">
  <span class="input-group-text bg-primary" id="basic-addon1"><i class="fa-sharp fa-solid fa-key"></i></span>
  <input type="password" class="form-control" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1"/>
</div>

<div class="input-group mb-3">
  <span class="input-group-text bg-info" id="basic-addon1"><i class="fa-solid fa-address-book"></i></span>
  <textarea type="text" class="form-control" placeholder="Enter your Address" aria-label="Confirm Password" aria-describedby="basic-addon1"/>
</div>

    </form>
    </div>
        <button type="button" className="btn btn-primary  col-lg-2 col-4 m-auto">Sign Up</button>
      <div className="modal-footer">
        <button type="button" className="btn m-auto" 
          data-bs-toggle="modal" data-bs-target="#exampleModalLogin"> Already have an account?<span className=' text-primary'> login</span>
         </button>
      </div>
    </div>
  </div>
</div>

{/* <!-- Button trigger modal --> */}

{/* <!-- Modal for login --> */}
<div className="modal fade" id="exampleModalLogin" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">User Login</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
<form action="">
<div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating ">
  <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Password</label>
</div>
</form>
      </div>
        <button type="button" className="btn btn-primary col-2 mx-auto">login</button>
      <div className="modal-footer">
        <button type="button" className=" bg-white mx-auto border border-0"
        data-bs-toggle="modal" data-bs-target="#exampleModal"
        >Dont have an any account?<span className='text-primary'> register</span></button>
      </div>
    </div>
  </div>
</div>
        <section className="row header-resto">
            <section className="col-lg-12  bg-danger header-resto ">
              <header className="container col-11  d-flex justify-content-between align-items-center py-lg-3 py-1 px-0 ">
                <p className="m-0 fs-3 bg-white text-danger brand fw-bold">
                  <Link to={"/"} className="text-danger">
                    e!
                  </Link>
                </p>
                <div>
                  <button 
                  className="btn border-0 text-white fs-5 "
                  data-bs-toggle="modal" data-bs-target="#exampleModalLogin"
                  >
                    Login
                  </button>
                  <button
                   className="btn btn-outline-light fs-5 px-lg-3 py-lg-1 px-lg-2 px-2  py-0"
                   data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create an account
                  </button>
                </div>
              </header>
            </section>
          </section>
      </>
    )
}

export default Header
