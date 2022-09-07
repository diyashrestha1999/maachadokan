<template>
  <v-app>
    <v-container class="grey lighten-5">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="orange"
            class="white--text my-4"
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
        <v-card class="lighten-2">
          <form class="pa-12 white--text" @submit.prevent="checkform">
            <v-header class="orange--text text-overline"
              >Add product in ({{ shopDetail.name }}) shop</v-header
            >
            <v-text-field
              outlined
              color="orange"
              v-model="name"
              :error-messages="pushError($v.name)"
              label="Product Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
              outlined
              color="orange"
              v-model="description"
              label="Description"
              required
              :error-messages="pushError($v.description)"
              @blur="$v.description.$touch()"
            ></v-text-field>
            <v-select
              outlined
              color="orange"
              :items="categories"
              v-model="categories"
              label="categories"
              :required="!category"
              item-text="name"
              item-value="id"
              :error-messages="pushError($v.category)"
              @blur="$v.category.$touch()"
            >
            </v-select>
            <!-- <v-select
              outlined
              color="orange"
              v-model="shop"
              :items="shops"
              label="Shop"
              item-text="name"
              item-value="id"
              required
              :error-messages="pushError($v.shop)"
              @blur="$v.shop.$touch()"
              
            >
            </v-select> -->

            <v-text-field
              outlined
              color="orange"
              v-model="price"
              single-line
              :error-messages="pushError($v.price)"
              label="Price"
              type="number"
              min="0"
              step="1"
              required
              @blur="$v.price.$touch()"
            ></v-text-field>

            <v-btn
              class="mt-4 mr-4"
              type="submit"
              color="orange "
              id="register"
              value="Register"
              dark
            >
              Submit
            </v-btn>
            <v-btn class="mt-4" @click="clear" color="white "> clear </v-btn>
          </form>
        </v-card>
      </v-dialog>

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
                      class="d-flex transition-fast-in-fast-out orange v-card--reveal text-h6 white--text text--darken-10"
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
    </v-container>
  </v-app>
</template>
<script>
import ProductDialogVue from "@/components/ProductDialog.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Api from "@/api";
import axios from "axios";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    shop: { required },
    category: { required },
    description: { required },
    price: { required },
  },
  components: {
    ProductDialogVue,
  },

  data() {
    return {
      id: this.$route.params.id,
      products: [],
      name: "",
      description: "",
      checkbox: false,
      categories: [],
      shops: [],
      numberValue: "",
      price: "",
      shopDetail: [],
    };
  },

  created() {
    this.get_product_details();
    this.get_categories();
    this.get_shoplist();
    this.get_shop_detail();
  },

  methods: {
    get_shop_detail() {
      axios({
        method: "get",
        url: Api.shopDetailApi(this.id),
      })
        .then((response) => {
          this.shopDetail = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
    get_categories() {
      axios({
        method: "get",
        url: Api.categoryListApi,
      })
        .then((response) => {
          this.categories = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.description = "";
      this.categories = null;
      this.shops = null;
      this.price = "";
    },
    pushError(val) {
      const errors = [];
      if (!val.$dirty) return errors;
      !val.required && errors.push("This is required.");
      return errors;
    },
    get_product_details() {
      axios({
        method: "get",
        url: Api.productInShopApi(this.id),
      })
        .then((response) => {
          this.products = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
    get_shoplist() {
      axios({
        method: "get",
        url: Api.shopListApi,
      }).then((response) => {
        this.shops = response.data;
        // this.shops.forEach((ele) => this.shop.push([ele.name,ele.id]));
      });
    },
    checkform() {
      console.log(
        "------------------------------------------------------------------"
      );
      console.log(this.category);
      axios
        .post(Api.productListApi, {
          name: this.name,
          description: this.description,
          shop: [this.shopDetail.id],
          category: this.category,
          price: this.price,
        })
        .then((response) => {
          console.log(response);
          // this.$router.push(`/categoryproduct/${this.id}`);
          this.get_product_details();
          this.dialog = false;
          this.clear();
        })
        .catch((res) => console.log(res));
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
