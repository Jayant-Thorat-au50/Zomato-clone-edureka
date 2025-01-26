import { useEffect, useState } from "react";
import axios from "axios";

function UseMealTypes() {
  const [mealtypesList, setMealTypeList] = useState([]);

  async function getMealTypes() {
    try {
      const listOfMealTypes = "http://localhost:3056/getAllmealTypes";

      const response = await axios.get(listOfMealTypes);
      setMealTypeList(response.data);
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  }

  useEffect(() => {
    getMealTypes();
  }, []);

  return [mealtypesList];
}

export default UseMealTypes;
