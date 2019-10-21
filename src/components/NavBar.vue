<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="/"><img class="app_logo" src="../assets/logo.png"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <!-- Right aligned nav items -->
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item right><router-link to="/"><b>Home</b></router-link></b-nav-item>
            <b-nav-item right v-if="username"><router-link to="/new"><b><i class="far fa-edit"></i>New Editor</b></router-link></b-nav-item>
            <b-nav-item right v-if="!username"><router-link to="/signin"><b>Sign In</b></router-link></b-nav-item>
            <b-nav-item right v-if="!username"><router-link to="/signup"><b>Sign Up</b></router-link></b-nav-item>
            <b-nav-item right v-if="username"><router-link to="/settings"><b><i class="far fa-sun"></i>Settings</b></router-link></b-nav-item>
            <b-nav-item right v-if="username"><router-link :to="`/user/@${username}`"><b>
                <img class="user_img" v-if="user && user.image" :src="user.image">{{username}}
              </b></router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
/**
 * Nav bar of application.
 * Changed based on login
 */
export default {
    name: 'NavBar',
    computed: {
      username() {
        return this.$store.getters["username"];
      },
      user() {
        return this.$store.getters["user"];
      }
    }
}
</script>

<style>
a {
    color: #825b5b;
}
.app_logo {
    height: 40px;
}
.user_img {
  height: 30px;
  width: 30px;
  border-radius: 20px;
  margin-right: 3px;
}
</style>