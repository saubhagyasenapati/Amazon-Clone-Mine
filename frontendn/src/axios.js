import axios from "axios";

const API=axios.create({
    baseURL:"https://amazonbackend-ieyp.onrender.com"
})

export default API;