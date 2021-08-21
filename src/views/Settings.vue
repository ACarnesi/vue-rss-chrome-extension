<template>
  <div class="settings">
    <nav-menu :navLinks="navLinks"/>
    <h1>This is the settings page.</h1>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue';

export default {
  name: 'FeedList',
  components: {
    NavMenu
  },
  computed: {
    navLinks() {
      return {
        leftNav: [
          { to: "/popup", title: "Back", icon: 'backward'}
        ]
      }
    }
  }
}
</script>
