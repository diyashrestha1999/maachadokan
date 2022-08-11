import Vue from 'vue'
import VueRouter from 'vue-router'
import SideNavView from '../views/SideNavView.vue'
import ProductList from '../views/ProductList.vue'
import OrderList from '../views/OrderList.vue'
import CategoryList from '../views/CategoryList.vue'
import CustomerList from '../views/CustomerList.vue'
import ShopList from '../views/ShopList.vue'
import VendorList from '../views/VendorList.vue'
import AddProduct from '../views/AddProduct.vue'
import ProductDetail from '../views/ProductDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: SideNavView
  },
  {
    path: '/productlist',
    name: 'product',
    component: ProductList
  },
  {
    path: '/orderlist',
    name: 'order',
    component: OrderList
  },
  {
    path: '/vendorlist',
    name: 'vendor',
    component: VendorList
  },
  {
    path: '/shoplist',
    name: 'shop',
    component: ShopList
  },
  {
    path: '/categorylist',
    name: 'category',
    component: CategoryList
  },
  {
    path: '/customerlist',
    name: 'customer',
    component: CustomerList
  }, 
  {
    path: '/addproduct',
    name: 'addproduct',
    component: AddProduct
  },
  
  {
    path: '/ProductDetail',
    name: 'ProductDetail',
    component: ProductDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
