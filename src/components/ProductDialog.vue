<template>
  <v-menu open-on-hover down offset-y v-model="dialog"  max-width="290">
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

        <v-list v-for="(item, index) in items" :key="index" class="pa-1">
          <v-btn   class=" orange lighten-2 white--text" x-small  @click="dialog = false">
            <v-icon small>{{ item.title }}</v-icon>
          </v-btn>
        </v-list>
   
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
       items: [
      { title: "mdi-pencil" },
      { title: "mdi-menu-down" },
      { title: "mdi-delete" },
    ],
    };
  },
};
</script>

