import express from 'express'
import { adminLogin, adminLogout, getCurrentAdmin } from '../controllers/adminController.js'
import { loginRateLimiter } from '../middleware/rateLimiter.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { fetchProducts } from '../controllers/productController.js'



export const adminRouter = express.Router()



//AUTH //

adminRouter.post('/auth/login', loginRateLimiter, adminLogin)

adminRouter.post('/auth/logout', adminLogout)
// authRoutes.post('/logout', auth.logout);

adminRouter.get('/auth/me', requireAdmin, getCurrentAdmin)


//PRODUCTS

adminRouter.get('/product/all-products', fetchProducts)
