<template>
  <v-menu open-on-hover down offset-y v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        absolute
        color="orange"
        class="white--text"
        fab
        x-small
        right
        top
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list class="pa-1">
      <v-list-item>
        <router-link :to="{name:'ProductDetail', params:{id:id}}" style="text-decoration: none">
          <v-btn
            class="orange lighten-2 white--text"
            x-small
            @click="dialog = false"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </v-list-item>

      <v-list-item>
        <v-btn
          color="orange lighten-2 white--text"
          x-small
          @click="deleteProduct(id)"
        >
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </v-list-item>

    </v-list>
  </v-menu>
</template>
<script>
import axios from "axios";
import productDetailListApi from "@/api"


export default {
 
  props: ["id"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deleteProduct(id) {
      console.log("deleted");
      axios.delete(productDetailListApi.productDetailApi(id)).then(() => {
        this.$emit("delete");
      });
    },
  },
};
</script>
