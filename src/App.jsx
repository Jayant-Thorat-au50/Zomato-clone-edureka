import React from "react";
import './App.css'
import HomePageZomato from "./components/HomePage";
import Zomatosearchpage from "./components/Zomatosearchpage";
import RestoPage from "./components/RestoPage";
import PageNotFound from "./components/PageNotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <section className=" container-fluid-lg ">
        <Routes>
          <Route path="/" element={<HomePageZomato />} />
          <Route path="/meal/:restaurant_name" element={<Zomatosearchpage />} />
          <Route path="/restaurant_page/:restaurant_id" element={<RestoPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
