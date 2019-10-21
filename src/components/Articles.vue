<template>
    <div class="my">
        <div v-if="!articles" class="noarticles">
            loading articles ...
        </div>
        <div v-else-if="articles.length == 0" class="noarticles">
            No articles are here... yet.
        </div>
        <div v-else>
            <div v-for="article in articles" v-bind:key="article.slug">
                <UserArticle :article="article" />
            </div>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="mt-4"  align="center">
                <template v-slot:first-text>
                    <span class="text-success">First</span>
                </template>
                <template v-slot:prev-text>
                    <span class="text-danger">Prev</span>
                </template>
                <template v-slot:next-text>
                    <span class="text-warning">Next</span>
                </template>
                <template v-slot:last-text>
                    <span class="text-info">Last</span>
                </template>
                <template v-slot:ellipsis-text>
                  <b-spinner small type="grow"></b-spinner>
                  <b-spinner small type="grow"></b-spinner>
                  <b-spinner small type="grow"></b-spinner>
                </template>
                <template v-slot:page="{ page, active }">
                    <b v-if="active">{{ page }}</b>
                    <i v-else>{{ page }}</i>
                </template>
            </b-pagination>
        </div>
  </div>
</template>


<script>
import UserArticle from './../components/UserArticle'
/**
 * Display All articles
 */
export default {
    name: 'articles',
    data() {
        return {
            articles: null,
            rows: 0,
            perPage: 5,
            currentPage: 1,
        }
    },
    components: {
        UserArticle
    },
    watch: {
      currentPage: function() {
        this.getArticles();
      }
    },
    props: {
        author: null,
        favorited: null,
        tag: null,
        feed: null
    },
    created: function() {
        this.getArticles();
    },
    methods: {

        /**
         * Method to fetch the articles based on different params
         */
        getArticles: function() {
            var URL = '/articles';
            if (this.feed) {
                URL += '/feed'
            }
            axios.get(URL, {
                    params: {
                        author: this.author,
                        favorited: this.favorited,
                        tag: this.tag,
                        limit: this.perPage,
                        offset: this.perPage * (this.currentPage - 1)
                    }
                }).then((response) => {
                    this.articles = response.data.articles;
                    this.rows = response.data.articlesCount;
                })
                .catch((e) => {
                    console.error(e)
                })
        }
    }
}
</script>

<style scoped>
.my {
    padding: 1rem;
    margin-bottom: 1rem;
}

.noarticles {
    text-align: left;
}
</style>
