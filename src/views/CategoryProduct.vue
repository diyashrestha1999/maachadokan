<template>
  <v-app>
    <v-container class="grey lighten-5">
   
      <router-link to="/addproduct" style="text-decoration: none">
        <v-btn
          color="orange"
          class="white--text my-4"
          fab
          small
          right
          top
    
        >
          <v-icon small color="white">mdi-plus</v-icon>
        </v-btn>
      </router-link>

      <!-- <h2 >{{products.category.name}}</h2> -->
      <v-row>
        <v-col v-for="product in products" :key="product.id" md="2">
          <v-card
            class="font rounded-lg"
            elevation="5"
            width="150"
            height="200"
          >
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" max-width="600">
                <v-img
                  :aspect-ratio="16 / 9"
                  src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="
                        d-flex
                        transition-fast-in-fast-out
                        orange
                        v-card--reveal
                        text-h6
                        white--text
                        text--darken-10
                      "
                      style="height: 100%"
                    >
                      ${{ product.price }}
                    </div>
                  </v-expand-transition>
                </v-img>
                <v-card-text class="pt-6" style="position: absolute">
                  <ProductDialogVue :id="product.id" @delete="get_products"/>
                  <h3
                    class="
                      font-weight-heavy
                      orange--text
                      mb-2
                      text-center text-overline
                    "
                  >
                    {{ product.name }}
                  </h3>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import ProductDialogVue from "@/components/ProductDialog.vue";
import axios from "axios";

export default {
      components: {
    ProductDialogVue,
  },


  data() {
    return {
        id: this.$route.params.id,
        products: [],

     
    };
  },

  created() {
    this.get_product_details();
  },
  methods: {
    get_product_details() {
      axios({
        method: "get",
        url: `http://localhost:8000/api/Productincategory/?category=${this.id}`,
      })
        .then((response) => {
          this.products = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
};
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
