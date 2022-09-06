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
      <v-card   class="font rounded-lg">
        <form class="pa-12 white--text " @submit.prevent="addVendor">
          <v-text-field
          
            outlined
            color="orange"
            v-model="venodrName"
            label="Vendor Name"
          ></v-text-field>
          <v-text-field
            outlined
            color="orange"
            v-model="vendorNumber"
            label="Number"
          ></v-text-field>
          <v-text-field
            outlined
            color="orange"
            v-model="vendorUsername"
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
            v-model="vendorPassword"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>
          <v-text-field
            outlined
            color="orange"
            v-model="vendorEmail"
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
        v-for="vendor in vendors"
        :key="vendor.id"
        class="ma-8"
        max-width="200"
        height="250"
        tile
      >
        <deleteButtonVue :id="vendor.id" @delete="getVendorList" />
        <v-img height="30%" src="../assets/black-concrete-wall.jpg"></v-img>
        <v-col>
          <v-avatar size="60" style="position: absolute; top: 45px">
            <v-img src="../assets/profile2.jpg"></v-img>
          </v-avatar>
        </v-col>

        <v-list-item color="rgba(0, 0, 0, .4)">
          <v-list-item-content>
            <v-list-item-title class="title text-overline">{{
              vendor.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="text-caption">Trader</v-list-item-subtitle>
            <v-list-item-subtitle class="text-overline">{{ vendor.number }}</v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">{{ vendor.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";
import deleteButtonVue from "@/components/deleteButton.vue";
// import ProductDialogVue from "@/components/ProductDialog.vue";

export default {
  components: {
    deleteButtonVue,
  },
  data() {
    return {
      show3: false,
      dialog: false,
      vendors: [],
      venodrName: "",
      vendorNumber: "",
      vendorUsername: "",
      vendorPassword: "",
      vendorEmail: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  created() {
    this.getVendorList();
  },
  methods: {
    reset() {
      this.getVendorList();
    },
    addVendor() {
      axios
        .post("http://localhost:8000/api/vendor/", {
          name: this.venodrName,
          number: this.vendorNumber,
          username: this.vendorUsername,
          password: this.vendorPassword,
          email: this.vendorEmail,
        })
        .then((response) => {
          console.log(response);
          this.dialog = false;
          this.reset();
          // alert("sucessfull!!")
        })
        .catch((res) => console.log(res));
    },
    getVendorList() {
      axios({
        methods: "get",
        url: "http://localhost:8000/api/vendor/",
      })
        .then((response) => {
          this.vendors = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
};
</script>
