import React, { useState, useEffect } from "react";
import axios from "axios";

function UseLocations() {
  const [locationList, setLocationList] = useState([]);

  const getLocationList = async () => {
    try {
      const locationList = "http://localhost:3056/getTheNamesOfAllLocations";

      const response = await axios.get(locationList);

      setLocationList(response.data.result);
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationList();
  }, []);

  return [locationList];
}

export default UseLocations;
