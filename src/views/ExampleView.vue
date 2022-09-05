<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Order Date</th>
          <th class="text-left">Deliver Date</th>
          <th class="text-left">Ordered By</th>
          <th class="text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order_detail in order_details" :key="order_detail.id">
          <!-- <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td> -->

          <td>
            <v-icon>mdi-numeric-{{ order_detail.id }}-circle</v-icon>
          </td>
          <td>{{ order_detail.order.order_date }}</td>
          <td>{{ order_detail.order.deliver_date}}</td>
          <td>{{order_detail.order.customer.name}}</td>
          <td>${{ order_detail.order.pricing }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
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
