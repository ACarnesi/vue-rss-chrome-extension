<template>
  <div class="feed-list">
    <nav-menu :navLinks="navLinks"/>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'FeedList',
  components: {
  },
  computed: {
    navLinks() {
      return {
        rightNav: [
          { to: "/settings", title: "Settings", icon: 'cogs'},
          { to: "/addEditFeed", title: "New Feed", icon: 'plus-circle'}
        ]
      }
    }
  },
  created() {
    
  }
}
</script>
