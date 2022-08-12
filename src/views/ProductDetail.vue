<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-flex>
      <v-card class="ma-16 lighten-2">
        <v-form class="pa-10" justify="center" @submit.prevent="checkform">
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="product.name"
                label="Product"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="product.description"
                label="Description"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-select
                v-model="product.category.name"
                :items="categories"
                item-text="name"
                item-value="id"
                label="Category"
                clearable
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-select
                v-model="shop"
                :items="shops"
                item-text="name"
                item-value="id"
                label="Shop"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="product.price"
                label="Price"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      shops: [],
      categories: [],
      product: {
        name: "",
        description: "",
        price: "",
        shop: [],

        category: "",
      },
      get_categories() {
        axios({
          method: "get",
          url: "http://localhost:8000/api/category/",
        })
          .then((response) => {
            this.categories = response.data;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      get_shoplist() {
        axios({
          method: "get",
          url: "http://localhost:8000/api/shop/",
        }).then((response) => {
          this.shops = response.data;
          // this.shops.forEach((ele) => this.shop.push([ele.name,ele.id]));
        });
      },
      dialog: false,
      id: this.$route.params.id,
      //   message1:products.name,
      //   message2: "Hey!",
      //   message3: "Hey!",
      //   message4: "Hey!",
      //   message5: "Hey!",
      // };
    };
  },

  created() {
    this.get_categories();
    this.get_shoplist();
  },
  mounted() {
    this.get_product_details();
  },
  methods: {
    get_product_details() {
      axios({
        method: "get",
        url: `http://localhost:8000/api/Product/${this.id}`,
      })
        .then((response) => {
          this.product = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
};
</script>
