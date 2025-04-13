import { config } from "../../config/config.js"; // import the config object from the config.js file
import axios from "axios"; // import the axios library for making HTTP requests
import { handleError } from "../../utils/errorHandler.js"; // import the handleError function for error handling
import { validDomains,isValidProductId } from "../../utils/validate.js";

export const getProduct = async (req, res) => {
    const {asin}= req.params; // get the product id from the request parameters
    const {domain= 'com' }= req.query; // get the domain from the request query parameters

    if (!validDomains.includes(domain)) return handleError(res,400,'Invalid domain'); // send a 400 Bad Request response with an error message
    
    if (!isValidProductId(asin)) return handleError(res,400,'Invalid product ID format'); // send a 400 Bad Request response with an error message
      

      const url = `${config.apiUrl}?api_key=${config.apikey}&autoparse=true&url=https://www.amazon.${domain}/dp/${asin}`; // construct the URL for the amzone API request

      try {
        const response = await axios.get(url); // make a GET request to the amzone API with the product URL
        const data = response.data; // get the data from the response

        if(!data && Object.keys(data).length === 0){
            return handleError(res,404,'Product not found')  // send a 404 Not Found response with an error message
        }
        res.json(data); // send the data as a JSON response

      } catch (error) {
        console.error('error feching product',error.message); // log the error to the console
        return handleError(res,500,'Internal Server Error'); // send a 500 Internal Server Error response with an error message

      }
};