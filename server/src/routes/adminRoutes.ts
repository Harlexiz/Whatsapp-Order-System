import express from 'express'
import {
    adminAddNewProduct,
    adminDeleteProduct,
    adminEditProduct,
    adminGetDashboardStats,
    adminLogin, adminLogout,
    adminUpdatePassword,
    adminUpdateProfile,
    getCurrentAdmin
} from '../controllers/adminController.js'
import { loginRateLimiter } from '../middleware/rateLimiter.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { fetchProducts } from '../controllers/productController.js'



export const adminRouter = express.Router()



//AUTH //

adminRouter.post('/auth/login', loginRateLimiter, adminLogin)

adminRouter.post('/auth/logout', adminLogout)
// authRoutes.post('/logout', auth.logout);

adminRouter.get('/auth/me', requireAdmin, getCurrentAdmin)
adminRouter.patch('/auth/update-profile', requireAdmin, adminUpdateProfile)
adminRouter.patch('/auth/update-password', requireAdmin, adminUpdatePassword)


//PRODUCTS

adminRouter.get('/product/all-products', fetchProducts)
adminRouter.put('/product/edit-product/:id', requireAdmin, adminEditProduct)
adminRouter.post('/product/add-product', adminAddNewProduct) // require admin
adminRouter.delete('/product/delete-product', adminDeleteProduct)  // Require admin
adminRouter.get('/product/stats', adminGetDashboardStats)  // require admin