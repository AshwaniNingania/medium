<template>
    <div>
        <div class="banner home-1" v-if="!username">
            <p>A place to share your knowledge.</p>
        </div>
        <mdb-container class="home-1">
            <mdb-row>
                <mdb-col col="9">
                    <b-tabs v-model="tabIndex" content-class="mt-3">
                        <b-tab title="Your Feed" v-if="username">
                            <Articles :feed="username" v-if="tabIndex == 0" />
                        </b-tab>
                        <b-tab title="Global Feed">
                            <Articles v-if="(username && tabIndex == 1) || tabIndex == 0" />
                        </b-tab>
                        <b-tab :title='`${tag}`'>
                            <Articles :tag="tag.substring(1)" v-if="tag" />
                        </b-tab>
                    </b-tabs>
                </mdb-col>
                <mdb-col col="3">
                    <Tags @fetchArticlesForTag="fetchArticlesForTag" />
                </mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import Articles from './../components/Articles'
import Tags from './../components/Tags'
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue';
/**
 * Home Component
 */
export default {
    name: 'home',
    components: {
        Articles,
        Tags,
        mdbContainer,
        mdbRow,
        mdbCol
    },
    data() {
        return {
            tag: '',
            tabIndex: 0
        }
    },
    watch: {
        tabIndex: function(tabIndex) {
            if (tabIndex == 0 && !this.username) {
                this.tag = '';
            } else if ((tabIndex == 0 || tabIndex == 1) && this.username) {
                this.tag = '';
            }
        }
    },
    created: function() {
        this.tabIndex = 0;
    },
    computed: {
        username() {
            return this.$store.getters["username"];
        }
    },
    methods: {
        fetchArticlesForTag: function(tag) {
            this.tag = '#' + tag;
            this.tabIndex = this.username ? 2 : 1;
        }
    }
}
</script>

<style scoped>
.banner {
    background: #5cb85c;
    color: #fff;
    background: #5cb263;
}

.home-1 {
    padding: 1rem;
    margin-bottom: 1rem;
}

.disableTab {
    cursor: default;
}
</style>
