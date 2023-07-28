const express = require('express')

const router = express.Router()
const productRoute = require('../controllers/productController')
  
router.get('/', productRoute.view )


module.exports = router