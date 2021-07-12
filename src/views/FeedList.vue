<template>
  <div class="feed-list">
    <img alt="Vue logo" src="../assets/logo.png">
    <NavMenu msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'FeedList',
  components: {
    NavMenu
  }
}
</script>
