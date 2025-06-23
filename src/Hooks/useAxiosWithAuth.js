import axios from "axios";
import { createAlert } from "components/Alert/Alert";
import config from "Constants/environment";
import { useSelector } from "react-redux"; // Importing useSelector correctly
import { useNavigate } from "react-router-dom";

// Custom hook to get token from Redux state
export const useAxiosWithAuth = (to = null) => {
  const token = useSelector((state) => state.auth?.token);
  const navigate = useNavigate();

  // Creating a custom Axios instance
  const api = axios.create({
    baseURL: `${config.baseUrl1}`, // Set your API base URL here
    headers: {
      "Content-Type": "application/json", // Example of content type
      Authorization: `Bearer ${to ? to : token}`, // Adding the access token if available
    },
  });

  // Setting up an error handler for common response statuses
  api.interceptors.response.use(
    (response) => response, // Returning response if successful
    (error) => {
      if (error.response) {
        // Handling common errors based on response status
        switch (error.response.status) {
          case 400:
            createAlert(error.response.data.type,
              error.response.data.message);
            console.error("Invalid request: Check your inputs.");
            break;
          case 401:
            navigate('/logout')
            createAlert(
              "Warning",
              "انتهت صلاحية الجلسة. يرجى اعادة تسجيل الدخول."
            );
            console.error("Unauthorized: Please ensure you're logged in.");
            break;
          case 402:
            // navigate('/')
            createAlert(
              "Error",
              "لا يوجد رصيد كافي في حساب المستخدم"
            );
            break;
          case 404:
            if (error.response.data.type) {
              createAlert(
                error.response.data.type,
                error.response.data.message
              );
            }
            console.error("No data found", 404);
            break;
          case 422:
            {
              // Iterate over the errors and display messages
              error.response.data.errors.forEach((error) => {
                createAlert("Warning", error.msg);
              });
            }
            break;
          default: {
            console.error(error.response.status);
          }
        }
      } else {
        createAlert(
          "Warning",
          "Unable to connect to the server. Please check your internet connection."
        );
        console.error(
          "Unable to connect to the server. Please check your internet connection."
        );
      }

      // Pass the error to queries or functions that may need to handle it
      return Promise.reject(error);
    }
  );

  return api;
};
