<template>
  <v-card class="ma-4" max-width="96%" height="95%" tile>
    <v-list dense>
      <v-subheader class="orange--text">Orders List</v-subheader>
      <v-row>
      <v-col  cols="12" sm="12">
        <v-text class="pa-14">ID</v-text>
         <v-text class="pa-14">Order Date</v-text>
          <v-text class="pa-14">Delivery Date</v-text>
           <v-text class="pa-14">Ordered By</v-text>
           <v-text class="pa-14"> Total Price</v-text>
       
      </v-col>
      </v-row>
      <v-list-item-group v-model="selectedItem" color="orange">
      
        <v-list-item v-for="(order, id) in orders" :key="id">
          <v-list-item-icon>
            <v-icon >mdi-numeric-{{order.id}}-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="order.order_date"></v-list-item-title>
          </v-list-item-content>
           <v-list-item-content>
            <v-list-item-title v-text="order.deliver_date"></v-list-item-title>
          </v-list-item-content>
              <v-list-item-content>
            <v-list-item-title v-text="order.customer.name"></v-list-item-title>
          </v-list-item-content>
            <v-list-item-content>
            <v-list-item-title >${{order.pricing}}</v-list-item-title>
          </v-list-item-content>
          
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    orders:[],
    selectedItem: 1,
   
  }),
  created(){
    this.getOrderLists();

  },
  methods: {
    getOrderLists() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/order/",
      })
        .then((response) => {
          this.orders = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
};
</script>