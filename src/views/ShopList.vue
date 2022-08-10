<template>
  <div class="text-center">
    <v-menu open-on-hover top offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
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

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-btn color="orange darken-1" text @click="dialog = false">
            <v-icon>{{ item.title }}</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      { title: "mdi-pencil" },
      { title: "mdi-menu-down" },
      { title: "mdi-delete" },
    ],
  }),
};
</script>