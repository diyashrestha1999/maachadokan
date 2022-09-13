<template>
  <v-app>
    <v-container class="grey lighten-5">
      <h3 class="font-weight-heavy text-overline grey--text">Product List</h3>

      <v-row>
        <router-link to="/addproduct" style="text-decoration: none">
          <v-btn color="orange" class="white--text ma-4" fab small right top>
            <v-icon small color="white">mdi-plus</v-icon>
          </v-btn>
        </router-link>

        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchQuery"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          out-line
          color="orange"
          class="shrink ma-4"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-col v-for="product in resultQuery" :key="product.id" md="2">
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
                      class="d-flex transition-fast-in-fast-out orange v-card--reveal text-h6 Mimosa--text text--darken-4"
                      style="height: 100%"
                    >
                      ${{ product.price }}
                    </div>
                  </v-expand-transition>
                </v-img>
                <v-card-text class="pt-6" style="position: absolute">
                  <ProductDialogVue :id="product.id" @delete="get_products" />
                  <h3
                    class="font-weight-heavy orange--text mb-2 text-center text-overline"
                  >
                    {{ product.name }}
                  </h3>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar
        :timeout="2000"
        :value="isSucess"
        absolute
        bottom
        color="orange"
        right
      >
        Product sucessfully <strong>Updated</strong>.
      </v-snackbar>
      <v-snackbar
        :timeout="2000"
        :value="isAdded"
        absolute
        bottom
        color="orange"
        right
      >
       New Product sucessfully <strong>Added</strong>.
      </v-snackbar>
    </v-container>
  </v-app>
</template>
<script>
import ProductDialogVue from "@/components/ProductDialog.vue";
import productApi from "@/api";
import axios from "axios";
export default {
  components: {
    ProductDialogVue,
  },
  props: ["isSucess","isAdded"],

  data() {
    return {
      products: [],
      dialog: false,
      searchQuery: null,
      snackbar: false,
      timeout: 2000,
    };
  },
  mounted() {
    this.get_products();
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        console.log("im hereeeeeeeeeeeeeeee");
        return this.products.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.products;
      }
    },
  },
  methods: {
    addProduct() {},
    get_products() {
      axios({
        method: "get",
        url: productApi.productListApi,
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
