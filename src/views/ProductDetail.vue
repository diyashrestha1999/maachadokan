<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-flex>
      <v-card class="ma-2 lighten-2">
        <v-form
          class="pl-16 pr-16 pt-8"
          justify="center"
          @submit.prevent="checkform"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <!-- <h1>Update Product</h1> -->
          <v-header class="orange--text">Update Product</v-header>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="product.name"
                label="Product Name"
                clearable
                :rules="fieldRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="product.description"
                label="Description"
                clearable
                required
                :rules="fieldRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-select
                v-model="product.category"
                :items="categories"
                item-text="name"
                item-value="id"
                label="Category"
                required
                :rules="fieldRules"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-select
                v-model="product.shop"
                :items="shops"
                item-text="name"
                item-value="id"
                attach
                chips
                label="Shops"
                multiple
                required
                :rules="fieldRules"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="product.price"
                label="Price"
                clearable
                required
                :rules="fieldRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-btn
                class="mt-4 mr-4"
                type="submit"
                color="orange "
                id="register"
                dark
              >
                Update
              </v-btn>
              <v-btn class="mt-4" @click="reset" color="white "> Reset </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    shop: { required },
    category: { required },
    description: { required },
    price: { required },
  },
  data() {
    return {
      shops: [],
      categories: [],

      valid: true,
      fieldRules: [(v) => !!v || "Field is required"],

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
      pushError(val) {
        const errors = [];
        if (!val.$dirty) return errors;
        !val.required && errors.push("This is required.");
        return errors;
      },
      get_shoplist() {
        axios({
          method: "get",
          url: "http://localhost:8000/api/shop/",
        }).then((response) => {
          this.shops = response.data;
        });
      },
      dialog: false,
      id: this.$route.params.id,
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
    getShopIds(shop) {
      let shopIds = [];
      if (shop.length === 1 && typeof shop[0] !== "number") {
        shopIds = [shop[0].id];
      }

      if (shop.length > 1) {
        shop.forEach((sh) => {
          if (typeof sh !== "number") {
            shopIds.push(sh.id);
          }
        });
      }

      if (!shopIds.length) {
        shopIds = shop;
      }
      return shopIds;
    },
    reset() {
      this.$v.$reset();
      this.get_product_details();
    },
    checkform() {
      this.$refs.form.validate();

      axios
        .put(`http://localhost:8000/api/product/${this.id}/`, {
          name: this.product.name,
          description: this.product.description,
          shop: this.getShopIds(this.product.shop),
          category: this.product.category.id,
          price: this.product.price,
        })
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "product" });
        })
        .catch((res) => console.log(res));
    },
    get_product_details() {
      axios({
        method: "get",
        url: `http://localhost:8000/api/product/${this.id}`,
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
