<template>

  <v-navigation-drawer app  class="pa-5" height="100%" >
    <v-card
      dark
      class="font rounded-lg"
      elevation="12"
     
      height="100%"
    >
      <v-navigation-drawer color="grey darken-4" floating permanent >
        <v-list dense rounded>
          <v-list-item-group  mandatory 
          active-class="bg-active">
            <v-list-item v-for="item in items" :key="item.title" router :to="item.route" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="text-caption">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-navigation-drawer >

</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route:'/' },
        { title: "Products", icon: "mdi-purse" , route:'/productlist' },
        { title: "Order List", icon: "mdi-order-bool-ascending-variant", route:'/orderlist' },
        { title: "Categories", icon: "mdi-shape" , route:'/categorylist'},
        { title: "Vendor", icon: "mdi-forum" , route:'/vendorlist'},
        { title: "Shop", icon: "mdi-shopping" , route:'/shoplist'},
        { title: "Customers", icon: "mdi-account-group", route:'/customerlist' },
      ],
    };
  },
};
</script>
<style scoped>
.font {
  font-family: Arial, Helvetica, sans-serif;
}
.bg-active {
  background-color: #ff8c00;
 /* opacity: 100%; */

}
</style>
