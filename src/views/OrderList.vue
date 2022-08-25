<template>
  <v-card class="ma-4" max-width="96%" height="95%" title>
    <v-list dense>
      <v-subheader>Orders List</v-subheader>

      <v-list-item class="orange--text pl-10">
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

      <!-- <v-dialog v-model="dialog" width="500" > -->
      <!-- <template v-slot:activator="{ on, attrs }"> -->

      <v-list-item v-for="order_detail in order_details" :key="order_detail.id">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card
            width="100%"
            height="35"
            :elevation="hover ? 10 : 0"
            :class="{ 'on-hover': hover }"
           
          >
            <router-link
              :to="{ name: 'OrderDetail', params: { id: order_detail.id } }"
              style="text-decoration: none"
            >
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
            </router-link>
          </v-card>
        </v-hover>
      </v-list-item>

      <!-- </template> -->

      <!-- </v-dialog>  -->
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  props: ["id"],
  data: () => ({
    dialog: false,

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
    this.getOrderLists();
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
  },
};
</script>
