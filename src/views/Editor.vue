<template>
    <div class="editor">
        <b-container fluid>
            <div>
                <h6 v-for="error in Object.keys(errors)" v-bind:key="error" class="red-text">{{error}}&nbsp;{{errors[error][0]}}</h6>
            </div>
    
            <b-form @reset="onReset" v-if="show && newArticle">
                <b-form-input id="title" v-model="newArticle.title" :state="newArticle.title == '' ? false : true" size="lg" required placeholder="Article Title"></b-form-input>
                <br>
                <b-form-input id="description" v-model="newArticle.description" :state="newArticle.description == '' ? false : true" required placeholder="What's this article about?"></b-form-input>
                <br>
                <b-form-textarea id="body" v-model="newArticle.body" size="lg" :state="newArticle.body == '' ? false : true" required placeholder="Write your article (in markdown)"></b-form-textarea>
                <br>
                <b-input id="tags" v-model="tag" v-on:keyup.enter="addTag()" placeholder="Enter tags"></b-input>
                <br>
                <mdb-badge color="tag" class="mytag" pill v-for="tag in newArticle.tagList" v-bind:key="tag">
                    <a href="javascript:void(0)" @click="removeTag(tag)"><i class="fas fa-times mr-1"></i></a>{{tag}}
                </mdb-badge>
                <br>
                <b-button pill type="button" @click="onSubmit" class="button" variant="success right" :disabled="newArticle.title == '' || newArticle.description == '' || newArticle.body == ''">Publish Article</b-button>
                <b-button pill type="reset" class="button" variant="warning right">Reset</b-button>
            </b-form>
    
        </b-container>
    </div>
</template>

<script>
import { mdbBadge } from 'mdbvue';

/** 
 * Editor view: to add the article in the application
 */
export default {
    name: "editor",
    components: {
        mdbBadge
    },
    data() {
        return {
            newArticle: {
                slug: this.$route.params.slug,
                title: '',
                description: '',
                body: '',
                tagList: []
            },
            tag: '',
            show: true,
            errors: []
        }
    },
    watch: {
        '$route.params.slug': function(slug) {
            if (slug) {
                this.newArticle.slug = slug;
                this.getArticle();
            }
        }
    },
    created: function() {
        if (this.newArticle.slug) {
            this.newArticle = this.getArticle();
        }
    },
    methods: {
        /**
         * Method to fetch the article for edit
         */
        getArticle: function() {
            axios.get('/articles/' + this.newArticle.slug).then((response) => {
                    this.newArticle = response.data.article
                })
                .catch((e) => {
                    this.showError(e);
                })
        },

        /**
         * Method to submit new article
         */
        onSubmit(evt) {
            evt.preventDefault();
            this.errors = [];
            if (this.$route.params.slug) {
                axios.put('/articles/' + this.newArticle.slug, { "article": this.newArticle }).then((response) => {
                        this.$bvToast.toast('Article updated.', {
                            title: 'Success',
                            autoHideDelay: 2000,
                            appendToast: true,
                            variant: 'success'
                        });
                        this.$router.push('/');
                    })
                    .catch((e) => {
                        this.errors = e.response.data.errors;
                    });
            } else {
                axios.post('/articles', { "article": this.newArticle }).then((response) => {
                        this.$bvToast.toast('Article added.', {
                            title: 'Success',
                            autoHideDelay: 2000,
                            appendToast: true,
                            variant: 'success'
                        });
                        this.$router.push('/');
                    })
                    .catch((e) => {
                        this.errors = e.response.data.errors;
                    });
            }
        },

        /**
         * Reset the editor
         */
        onReset(evt) {
            evt.preventDefault();
            this.newArticle.title = '';
            this.newArticle.description = '';
            this.newArticle.body = '';
            this.newArticle.tagList = [];
            this.tag = '';
            this.$nextTick(() => {
                this.show = true
            })
        },

        /**
         * Add a tag to editor form
         */
        addTag: function() {
            this.tag = this.tag.toLowerCase();
            if (this.tag) {
                var index = this.newArticle.tagList.indexOf(this.tag);
                if (index > -1) {
                    this.$bvToast.toast(this.tag + ' already added.', {
                        title: 'Can not Add.',
                        autoHideDelay: 500,
                        appendToast: true,
                        variant: 'warning'
                    });
                } else {
                    this.newArticle.tagList.push(this.tag);
                    this.$bvToast.toast(this.tag + ' added.', {
                        title: 'Success',
                        autoHideDelay: 500,
                        appendToast: true,
                        variant: 'success'
                    });
                }
                this.tag = '';
            }
        },

        /**
         * Remove a tag 
         */
        removeTag: function(tag) {
            tag = tag.toLowerCase();
            var index = this.newArticle.tagList.indexOf(tag);
            if (index > -1) {
                this.newArticle.tagList.splice(index, 1);
            }
            this.$bvToast.toast(tag + ' removed.', {
                title: 'Removed',
                autoHideDelay: 500,
                appendToast: true,
                variant: 'warning'
            });
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
    margin: 2%
}

.right {
    float: right;
}

.mytag {
    float: left;
    margin: 5px;
    color: grey !important;
}
</style>