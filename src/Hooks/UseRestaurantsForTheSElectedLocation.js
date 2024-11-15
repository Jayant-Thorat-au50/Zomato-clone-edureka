import axios from "axios";
import React, { useState, useEffect } from "react";


function UseRestaurantsForTheSElectedLocation(selectedLocation) {


  const [restaurantList, setRestaurantList] = useState({
    list: [],
    message: "Search for restaurants",
  });
  const [showrestaurants, setShowRestaurants] = useState(false);
//   const [loc, setloc] = useState(selectedLocation);

  console.log(selectedLocation);

  const getRestaurantListByLocationId = async () => {
    try {
      const url =
        "http://localhost:3056/getRestaurantsListByLocationId/" +
        selectedLocation.location_id
      const { data } = await axios.get(url);
      console.log(data);

      setRestaurantList({
        list: data,
        message:
          data.length > 1
            ? `${data.length} Restaurants found`
            : `${data.length} Restaurant found`,
      });
      setShowRestaurants(true);
    } catch (error) {
      console.log("server error");
    }
  };

  useEffect(() => {
    getRestaurantListByLocationId();
  }, [selectedLocation]);
  return [restaurantList, showrestaurants, setShowRestaurants];
}

export default UseRestaurantsForTheSElectedLocation;
