<template>
  <v-col>
    <v-card
      class="ma-3 text-center"
      color="grey darken-4"
      dark
      width="99%"
      height="270"
    >
      <h1 class="text-overline">DASHBOARD</h1>
    </v-card>
    <v-row>
      <v-card class="ma-8 card" width="20%">
        <router-link to="/orderlist" style="text-decoration: none">
          <v-card-title>
            <v-icon large left> mdi-order-bool-ascending-variant </v-icon>
            <span class="text-h6 font-weight-light">ORDER</span>
          </v-card-title>
        </router-link>
      </v-card>

      <v-card class="ma-8 card" width="20%">
        <router-link to="/categorylist" style="text-decoration: none">
          <v-card-title>
            <v-icon large left> mdi-shape </v-icon>
            <span class="text-h6 font-weight-light">CATEGORY</span>
          </v-card-title>
        </router-link>
      </v-card>
      <v-card class="ma-8 card" color="grey darken-4" dark width="40%">
        <router-link to="/productlist" style="text-decoration: none">
          <v-card-title>
            <v-icon large left> mdi-purse </v-icon>
            <span class="text-h6 font-weight-light">PRODUCTS</span>
          </v-card-title>
        </router-link>
      </v-card>
    </v-row>
    <v-card class="ma-1 cardLast" max-width="100%" height="300">
      <router-link to="/shoplist" style="text-decoration: none">
        <v-card-title>
          <v-icon large left> mdi-shopping </v-icon>
          <span class="text-h6 font-weight-light">SHOP</span>
        </v-card-title>
      </router-link>
    </v-card>
  </v-col>
</template>
<style scooped>
  .card{
    transition: 0.1s;

  }
  .card:hover{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: scale(1.02);
  }
  .cardLast:hover{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: scale(1.01);
  }
</style>