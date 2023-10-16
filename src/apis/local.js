import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:9050/api/v1", //for the localhost
  baseURL: "https://api.herbalkingmart.com/api/v1", // for production
});
