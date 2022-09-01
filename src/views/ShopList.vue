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
        <form class="pa-12 white--text" @submit.prevent="addShop">
          <v-text-field
            outlined
            color="orange"
            v-model="shopName"
            label="Shop Name"
          ></v-text-field>
          <v-select
            outlined
            color="orange"
            :items="owners"
            v-model="ownerName"
            label="Owner"
            item-text="name"
            item-value="id"
          >
          </v-select>
         
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
        v-for="shop in shops"
        :key="shop.id"
        class="ma-7 main "
        color="#385F73"
        dark
        width="500"
        height="150"
      >
        <DeleteShopVue :id="shop.id" @delete="getShop" />
        <v-card-title class="text-h5 font rounded-lg">{{ shop.name }} </v-card-title>

        <v-card-subtitle>{{ shop.owner.name }} </v-card-subtitle>
        <!-- 
          <v-card-actions>
            <v-btn text> View Deatils </v-btn>
          </v-card-actions> -->
      </v-card>
    </v-row>
  </v-app>
</template>
<script>
import axios from "axios";
import DeleteShopVue from "@/components/DeleteShop.vue";
export default {
  components: {
    DeleteShopVue,
  },

  data() {
    return {
      dialog: false,
      shops: [],
      shopName: "",
      ownerName: "",
      owners: [],
    };
  },
  created() {
    this.getShop(),
    this.getOwner()
  },
  methods: {
 
    getShop() {
      axios({
        methods: "get",
        url: "http://localhost:8000/api/shop/",
      })
        .then((response) => {
          this.shops = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },

    addShop() {
      axios
        .post("http://localhost:8000/api/shop/", {
          name: this.shopName,
          owner: this.ownerName,
        })
        .then((response) => {
          console.log(response);
          this.dialog = false;
          this.getShop()
        
        })
        .catch((res) => console.log(res));
    },
    getOwner() {
      axios({
        methods: "get",
        url: "http://localhost:8000/api/vendor/",
      }).then((response) => {
        this.owners = response.data;

      });
    },
  },
};
</script>
<style scooped>
.main {
  background: url("../assets/black-concrete-wall.jpg");
  background-size: cover;
}
</style>
