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
import VendorDetail from '../views/VendorDetail.vue'
import CustomerDetail from '../views/CustomerDetail.vue'
import ProductInShop from '../views/ProductInShop.vue'

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
    component: ProductList,
    props:true

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
    component: CustomerList,
    props:true

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
    props:true
  },
  {
    path:'/vendordetail/:id',
    name:'VendorDetail',
    component:VendorDetail,
  },
  {
    path:'/customerdetail/:id',
    name:'customerDetail',
    component:CustomerDetail,
  },
  {
    path:'/productsinshop/:id',
    name:'ProductInShop',
    component:ProductInShop,
  },
  
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
