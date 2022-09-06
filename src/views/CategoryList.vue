<template>
  <v-app>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          class="white--text ma-4"
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
      <v-card>
        <form class="pa-12 white--text" @submit.prevent="addCategory">
          <v-text-field
            outlined
            color="orange"
            v-model="categoryName"
            label="Category Name"
          ></v-text-field>

          <v-btn
            class="mt-4 mr-4"
            type="submit"
            color="orange "
            id="register"
            value="Register"
            dark
          >
            ADD
          </v-btn>
        </form>
      </v-card>
    </v-dialog >
    <div class="category d-inline-flex">
      <v-row>
        <!-- <v-dialog v-model="dialog1" open-on-hover down offset-y > -->
          <!-- <template v-slot:activator="{ on, attrs }"> -->
            <v-card
              v-for="item in category"
              :key="item.id"
              class="card pa-5 ma-8"
              width="500"
              dark

            >
            <DeleteCategoryVue  :id="item.id" @delete="getCategory"/>
              <router-link
                :to="{ name: 'CategoryProduct', params: { id: item.id } }"
                style="text-decoration: none"
              >
                <v-subheader><v-icon x-large>mdi-shape</v-icon></v-subheader>
                <v-subheader class="text-overline">{{ item.name }}</v-subheader>
              </router-link>
            </v-card>
          <!-- </template> -->
          <!-- <v-icon small>mdi-delete</v-icon> -->
        <!-- </v-dialog> -->
      </v-row>
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
import DeleteCategoryVue from "@/components/DeleteCategory.vue";

export default {
  components:{
    DeleteCategoryVue
  },
  data() {
    return {
      dialog: false,
      dialog1:false,
      category: {},
      categoryName: "",
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/category/",
      })
        .then((response) => {
          this.category = response.data;
          
        })
        .catch((response) => {
          console.log(response);
        });
    },
    addCategory() {
      axios
        .post("http://127.0.0.1:8000/api/category/", {
          name: this.categoryName,
        })
        .then((response) => {
          console.log(response);
          this.dialog = false;
          this.getCategory()
          // alert("sucessfull!!")
        })
        .catch((res) => console.log(res));
    },
  },
};
</script>
<style scoped>
.card {
  background-color: rgba(0, 0, 0, 0.4);
  border: white solid 1px;

  transition: 0.1s;
}
.card:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: scale(1.02);

  text-decoration-color: orange;
}
</style>
