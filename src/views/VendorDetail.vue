<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-flex>
      <v-card class="ma-2 lighten-2">
        <v-form
          class="pl-16 pr-16 pt-8"
          justify="center"
          @submit.prevent="checkform()"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <!-- <h1>Update vendor</h1> -->
          <v-header class="orange--text  text-overline">Update vendor</v-header>

          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="vendor.name"
                label="Vendor Name"
                clearable
                :rules="fieldRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="vendor.number"
                label="Number"
                clearable
                required
                :rules="fieldRules"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="vendor.username"
                label="Username"
                clearable
                required
                :rules="fieldRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="vendor.email"
                label="Email"
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
    email: { required },
    number: { required },
    username: { required },
  },
  data() {
    return {
      valid: true,
      fieldRules: [(v) => !!v || "Field is required"],

      vendor: {
        name: "",
        number: "",
        username: "",
        email: "",
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
    this.get_vendor_details();
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
      this.get_vendor_details();
    },
    checkform() {
      this.$refs.form.validate();

      axios
        .patch(`http://localhost:8000/api/vendor/${this.id}/`, {
          name: this.vendor.name,
          number: this.vendor.number,
          email: this.vendor.email,
          username: this.vendor.username,
        })
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "Vendor" });
        })
        .catch((res) => console.log(res));
    },
    get_vendor_details() {
      axios({
        method: "get",
        url: `http://localhost:8000/api/vendor/${this.id}`,
      })
        .then((response) => {
          this.vendor = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
};
</script>
  