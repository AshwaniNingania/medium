<template>
    <div v-if="user">
        <mdb-media>
            <mdb-media-image circle :src="user.image" class="d-flex mr-3 img" />
            <mdb-media-body>
                <div>
                    <div class="user">
                        <router-link class="green-text" :to="`/user/@${user.username}`">{{user.username}}</router-link>
                        <div class="read-more" v-if="user.createdAt">{{user.createdAt | formatDate}}</div>
                        <button type="button" class="button btn-outline-light btn-rounded ml-2" v-on:click="deleteArticle()" v-if="user.username == loggedInUserName">
                            <mdb-icon size="1x" class="red-text p-1" icon="trash-alt" />
                            <span class="red-text"> Delete Article </span>
                        </button>
                        <b-button pill class="button" variant="light" size="sm" v-else @click="followUser()"><b>
                            <span v-if="user.following" class="red-text">
                                Unfollow {{user.username}} 
                            </span>
                            <span v-else class="green-text">
                                Follow {{user.username}}
                            </span></b>
                        </b-button>
                    </div>
                </div>
            </mdb-media-body>
        </mdb-media>
    </div>
</template>

<script>
import moment from 'moment';
import { mdbMedia, mdbMediaBody, mdbMediaImage, mdbIcon } from 'mdbvue';

/**
 * User Component: Display in article detail
 */
export default {
    name: 'user',
    props: {
        user: null
    },
    computed: {
        loggedInUserName() {
            return this.$store.getters["username"];
        }
    },
    components: {
        mdbMedia,
        mdbMediaBody,
        mdbMediaImage,
        mdbIcon
    },
    filters: {
        formatDate: function (value) {
            if (!value) return ''
            return moment(String(value)).format('DD MMM YYYY hh:mm');
        }
    },
    methods: {
        /**
         * Delete an article for the user
         */
        deleteArticle: function() {
            this.$emit('deleteArticleId');
        },

        /**
         * Method to follow the user
         */
        followUser: function() {
            if (this.user.following) {
                axios.delete('/profiles/' + this.user.username + '/follow').then((response) => {
                        this.user = response.data.profile
                    })
                    .catch((e) => {
                        console.error(e);
                        if(e.response.status == 401) {
                            this.$router.push('/signin')
                        }
                    })
            } else {
                axios.post('/profiles/' + this.user.username + '/follow').then((response) => {
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
.img {
    display: inline-block;
    vertical-align: middle;
    height: 70px;
    width: 70px;
    border-radius: 20px;
}

.card {
    /* width: 70%; */
    margin: 5px;
    text-align: left;
}

.read-more {
    font-size: .8rem;
    font-weight: 200;
    color: #bbb;
}
</style>