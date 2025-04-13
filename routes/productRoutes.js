import express from 'express'; // import the express module

import { getProduct , searchProduct} from '../controllers/productController.js'; // import the getProduct function from the productController module

const router = express.Router(); // create a new router object


router.get('/products/:asin', getProduct); // define a route for getting product data by product ID

router.get('/search/:keyword', searchProduct); // define a route for searching products

export default router; // export the router object