<template>
  <div v-if="user">
      <div class="banner home-1" v-if="username">
          <img :src="user.image" class="user-img"/>
          <h3>{{username}}</h3>
          <b-button pill class="button right" variant="light" size="sm" v-if="user.username == loggedInUserName">
              <router-link to="/settings" class="green-text"><b><i class="far fa-sun"></i> Edit Profile Settings</b></router-link>
          </b-button>
          <b-button class="button right" variant="light" size="sm" v-else @click="followUser()"><b>
              <span v-if="user.following" class="red-text">
                 Unfollow {{username}} 
              </span>
              <span v-else class="green-text">
                  Follow {{username}}
              </span></b>
          </b-button>
      </div>
      <mdb-container class="home-1">
      <mdb-row>
        <mdb-col col="12">
          <b-tabs content-class="mt-3">
            <b-tab title="My Articles">
              <Articles :author="username"/>
            </b-tab>
            <b-tab title="Favorited Articles">
              <Articles :favorited="username"/>
            </b-tab>
          </b-tabs>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import Articles from './../components/Articles'
import {mdbContainer, mdbRow, mdbCol} from 'mdbvue';

/**
 * User Profile view
 */
export default {
    name: 'user-profile',
    data() {
        return {
            username: this.$route.params.username,
            user: null
        }
    },
    watch: {
        '$route.params.username': function (username) {
            if(username) {
                this.username = username;
                this.getUser();
            }
        }
    },
    created: function(){
        if (this.username) {
            this.getUser();
        }
    },
    computed: {
        loggedInUserName() {
            return this.$store.getters["username"];
        }
    },
    components: {
        Articles,
        mdbContainer,
        mdbRow,
        mdbCol
    },
    methods: {
        /**
         * Method to get user
         */
        getUser: function() {
            axios.get('/profiles/' + this.username).then((response) => {
                this.user = response.data.profile
            })
            .catch((e) => {
                console.error(e)
            })
        },

        /**
         * Method to follow or unfollow the user
         */
        followUser: function() {
            if(this.user.following) {
                axios.delete('/profiles/' + this.username + '/follow').then((response) => {
                    this.user = response.data.profile
                })
                .catch((e) => {
                    console.error(e)
                })
            } else {
                axios.post('/profiles/' + this.username + '/follow').then((response) => {
                    this.user = response.data.profile
                })
                .catch((e) => {
                    console.error(e);
                    if(e.response.status == 401) {
                        this.$router.push('/signin')
                    }
                })
            }
        }
    }
}
</script>

<style>
    .banner {
      background: #c9cfc9;
    }
    .home-1 {
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .user-img {
        width: 8%;
        border-radius: 50%;
    }
    .right {
        float: right;
    }
</style>