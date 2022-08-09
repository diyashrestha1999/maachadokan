<template>
  <v-app>
    <router-link to="/addproduct"  style="text-decoration: none">
      <v-btn
        color="orange"
        class="white--text ma-6 "
        fab
        small
        right
        top
        v-model="add"
      >
        <v-icon small color="white">mdi-plus</v-icon>
      </v-btn>
    </router-link>

    <v-sheet class="font rounded-lg" width=100% height="96% ">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="product in products" :key="product.name">
            <v-card
              class="font rounded-lg"
              elevation="5"
              width="150"
              height="200"
            >
              <v-hover v-slot="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
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
                          darken-6
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
                    <v-btn
                      absolute
                      color="orange"
                      class="white--text"
                      fab
                      x-small
                      right
                      top
                    >
                      <v-icon small>mdi-dots-vertical</v-icon>
                    </v-btn>

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
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.get_products();
  },
  methods: {
    addProduct() {},
    get_products() {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/Product/",
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
