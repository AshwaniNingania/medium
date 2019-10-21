<template>
    <div id="app">
        <NavBar/>
        <router-view/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
    name: 'app',
    components: {
        NavBar
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #141b22;
}
a {
    color: #141b22!important;
}

a:hover {
  color: darkslateblue!important;
  font-size: 105%;
}
</style>
