<template>
  <v-card class="ma-4" max-width="96%" height="95%" tile>
    <v-list dense>
      <v-subheader>Orders List</v-subheader>

      <v-list-item class="orange--text pl-10" >
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

      <v-dialog v-model="dialog" width="500" >
        <template v-slot:activator="{ on, attrs }">
          <v-button color="orange" v-bind="attrs" v-on="on">
            <v-list-item
              v-for="order_detail in order_details"
              :key="order_detail.id"
              
            >
              <v-card width="100%" height="35"  >
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-numeric-{{ order_detail.id }}-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      order_detail.order.order_date
                    }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      order_detail.order.deliver_date
                    }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      order_detail.order.customer.name
                    }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title
                      >${{ order_detail.order.pricing }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-list-item>
          </v-button>
        </template>
        <v-card :id="order_details.id">
          <v-card-title class="text-h5 orange--text">
            Order Details
          </v-card-title>

          <v-card-text>Order ID:{{ orders.id }} </v-card-text>
          <v-card-text>Quantity: {{ orders.quantity }} </v-card-text>
          <v-card-text>Products: {{ orders.product.name }} </v-card-text>
          <v-card-text>Shop Names: {{ orders.product.shop[0].name }} </v-card-text>
          <v-card-text>Category: {{ orders.product.category.name }} </v-card-text>
            <v-card-text
            >Order Date: {{ orders.order.order_date }}
          </v-card-text>
          <v-card-text
            >Delivery Date: {{ orders.order.deliver_date }}
          </v-card-text>
          <v-card-text>Total Price: ${{ orders.order.pricing }} </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Done </v-btn>
          </v-card-actions>
        </v-card>
  
  </v-dialog> 
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  props: ["id"],
  data: () => ({
    dialog: false,
    orders: {
      id: "",
      quantity: "",
      product: {
        id: "",
        name: "",
        description: "",
        price: "",
        category: {
          id: "",
          name: "",
        },
        shop: {
          id: "",
          name: "",
          owner: "",
        },
      },
      order: {
        id: "",
        order_date: "",
        pricing: "",
        deliver_date: "",
        customer: {
          id: "",
          name: "",
          username: "",
          password: "",
          email: "",
        },
      },
    },
    order_details: {
      id: "",
      quantity: "",
      product: {
        id: "",
        name: "",
        description: "",
        price: "",
        category: {
          id: "",
          name: "",
        },
        shop: {
          id: "",
          name: "",
          owner: "",
        },
      },
      order: {
        id: "",
        order_date: "",
        pricing: "",
        deliver_date: "",
        customer: {
          id: "",
          name: "",
          username: "",
          password: "",
          email: "",
        },
      },
    },
  }),
  created() {
    this.getOrderLists(), this.getOrderDetails()
  },
  methods: {
    getOrderLists() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/orderDetail/",
      })
        .then((response) => {
          this.order_details = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
    getOrderDetails() {
       console.log("herere"),
      axios({
       
        method: "get",
        url: `http://localhost:8000/api/orderDetail/2/`,
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
