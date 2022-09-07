<template>
  <v-card class="ma-4" max-width="96%" height="95%"  >
    <v-card-title class="text-h5 orange--text font-weight-black title text-overline" > Order Details </v-card-title>

    <v-card-text class="font-weight-black title text-caption">Order ID: {{ orders.id }} </v-card-text>
    <v-card-text class="font-weight-black title text-caption">Quantity: {{ orders.quantity }} </v-card-text>
    <v-card-text class="font-weight-black title text-caption">Products: {{ orders.product.name }} </v-card-text>
    <v-card-text class="font-weight-black title text-caption">Shop Names: {{ orders.product.shop[0].name }} </v-card-text>
    <v-card-text class="font-weight-black title text-caption">Category: {{ orders.product.category.name }} </v-card-text>
    <v-card-text class="font-weight-black title text-caption">Order Date: {{ orders.order.order_date }} </v-card-text>
    <v-card-text class="font-weight-black title text-caption">Delivery Date: {{ orders.order.deliver_date }} </v-card-text>
    <v-card-text class="font-weight-black title text-caption">Total Price: ${{ orders.order.pricing }} </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <router-link :to="{name:'order'}" style="text-decoration: none"  >
      <v-btn color="orange font-weight-black white--text title text-overline"  > Done </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";
import orderdetalListApi from "@/api"
export default {
  data() {
    return {
      id: this.$route.params.id,
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
    };
  },

  created() {
    this.getOrderDetails();
  },
  methods: {
    getOrderDetails() {
      console.log("herere"),
        axios({
          method: "get",
          url: orderdetalListApi.orderDetailApi(this.id),
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
