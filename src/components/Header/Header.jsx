import React from 'react'
import { Link } from 'react-router-dom'
import '../RestoPage.css'

function Header() {
    return (
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
    )
}

export default Header
