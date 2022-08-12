<template>
  <v-card class="ma-12 lighten-2">
    <form class="pa-12 white--text" 
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
        v-model="category"
        label="Categories"
        :required="!category"
        item-text="name"
        item-value="id"
        :error-messages="pushError($v.category)"
        @blur="$v.category.$touch()"
        @click="get_categories"
      >
      </v-select>
      <v-select
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
        @click="get_shoplist"
      >
      </v-select>

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
        submit
      </v-btn>
      <v-btn class="mt-4" @click="clear" color="white "> clear </v-btn>
    </form>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
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

  data: () => ({
    name: "",
    description: "",
    checkbox: false,
    categories: [],
    shops: [],
    numberValue: "",
  }),

  created() {
    this.get_categories();
    this.get_shoplist();
  },

  methods: {
    pushError(val) {
      const errors = [];
      if (!val.$dirty) return errors;
      !val.required && errors.push("This is required.");
      return errors;
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.description = "";
      this.categories = null;
      this.shops = null;
      this.price = "";
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
    checkform() {
      console.log(
        "------------------------------------------------------------------"
      );
      console.log(this.category);

      axios
        .post("http://127.0.0.1:8000/api/Product/", {
          name: this.name,
          description: this.description,
          shop: [4],
          category: 4,
          price: this.price,
        })
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "product" });
        })
        .catch((res) => console.log(res));
    },
  },
};
</script>
<style scoped>
</style>