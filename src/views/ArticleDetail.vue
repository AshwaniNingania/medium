<template>
    <div v-if="article">
        <div class="article-detail">
            <div class="article-main">
                <h2>{{article.slug}}</h2>
                <div class="right">
                    <button type="button" class="btn-outline-success btn-rounded" @click="favoritedArticle">
                            <mdb-icon icon="heart" v-if="article.favorited"  size="1x" class="green-text pr-1" aria-hidden="true" />
                            <mdb-icon far icon="heart" v-else size="1x" class="green-text pr-1" aria-hidden="true" />
                            <span class="green-text">{{article.favoritesCount}}</span>
                    </button>
                </div>
                <div>
                    <User :user="article.author" @deleteArticleId="deleteArticle" />
                </div>
                <button type="button" class="button btn-outline-light btn-rounded ml-2" v-if="username == article.author.username">
                    <router-link :to="`/new/${article.slug}`" class="grey-text">
                    <i class="fas fa-edit"></i> Edit Article
                    </router-link>
                </button>
                <!-- <b-button class="button" variant="primary" v-if="username != article.author.username" size="sm">Edit Article</b-button> -->
            </div>
        </div>
        <div class="article-main">
            <h5>{{article.body}}</h5>
            <mdb-badge color="tag" pill v-for="tag in article.tagList" v-bind:key="tag">{{tag}}</mdb-badge>
            <br>
            <hr>
            <b-form @submit="onSubmit" v-if="username">
                <b-form-textarea id="commonet-body" v-model="newComment" size="lg" required placeholder="Write a comment.."></b-form-textarea>
                <b-button pill type="submit" class="button" variant="success" :disabled="newComment == ''">Post Comment</b-button>
            </b-form>
            <div v-else class="text-center">
                <router-link to="/signin" class="green-text">Sign in</router-link>
                or
                <router-link to="/signup" class="green-text">Sign up</router-link>
                to add comments to this article
            </div>
            <hr>
        </div>
        <div v-if="comments">
            <Comment v-for="comment in comments" @deleteCommentId="deleteComment" v-bind:key="comment.id" :comment="comment" class="comment" />
        </div>
    </div>
</template>

<script>
import { mdbBadge, mdbIcon } from 'mdbvue';
import Comment from './../components/Comment'
import User from './../components/User'

/**
 * Artcile Detail View
 */
export default {
    name: 'article-detail',
    data() {
        return {
            slug: this.$route.params.slug,
            user: null,
            article: null,
            comments: null,
            newComment: ''
        }
    },
    watch: {
        '$route.params.slug': function(slug) {
            if (slug) {
                this.slug = slug;
                this.getArticle();
            }
        }
    },
    created: function() {
        if (this.slug) {
            this.getArticle();
            this.getArticleComments();
        }
    },
    computed: {
        username() {
            return this.$store.getters["username"];
        }
    },
    components: {
        mdbBadge,
        Comment,
        User,
        mdbIcon
    },
    methods: {
        /**
         * Method to fetch particular article detail
         */
        getArticle: function() {
            axios.get('/articles/' + this.slug).then((response) => {
                    this.article = response.data.article
                })
                .catch((e) => {
                    this.showError(e);
                })
        },

        /**
         * Method to fetch comments for the article.
         */
        getArticleComments: function() {
            axios.get('/articles/' + this.slug + '/comments').then((response) => {
                    this.comments = response.data.comments
                })
                .catch((e) => {
                    this.showError(e);
                })
        },

        /**
         * Method to remove comment from the article
         */
        deleteComment: function(id) {
            axios.delete('/articles/' + this.slug + '/comments/' + id).then((response) => {
                    this.getArticleComments();
                    this.$bvToast.toast('Comment deleted successfully', {
                        title: 'Warning',
                        autoHideDelay: 2000,
                        appendToast: true,
                        variant: 'warning'
                    });

                })
                .catch((e) => {
                    this.showError(e);
                })
        },

        /**
         * Method to remove the article
         */
        deleteArticle: function() {
            axios.delete('/articles/' + this.slug).then((response) => {
                    this.$router.push('/user/@' + this.username);
                    this.$bvToast.toast('Article deleted successfully', {
                        title: 'Warning',
                        autoHideDelay: 2000,
                        appendToast: true,
                        variant: 'warning'
                    });
                })
                .catch((e) => {
                    this.showError(e);
                })
        },

        /**
         * Method to add comment from the article
         */
        onSubmit(evt) {
            evt.preventDefault();
            axios.post('/articles/' + this.slug + '/comments', {
                comment: {
                    body: this.newComment,
                    }
                }).then((response) => {
                    this.getArticleComments();
                    this.$bvToast.toast('Comment added.', {
                        title: 'Success',
                        autoHideDelay: 2000,
                        appendToast: true,
                        variant: 'success'
                    });
                })
                .catch((e) => {
                    this.showError(e);
                });
            this.newComment = '';
        },

        /**
         * Method to add or remove the article as favorite.
         */
        favoritedArticle() {
            if (this.article.favorited) {
                axios.delete('/articles/' + this.article.slug + '/favorite')
                    .then((response) => {
                        this.article = response.data.article;
                        this.$bvToast.toast('removed as favorite article.', {
                            title: 'Warning',
                            autoHideDelay: 2000,
                            appendToast: true,
                            variant: 'warning'
                        });
                    })
                    .catch((e) => {
                        this.showError(e);
                    })
            } else {
                axios.post('/articles/' + this.article.slug + '/favorite')
                    .then((response) => {
                        this.article = response.data.article;
                        this.$bvToast.toast('Added as favorite article.', {
                            title: 'Success',
                            autoHideDelay: 2000,
                            appendToast: true,
                            variant: 'success'
                        });
                    })
                    .catch((e) => {
                        this.showError(e);
                    })
            }
        },

        /**
         * Display error in apis
         */
        showError(e) {
            this.$bvToast.toast('Error: ' + e.response.status, {
                title: e.message,
                autoHideDelay: 5000,
                appendToast: true,
                variant: 'danger'
            });
            if(e.response.status == 401) {
                this.$router.push('/signin')
            }
        }
    }
}
</script>

<style>
.article-detail {
    margin-bottom: 1rem;
    background: #c9cfc9;
}

.article-main {
    padding: 1rem;
    text-align: left;
    margin-left: 10%;
    margin-right: 10%;
}

.right {
    float: right;
}

.tag {
    color: grey !Important;
    margin-left: 5px;
}

.comment {
    margin: 0 20% 0 20%
}
</style>