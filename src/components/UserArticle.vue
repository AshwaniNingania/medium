<template>
    <mdb-card border="light" class="mb-3 card" v-if="myArticle">
        <mdb-card-header>
            <mdb-media>
                <mdb-media-image circle :src="myArticle.author.image" class="d-flex mr-3 img" />
                <mdb-media-body>
                    <div>
                        <div class="user">
                            <h6 class="mt-0 font-weight-bold">
                                <router-link class="green-text" :to="`/user/@${myArticle.author.username}`">{{myArticle.author.username}}</router-link>
                            </h6>
                            <div class="read-more">{{myArticle.createdAt | formatDate}}</div>
                        </div>
                        <div class="fav">
                            <button type="button" class="btn-outline-light btn-rounded" @click="favoritedArticle">
                                        <mdb-icon icon="heart" v-if="myArticle.favorited"  size="1x" class="green-text pr-1" aria-hidden="true" />
                                        <mdb-icon far icon="heart" v-else size="1x" class="green-text pr-1" aria-hidden="true" />
                                        <span class="green-text">{{myArticle.favoritesCount}}</span>
                                    </button>
                        </div>
                    </div>
                </mdb-media-body>
            </mdb-media>
        </mdb-card-header>
        <mdb-card-body class="text-dark">
            <mdb-card-title tag="h5">
                <router-link class="black-text" :to="`/article/@${myArticle.slug}`">{{myArticle.title}}</router-link>
            </mdb-card-title>
            <mdb-card-text>
                <router-link class="black-text" :to="`/article/@${myArticle.slug}`">{{myArticle.description}}</router-link>
            </mdb-card-text>
        </mdb-card-body>
        <div class="footer">
            <router-link class="grey-text read-more" :to="`/article/@${myArticle.slug}`">read more...</router-link>
            <div class="tags">
                <mdb-badge color="tag" pill v-for="tag in myArticle.tagList" v-bind:key="tag">{{tag}}</mdb-badge>
            </div>
        </div>
    </mdb-card>
</template>

<script>
import moment from 'moment'
import { mdbCard, mdbCardBody, mdbCardHeader, mdbCardTitle, mdbCardText, mdbMedia, mdbMediaBody, mdbMediaImage, mdbBadge, mdbIcon } from 'mdbvue';

/**
 * Display Article detail
 */
export default {
    name: 'user-article',
    props: {
        article: ''
    },
    data() {
        return {
            myArticle: ''
        }
    },
    created: function() {
        this.myArticle = this.article;
    },
    filters: {
        formatDate: function (value) {
            if (!value) return ''
            return moment(String(value)).format('DD MMM YYYY hh:mm');
        }
    },
    watch: {
        article: function(article) {
            this.myArticle = article;
        }
    },
    components: {
        mdbCard,
        mdbCardBody,
        mdbCardHeader,
        mdbCardTitle,
        mdbCardText,
        mdbBadge,
        mdbMedia,
        mdbMediaBody,
        mdbMediaImage,
        mdbIcon
    },
    methods: {
        /**
         * Method to add or remove favorite article
         */
        favoritedArticle() {
            if (this.myArticle.favorited) {
                axios.delete('/articles/' + this.myArticle.slug + '/favorite')
                    .then((response) => {
                        this.myArticle = response.data.article;
                        this.$bvToast.toast('removed as favorite article.', {
                            title: 'Warning',
                            autoHideDelay: 2000,
                            appendToast: true,
                            variant: 'warning'
                        });
                    })
                    .catch((e) => {
                        this.$bvToast.toast('Error: ' + e.response.status, {
                            title: e.message,
                            autoHideDelay: 5000,
                            appendToast: true,
                            variant: 'danger'
                        });
                        if(e.response.status == 401) {
                            this.$router.push('/signin')
                        }
                    })
            } else {
                axios.post('/articles/' + this.myArticle.slug + '/favorite')
                    .then((response) => {
                        this.myArticle = response.data.article;
                        this.$bvToast.toast('Added as favorite article.', {
                            title: 'Success',
                            autoHideDelay: 2000,
                            appendToast: true,
                            variant: 'success'
                        });
                    })
                    .catch((e) => {
                        this.$bvToast.toast('Error: ' + e.response.status, {
                            title: e.message,
                            autoHideDelay: 5000,
                            appendToast: true,
                            variant: 'danger'
                        });
                        if(e.response.status == 401) {
                            this.$router.push('/signin')
                        }
                    })
            }
        }
    }
}
</script>

<style scoped>
.img {
    display: inline-block;
    vertical-align: middle;
    height: 40px;
    width: 40px;
    border-radius: 30px;
}

.card {
    /* width: 70%; */
    margin: 5px;
    text-align: left;
}

.read-more {
    font-size: .8rem;
    font-weight: 300;
    color: #bbb;
    float: left;
}

.footer {
    padding: 10px;
}

.username {
    margin-left: 5px;
}

.tag {
    color: grey !Important;
    margin-left: 5px;
}

.tags {
    float: right;
}

.user {
    float: left;
}

.fav {
    float: right;
}
</style>