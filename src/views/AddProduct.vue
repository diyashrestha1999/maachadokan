<template>
  <v-card class="ma-12">
    <form class="pa-12">
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        label="Product Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="description"
        :error-messages="descriptionErrors"
        label="Description"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-select
        v-model="categoryList"
        :items="categorylist"
        :error-messages="categorylistErrors"
        label="Category"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>
      <v-select
        v-model="shoplist"
        :items="shoplist"
        :error-messages="shoplistErrors"
        label="Shop"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>

      <v-text-field
        v-model="numberValue"
        :error-messages="nameErrors"
        hide-details
        single-line
        type="number"
        label="Price"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>

      <v-btn class="mt-4 mr-4" @click="submit"> submit </v-btn>
      <v-btn class="mt-4" @click="clear"> clear </v-btn>
    </form>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    name: "",
    description: "",
    categorylist: [],
    shoplist: [],
    checkbox: false,
    categories: [],
    shops:[]
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
   
    // categorylistErrors() {
    //   const errors = [];
    //   if (!this.$v.select.$dirty) return errors;
    //   !this.$v.select.required && errors.push("Item is required");
    //   return errors;
    // },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  created() {
    this.get_categories();
    this.get_shoplist();
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.categorylist = null;
      this.checkbox = false;
    },
    get_categories() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/category/",
      })
        .then((response) => {
          this.categories = response.data;
          this.categories.forEach((ele) => this.categorylist.push(ele.name));
          console.log(this.categorylist);
        })
        .catch((response) => {
          console.log(response);
        });
    },
    get_shoplist(){
        axios({
            methos:"get",
            url:"http://localhost:8000/api/shop/",
        })
        .then((response)=>{
            this.shops=response.data;
            this.shops.forEach((ele)=>this.shoplist.push(ele.name));
            console.log(this.shoplist);

        })
    }
  },
};
</script>