<template>
  <div id="nav">
    <div id="center-nav">
      <router-link to="/">Feeds</router-link> |
      <router-link to="/settings">Settings</router-link>
    </div>
    <div id="left-nav">
      <router-link to="/"><font-awesome-icon icon="user-secret" /></router-link> |
      <router-link to="/settings">Settings</router-link>
    </div>
    <div id="right-nav">
      <router-link to="/">Feeds</router-link> |
      <router-link to="/settings">Settings</router-link>
    </div>
  </div>
</template>
  
<style>
  #nav {
    display: flex;
    justify-content: space-between;
  }
</style>

<script>
export default {
  name: 'NavMenu',
  props: {
    msg: String
    
  },
}
</script>
