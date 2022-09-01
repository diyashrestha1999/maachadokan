<template>
    <v-menu open-on-hover down offset-y v-model="dialog" max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          absolute
          color="grey lighten-1"
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
            color="grey lighten-1 white--text"
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
            axios.delete(`http://localhost:8000/api/category/${id}/`).then(() => {
              this.$emit("delete");
            });
          },
        },
      };
      </script>
      