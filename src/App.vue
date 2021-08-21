<template>
  <router-view/>
</template>

<style>
body {
  background-color: #111111;
  margin: 8px 0;
}

/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #111; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #555; 
  border-radius: 200px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #888; 
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #6894c0;
  min-width: 320px;
  max-width: 320px;
  max-height: 480px;
  overflow-y: scroll;
  overflow-x: hidden;
}

#nav {
  padding: 5px;
}

#nav a {
  font-weight: bold;
  color: #6894c0;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>

export default {
  components: {
  },
  created(){
    this.$router.push('popup');
  }
}
</script>