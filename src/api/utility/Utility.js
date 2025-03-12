import { API_BASE_URL } from "../const/api-url";
import axios from "axios";

export function storeLocalStorage(token){
    localStorage.setItem("token",token);
    return token;
}

export function getLocalStorage(){
    const token = localStorage.getItem("token");
    return token;
}

export async function handleHttpRequest(requestType, endpoint, payload = {}, isToken = false, token = "", isFile = false) {
  try {
    let headers = {}
    if(isFile){
      headers = {
      "Content-Type": "multipart/form-data",
      };
    }else{
      headers = {
        "Content-Type": "application/json",
        };
    }

    if (isToken) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = { headers };
    // for (let pair of payload.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    // console.log(`${endpoint}`);
    
    let response;
    switch (requestType.toUpperCase()) {
      case "GET":
        response = await axios.get(`${API_BASE_URL}${endpoint}`, config);
        break;
      case "POST":
        response = await axios.post(`${API_BASE_URL}${endpoint}`, payload, config);
        break;
      case "PUT":
        response = await axios.put(`${API_BASE_URL}${endpoint}`, payload, config);
        break;
      case "DELETE":
        response = await axios.delete(`${API_BASE_URL}${endpoint}`,{
          data: payload,
          headers : headers
        });
        break;
      default:
        throw new Error("Invalid request type. Use GET, POST, PUT, or DELETE.");
    }

    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error; 
  }
}

 export const handleRefresh = () => {
    // Refresh the page (reload the browser)
    window.location.reload();
    
  }
