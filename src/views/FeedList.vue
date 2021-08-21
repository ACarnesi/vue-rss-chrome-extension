<template>
  <div class="feed-list">
    <nav-menu :navLinks="navLinks"/>
    <img alt="Vue logo" src="../assets/logo.png">
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
        rightNav: [
          { to: "/settings", title: "Settings", icon: 'cogs'},
          { to: "/newFeed", title: "New Feed", icon: 'plus-circle'}
        ]
      }
    }
  },
  created() {
    
  }
}
</script>
