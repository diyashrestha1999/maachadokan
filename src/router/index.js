import Vue from 'vue'
import VueRouter from 'vue-router'
// import SideNavView from '../views/SideNavView.vue'
import ProductList from '../views/ProductList.vue'
import OrderList from '../views/OrderList.vue'
import CategoryList from '../views/CategoryList.vue'
import CustomerList from '../views/CustomerList.vue'
import ShopList from '../views/ShopList.vue'
// import VendorList from '../views/VendorList.vue'
import AddProduct from '../views/AddProduct.vue'
import ProductDetail from '../views/ProductDetail.vue'
import OrderDetail from '../views/OrderDetail.vue'
import CategoryProduct from '../views/CategoryProduct.vue'
import VendorNew from '../views/VendorNew.vue'
import DashBoard from '../views/DashBoard.vue'
import ExampleView from  '../views/ExampleView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: DashBoard
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
  // {
  //   path: '/vendorlist',
  //   name: 'vendor',
  //   component: VendorList
  // },
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
    path: '/ProductDetail/:id',
    name: 'ProductDetail',
    component: ProductDetail,
  
    
  },
  { 
    path: '/orderdetail/:id',
    name: 'OrderDetail',
    component: OrderDetail,
  
    
  },
  {
    path:'/categoryproduct/:id',
    name:'CategoryProduct',
    component:CategoryProduct,
  },
  {
    path:'/vendor',
    name:'Vendor',
    component:VendorNew,
  },
  {
    path:'/example',
    name:'example',
    component:ExampleView,
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
