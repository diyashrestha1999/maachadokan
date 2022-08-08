<template>
  <v-app>
    <SideNav/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import SideNav from './components/SideNav.vue'
export default {
  name: 'App',
components:{
SideNav
},
  data: () => ({
    //
  }),
};
</script>
