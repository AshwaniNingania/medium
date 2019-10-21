<template>
  <div class="tags">
        <div v-if="!tags" class="noarticles"> 
            loading tags ...
        </div>
        <div v-else-if="tags.length == 0" class="noarticles">
            No tags are here... yet.
        </div>
        <div v-else id="tagTab">
            <mdb-badge color="tag" pill v-for="tag in tags" v-bind:key="tag">
                <a href="javascript:void(0)" @click="fetchArticlesForTag(tag)">
                    {{tag}}
                </a>
            </mdb-badge>
        </div>
  </div>
</template>

<script>
/**
 * Display popular tags on home page.
 */
import {mdbBadge} from 'mdbvue';
export default {
    name: 'tags',
    data() {
        return {
            tags: null
        }
    },
    components: {
        mdbBadge
    },
    created: function() {
        this.getAlltags();
    },
    methods: {
        /**
         * Fetch all tags
         */
        getAlltags: function() {
            axios.get('/tags').then((response) => {
                this.tags = response.data.tags
            })
            .catch((e) => {
                console.error(e)
            })
        },

        /**
         * Fetch articles for a particular tag.
         */
        fetchArticlesForTag: function(tag) {
            this.$emit('fetchArticlesForTag', tag);
        }
  }
}
</script>

<style scoped>
    .tag {
        color: grey!Important;
        margin-left: 5px;
    }
    .tags {
        padding: 1rem;
        margin-bottom: 1rem;
        border: lightgrey;
        border-style: dotted;
    }
    
    a:hover {
        font-size: 100%;
        cursor: pointer;
    }
</style>