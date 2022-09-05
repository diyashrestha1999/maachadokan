<template>
  <v-col>
    <v-card
      class="ma-3 "
      color="grey darken-4"
      dark
      width="99%"
      height="270"

    >
    <v-card-text>
      <h2 class="text-md-center dasboard ma-16 white--text">DASHBOARD</h2>
    </v-card-text>
    </v-card>
    <v-row>
      <v-card class="ma-8 card" width="20%">
        <router-link to="/orderlist" style="text-decoration: none">
          <v-card-title>
            <v-icon large left> mdi-order-bool-ascending-variant </v-icon>
            <span class="text-h6 font-weight-light grey--text ">ORDER</span>
          </v-card-title>
        </router-link>
      </v-card>

      <v-card class="ma-8 card" width="20%">
        <router-link to="/categorylist" style="text-decoration: none">
          <v-card-title>
            <v-icon large left> mdi-shape </v-icon>
            <span class="text-h6 font-weight-light grey--text">CATEGORY</span>
          </v-card-title>
        </router-link>
      </v-card>
      <v-card class="ma-8 card" color="grey darken-4" dark width="40%">
        <router-link to="/productlist" style="text-decoration: none">
          <v-card-title>
            <v-icon large left> mdi-purse </v-icon>
            <span class="text-h6 font-weight-light white--text">PRODUCTS</span>
          </v-card-title>
        </router-link>
      </v-card>
    </v-row>
    <v-card class="ma-1 cardLast" max-width="100%" height="240">
      <router-link to="/shoplist" style="text-decoration: none">
        <v-card-title>
          <v-icon large left> mdi-shopping </v-icon>
          <span class="text-h6 font-weight-light grey--text">SHOP</span>
        </v-card-title>
        <v-row>
      <v-card
        v-for="shop in shops"
        :key="shop.id"
        class="ma-8 main "
        color="#385F73"
        dark
        width="300"
        height="150"
      >
    
        <v-card-title class="text-h5 font rounded-lg">{{ shop.name }} </v-card-title>

        <v-card-subtitle>{{ shop.owner.name }} </v-card-subtitle>
        <!-- 
          <v-card-actions>
            <v-btn text> View Deatils </v-btn>
          </v-card-actions> -->
      </v-card>overline
    </v-row>
      </router-link>
    </v-card>
  </v-col>
</template>
<script>
  import axios from "axios";

  export default {

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
  .card{
    transition: 0.1s;

  }
  .cardLast{
    overflow: hidden;
  }
  .card:hover{
    /* box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px; */
  transform: scale(1.03);
  }
  .cardLast:hover{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: scale(1.01);
  }
  .dasboard{
    font-size: 30px;
    letter-spacing: 30px;
  
    
  }
</style>