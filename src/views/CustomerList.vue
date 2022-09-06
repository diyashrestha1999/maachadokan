<template>
  <v-app>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          class="white--text ma-4"
          fab
          small
          right
          top
          v-bind="attrs"
          v-on="on"
        >
          <v-icon small color="white">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <form class="pa-12 white--text" @submit.prevent="addCustomer">
          <v-text-field
            outlined
            color="orange"
            v-model="customerName"
            label="Customer Name"
          ></v-text-field>

          <v-text-field
            outlined
            color="orange"
            v-model="customerUsername"
            label="Username"
          ></v-text-field>
          <v-text-field
            outlined
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            hint="At least 8 characters"
            v-model="customerPassword"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>
          <v-text-field
            outlined
            color="orange"
            v-model="customerEmail"
            label="Email"
          ></v-text-field>

          <v-btn
            class="mt-4 mr-4"
            type="submit"
            color="orange "
            id="register"
            value="Register"
            dark
          >
            ADD
          </v-btn>
        </form>
      </v-card>
    </v-dialog>
    <v-row>
      <v-card
        elevation="8"
        v-for="customer in customers"
        :key="customer.id"
        class="ma-8"
        max-width="200"
        height="250"
        tile
      >
        <DeleteCustomerVue :id="customer.id" @delete="getCustomerList" />
        <v-img height="30%" src="../assets/black-concrete-wall.jpg"></v-img>
        <v-col>
          <v-avatar size="60" style="position: absolute; top: 45px">
            <v-img src="../assets/profile2.jpg"></v-img>
          </v-avatar>
        </v-col>

        <v-list-item color="rgba(0, 0, 0, .4)">
          <v-list-item-content>
            <v-list-item-title class="title text-overline ">{{
              customer.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="text-caption">Customer</v-list-item-subtitle>

            <v-list-item-subtitle class="text-caption">{{ customer.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";

import DeleteCustomerVue from "@/components/DeleteCustomer.vue";

export default {
  components: {
    DeleteCustomerVue,
  },
  data() {
    return {
      show3: false,
      dialog: false,
      customers: [],
      customerName: "",
      customerUsername: "",
      customerPassword: "",
      customerEmail: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  created() {
    this.getCustomerList();
  },
  methods: {
    reset() {
      this.getCustomerList();
    },
    addCustomer() {
      axios
        .post("http://localhost:8000/api/customer/", {
          name: this.customerName,
          username: this.customerUsername,
          password: this.customerPassword,
          email: this.customerEmail,
        })
        .then((response) => {
          console.log(response);
          this.dialog = false;
          this.reset();
          // alert("sucessfull!!")
        })
        .catch((res) => console.log(res));
    },
    getCustomerList() {
      axios({
        methods: "get",
        url: "http://localhost:8000/api/customer/",
      })
        .then((response) => {
          this.customers = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
};
</script>
