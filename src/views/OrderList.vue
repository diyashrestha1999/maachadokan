<template>
  <v-card elevation="24" class="ma-4" max-width="96%" height="95%" title>
    <v-subheader>Orders List</v-subheader>
    <v-simple-table>
      <template>
        <thead>
          <tr>
            <th class="text-left orange--text">Id</th>
            <th class="text-left orange--text">Order Date</th>
            <th class="text-left orange--text">Deliver Date</th>
            <th class="text-left orange--text">Ordered By</th>
            <th class="text-left orange--text">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="font-weight-black tr"
            v-for="order_detail in order_details"
            :key="order_detail.id"
            @click="orderDetails(order_detail.id)"
          >
            <!-- <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td> -->

            <td>
              <v-icon small class="font-weight-black grey--text">{{
                order_detail.id
              }}</v-icon>
            </td>
            <td>{{ order_detail.order.order_date }}</td>
            <td>{{ order_detail.order.deliver_date }}</td>
            <td>{{ order_detail.order.customer.name }}</td>
            <td>${{ order_detail.order.pricing }}</td>
            <td>
              <v-icon @click.stop="deleteOrder(order_detail.id)" small class="delete"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data: () => ({
    dialog: false,
    // noRedirect:false,

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
    deleteOrder(id) {
      axios.delete(`http://localhost:8000/api/orderDetail/${id}/`).then(() => {
        this.getOrderLists();
        // this.noRedirect=true
      });
    },
    orderDetails(id) {
      this.$router.push(`orderDetail/${id}`);
    },
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
<style scoped>
.tr {
  background-color: #fff;
  color: grey;
}
.tr:hover {
  color: black;
}
.delete {
  translate: 0.1s;
  color: orange;
}
.delete:hover {
  transform: scale(1.5);
  color: red;
}
</style>
