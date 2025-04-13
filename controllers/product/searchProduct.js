import axios from "axios"; 
import { config } from "../../config/config.js";
import { handleError } from "../../utils/errorHandler.js"; 
import { validDomains} from "../../utils/validate.js"; 


export const searchProduct = async (req, res) => {      
    const {keyword}=req.params; 
    const {
      domain = 'com',
      minPrice : minPriceStr = '0', 
      maxPrice: maxPriceStr = '100000',
      rating :  ratingStr = '0', 
      prime = 'false',
      brand = '',
      amazonChoice = 'false',
      bestSeller = 'false',
      onsale = 'false',
      minDicount='0'
    } = req.query; 



    const minPriceNum = parseFloat(minPriceStr); 
    const maxPriceNum = parseFloat(maxPriceStr);
    const ratingNum = parseFloat(ratingStr); 
    const minDicountNum = parseFloat(minDicount); 

    if (!keyword || keyword.trim() === '') {
      return handleError(res,400,'Invalid search query format'); // send a 400 Bad Request response with an error message
    };
    
    if (isNaN(minPriceNum) || isNaN(maxPriceNum) || isNaN(ratingNum)) {
      return handleError(res,400,'Invalid price or rating value'); // send a 400 Bad Request response with an error message
    };

    if (!validDomains.includes(domain)) {
      return handleError(res,400,'Invalid domain'); // send a 400 Bad Request response with an error message
    };

    if (minPriceNum > maxPriceNum) {
      return handleError(res,400,'Invalid price range'); // send a 400 Bad Request response with an error message
    };

    if (ratingNum < 0 || ratingNum > 5) {
      return handleError(res,400,'Invalid rating value'); // send a 400 Bad Request response with an error message
    };

    if (typeof prime !== 'string' || (prime !== 'true' && prime !== 'false')) {
      return handleError(res,400,'Invalid prime value'); // send a 400 Bad Request response with an error message
    };

    if (typeof brand !== 'string') {
      return handleError(res,400,'Invalid brand value'); // send a 400 Bad Request response with an error message
    };

    if (amazonChoice !== 'true' && amazonChoice !== 'false') {
      return handleError(res, 400, 'Invalid Amazon Choice value');
    };

    if (bestSeller !== 'true' && bestSeller !== 'false') {
      return handleError(res, 400, 'Invalid Best Seller value');
    };

    if (onsale !== 'true' && onsale !== 'false') {
      return handleError(res, 400, 'Invalid On Sale value');
    };

    if (minDicountNum < 0 || minDicountNum > 100) {
      return handleError(res, 400, 'Invalid Discount value');
    };

 

    const url = `${config.apiUrl}?api_key=${config.apikey}&autoparse=true&url=https://www.amazon.${domain}/s?k=${keyword}`;


    
  try {
      const response = await axios.get(url); // make a GET requsest to the amzone API with the search URL
      const data = response.data; // get the data from the response

      if(!data || !data.results || !Array.isArray(data.results)) {
          console.error('Invalid API response structure:', data);
          return handleError(res,404,{results: [] }) // send a 404 Not Found response with an error message
      }

      if(data.results.length >0) {console.log('Sample item structure:', JSON.stringify(data.results[0], null, 2));}


      let filteredData = data.results.filter((item) => {
        const price = (item && typeof item.price == 'number')?
        item.price:
        (parseFloat(item.price)) || 0; 
        
        const rate = (item && typeof item.stars == 'number')?
        item.stars :
        (parseFloat(item.stars)) || 0;

        const originalPrice = typeof item.original_price == 'object' && item.original_price !==null ?
        parseFloat(item.original_price.price) : 0;

        const discountPercentage = (originalPrice &&price) 
        ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

        const passesDiscount = discountPercentage >= minDicountNum; 
        const isPrime = item && item.has_prime === true; 
        const isAmazonChoice = item && item.is_amazon_choice === true;
        const isBestSeller = item && item.is_best_seller === true; 
        const isOnSale = originalPrice>0 && price < originalPrice;
        const brandMatch = brand ?
         item.name.toLowerCase().includes(brand.toLowerCase()) : true; 

        let passesFilter = true;

        passesFilter = (
        price >= minPriceNum 
        && price <= maxPriceNum 
        && rate >= ratingNum 
        && (prime ==='true'? isPrime : true)
        && (amazonChoice === 'true' ? isAmazonChoice : true)
        && (bestSeller === 'true' ? isBestSeller : true)
        && (onsale === 'true' ? isOnSale : true)
        && passesDiscount
      ); 

        if (isNaN(price) || isNaN(rate)) {
          return false; 
        };

        if (brand && item.name) {
          passesFilter = passesFilter && brandMatch; 
        };

        return passesFilter;
           });

      const enhancedResults = filteredData.map((item) => {
        const price = item?.price ? 
        (typeof item.price === 'number' ? item.price : parseFloat(item.price)) : 
        0;

        const originalPrice = item?.original_price?.price ? 
        parseFloat(item.original_price.price) : 
        null; 

        const discountPercentage = originalPrice > 0 ? 
        Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
        
        return {
          ...item,
          original_price: originalPrice>0 ? originalPrice : null, 
          discountPercentage: discountPercentage,
          isOnSale: originalPrice > 0 && price < originalPrice,
        };
      });     

      if(filteredData.length === 0) {
        return handleError(res,404,'No products found'); // send a 404 Not Found response with an error message
      };
      //إرسال البيانات المفلترة كاستجابة JSON
      res.json({results : enhancedResults}); 
      
    }catch (error) {
      //تسجيل الخطأ المحدث
      console.error('Error fetching data from API:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: url.replace(config.apikey, '***') // Log URL without API key
    });      
    return handleError(res,500,'Internal Server Error'); // send a 500 Internal Server Error response with an error message
  };
};