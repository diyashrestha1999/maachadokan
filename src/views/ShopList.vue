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
        @click="productInShop(shop.id)"
      >
        <DeleteShopVue :id="shop.id" @delete="getShop" />
        <v-card-title class="text-h5 font rounded-lg text-overline">{{ shop.name }} </v-card-title>

        <v-card-subtitle class="text-caption">{{ shop.owner.name }} </v-card-subtitle>
        <!-- 
          <v-card-actions>
            <v-btn text> View Deatils </v-btn>
          </v-card-actions> -->
      </v-card>
    </v-row>
    <v-snackbar
       
      :timeout="2000"
      :value="isAdded"
      absolute
      bottom
      color="orange"
      right
    >
      New shop sucessfully <strong>Added</strong>.
    </v-snackbar>
  </v-app>
</template>
<script>
import axios from "axios";
import DeleteShopVue from "@/components/DeleteShop.vue";
import shopApi from "@/api"
export default {
  components: {
    DeleteShopVue,
  },

  data() {
    return {
      isAdded:false,
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

    productInShop(id){
      this.$router.push(`productsinshop/${id}`)
    },
 
    getShop() {
      axios({
        methods: "get",
        url: shopApi.shopListApi,
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
        .post(shopApi.shopListApi, {
          name: this.shopName,
          owner: this.ownerName,
        })
        .then((response) => {
          console.log(response);
          this.dialog = false;
          this.getShop(),
          this.isAdded=true
        
        })
        .catch((res) => console.log(res));
    },
    getOwner() {
      axios({
        methods: "get",
        url:shopApi.vendorListApi,
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
  transition: 0.2s;
}
.main:hover{
  transform: scale(1.03);
}
</style>
