<template>
  <div class="editor">

    <b-form @submit="onSubmit" v-if="show && user && user.email">
        <b-form-input id="url" v-model="user.image" size="lg" placeholder="URL of profile picture"></b-form-input>
        <br>
        <b-form-input id="username" v-model="user.username" placeholder="username"></b-form-input>
        <br>
        <b-form-textarea id="bio" v-model="user.bio" size="lg" placeholder="short bio about you"></b-form-textarea>
        <br>
        <b-form-input id="email" v-model="user.email" required placeholder="email"></b-form-input>
        <br>
        <b-form-input id="password" v-model="user.password" placeholder="password"></b-form-input>
        <br>
        <b-button pill type="submit" class="button right" variant="success">Update Settings</b-button>
        <br>
    </b-form>   

    <br><hr>
    <b-button pill type="button" @click="signout()" class="button left" variant="danger" v-if="show && user && user.email">Or click here logout</b-button>
  
  </div>
</template>

<script>
/**
 * Update Logged in user profile
 */
export default {
  name: "settings",
  data() {
      return {
        show: true
      }
    },
    computed: {
      user() {
        return this.$store.getters["user"];
      }
    },
    methods: {
      /**
       * Method to update profile
       */
      onSubmit(evt) {
        evt.preventDefault();
        axios.put('/user', {
            user: {
                image: this.user.image,
                email: this.user.email,
                password: this.user.password,
                username: this.user.username,
                bio: this.user.bio
            }
        }).then((response) => {
          this.$store.commit('setUser', response.data.user);
          this.$router.push('/');
        })
        .catch((e) => {
            console.error(e);
        });
      },

      /**
       * Method to logout the user
       */
      signout() {
        this.clearToken();
        this.$store.commit('setUser', null);
        this.$router.push('/');
      },

      /**
       * Clear the token from axiom apis
       */
      clearToken() {
        delete axios.defaults.headers.common['Authorization'];
      }
    }
};
</script>

<style scoped>
.editor {
    text-align: center;
    padding: 5% 25% 0 25%;
}

.button {
    margin: 1%
}

.right {
    float: right;
}

.left {
  float: left;
}
</style>