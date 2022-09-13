export default {
    vendorListApi: "http://localhost:8000/api/vendor/",
    vendorDetailApi: vendorId => `http://localhost:8000/api/vendor/${vendorId}/`,
    // vendor: (vendorId, productId)=> `http://localhost:8000/api/vendor/${vendorId}/product/${productId}`
    customerListApi: "http://localhost:8000/api/customer/",
    customerDetailApi: customerId => `http://localhost:8000/api/customer/${customerId}/`,
    shopListApi:"http://localhost:8000/api/shop/",
    shopDetailApi: shopId=> `http://localhost:8000/api/shop/${shopId}`,
    categoryListApi: "http://localhost:8000/api/category/",
    categoryDeatilApi: categoryId => `http://localhost:8000/api/category/${categoryId}/`,
    orderListApi: "http://localhost:8000/api/order-detail/",
    orderDetailApi: orderId => `http://localhost:8000/api/order-detail/${orderId}/`,
    productListApi: "http://localhost:8000/api/product/",
    productDetailApi: productId=> `http://localhost:8000/api/product/${productId}/`,
    productInShopApi: shopId => `http://localhost:8000/api/product-in-shop/?shop=${shopId}`,
    productInCategoryApi: categoryId => `http://localhost:8000/api/product-in-category/?category=${categoryId}`,
    vendorFilterApi: vendorId=> `http://localhost:8000/api/vendor/?search=${vendorId}`,
    customerFilterApi: customerId=> `http://localhost:8000/api/customer/?search=${customerId}`,



}