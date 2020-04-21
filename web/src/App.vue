<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp">

    </v-navigation-drawer>

    <v-app-bar app color="blue darken-3" dark :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span>Onega</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: null
  }),
}
</script>
