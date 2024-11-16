import React from 'react'
import { Link } from 'react-router-dom'
import '../RestoPage.css'

function Header() {

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
      <div className="form-floating mb-3 py-auto">
  <input type="email" className="form-control" id="floatingInput" placeholder="Enter yor name..."/>
  <label htmlFor="floatingInput">Full name</label>
</div>
<div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating mb-3">
  <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Password</label>
</div>
<div className="form-floating mb-3">
  <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Confirm Password</label>
</div>
      

    </form>
    </div>
        <button type="button" className="btn btn-primary  col-2 m-auto">Sign Up</button>
      <div className="modal-footer">
        <button type="button" className="btn m-auto" 
          data-bs-toggle="modal" data-bs-target="#exampleModalLogin"> Already have an account?login
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
        <button type="button" className=" border border-0 mx-auto"
        data-bs-toggle="modal" data-bs-target="#exampleModal"
        >Dont have an any account?<span className='text-danger'>register</span></button>
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
