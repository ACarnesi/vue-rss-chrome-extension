<template>
  <div class="settings">
    <nav-menu :navLinks="navLinks"/>
    <h1>This is the settings page.</h1>
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
        leftNav: [
          { to: "/", title: "Back", icon: 'backward'}
        ]
      }
    }
  }
}
</script>
