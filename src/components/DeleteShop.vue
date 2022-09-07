<template>
  <v-menu open-on-hover down offset-y v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
        <v-btn
          absolute
          color="grey darken-3 white--text"
          class="white--text"
          fab
          x-small
          right
          top
          v-bind="attrs"
          v-on="on"
        >
          <v-icon small>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

    <v-list class="pa-1">
      <v-list-item>
        <v-btn
          color="grey darken-4 white--text"

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
import shopDeailListApi from "@/api"
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
      axios.delete(shopDeailListApi.shopDetailApi(id)).then(() => {
        this.$emit("delete");
      });
    },
  },
};
</script>
