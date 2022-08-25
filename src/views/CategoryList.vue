<template>
  <div class="category d-inline-flex">
    <!-- <router-link to="/categoryproduct" style="text-decoration: none"> -->
      <v-row>
        <v-card
          v-for="item in category"
          :key="item.id"
          class="card pa-5 ma-8"
          width="500"
          dark
        >
           <router-link
              :to="{ name: 'CategoryProduct', params:{id:item.id} }"
              style="text-decoration: none"
            >
          <v-subheader><v-icon x-large>mdi-shape</v-icon></v-subheader>
          <v-subheader>{{ item.name }}</v-subheader>
          </router-link>
        </v-card>
      </v-row>
    <!-- </router-link> -->
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      category: {},
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
  },
};
</script>
<style scoped>
.card {
  background-color: rgba(0, 0, 0, 0.4);
  border: black solid 1px;

  transition: 0.5s;
}
.card:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: scale(1.02);
}
</style>
