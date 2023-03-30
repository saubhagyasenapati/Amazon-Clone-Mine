import axios from "axios";

const API=axios.create({
    // baseURL:"https://amazonbackend-ieyp.onrender.com"
    baseURL:"http://localhost:4000"
})

export default API;