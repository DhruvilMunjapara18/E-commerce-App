const express = require('express')


const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignIncontroller = require('../controller/user/userSignin')
const authToken = require('../middleware/authToken')
const userDetailsController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUsers')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDeatils = require('../controller/product/getProductDetails')
const addToCart = require('../controller/user/addToCart')
const countAddToCartProduct = require('../controller/user/countAddtoCrtProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')




router.post("/signup",userSignUpController)
router.post("/signin",userSignIncontroller)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)



//admin panel
router.get("/all-user",authToken, allUsers)
router.post("/update-user",authToken, updateUser)


//product
router.post("/upload-product",authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product",authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDeatils)
router.get("/search",searchProduct)
router.post("/filter-product", filterProductController)


//user add to cart
router.post("/addtocart",authToken,addToCart)
router.get("/countAddToCartProduct",authToken, countAddToCartProduct)
router.get("/view-cart-product",authToken, addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

module.exports = router