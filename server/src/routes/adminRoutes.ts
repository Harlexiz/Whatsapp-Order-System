import express from 'express'
import { adminDeleteProduct, adminEditProduct, adminLogin, adminLogout, getCurrentAdmin } from '../controllers/adminController.js'
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
adminRouter.put('/product/edit-product/:id', requireAdmin,  adminEditProduct)
adminRouter.delete('/product/delete-product', adminDeleteProduct)