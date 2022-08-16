<template>
  <v-card class="ma-4" max-width="96%" height="95%" tile>
    <v-list dense>
      <v-subheader>Orders List</v-subheader>

      <v-list-item class="orange--text">
        <v-list-item-content>
          <v-list-item-title>ID</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>Order Date</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>Deliver Date</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>Ordered By</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>Total</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-button color="orange" v-bind="attrs" v-on="on">
            <v-list-item v-for="(order, id) in orders" :key="id">
            <v-card width=100% height="35" >
              <v-list-item >
              <v-list-item-icon>
                <v-icon>mdi-numeric-{{ order.id }}-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ order.order_date }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>{{ order.deliver_date }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>{{ order.customer.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>${{ order.pricing }}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              </v-card>
            </v-list-item>
          </v-button>
        </template>

        <v-card>
          <v-card-title class="text-h5  orange--text" >
            Order Details
          </v-card-title>

          <v-card-text>Order ID:{{order_details.id}}
          </v-card-text>
  <v-card-text>Order Date: {{order_details.order_date}}
          </v-card-text>
           <v-card-text>Delivery Date: {{order_details.deliver_date}}
          </v-card-text>  
          <v-card-text>Total Price: ${{order_details.pricing}}
          </v-card-text>


          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
             Done
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    orders: [],
    order_details:{
        id: "",
        order_date: "",
        pricing: "",
        deliver_date: "",
        customer: "",
      
    },
  }),
  created() {
    this.getOrderLists(),
    this.getOrderDetails();
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
    getOrderDetails(){
      axios({
        method:"get",
        url:"http://localhost:8000/api/order/2/"
      }) .then((response) => {
          this.order_details = response.data;
        })
        .catch((response) => {
          console.log(response);
        });

    },
  },
};
</script>
