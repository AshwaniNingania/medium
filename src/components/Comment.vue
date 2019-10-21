<template>
  <div v-if="comment">
     <mdb-card border="light" class="mb-3 card">
        <mdb-card-body class="text-dark">
            <mdb-card-title tag="h5">{{comment.body}}</mdb-card-title>
            <!-- <mdb-card-text>{{comment.description}}</mdb-card-text> -->
        </mdb-card-body>
        <mdb-card-footer>
            <mdb-media>
                <mdb-media-image circle :src="comment.author.image" class="d-flex mr-3 img" />
                <mdb-media-body>
                    <div>
                        <div class="user">
                            <router-link class="green-text" :to="`/user/@${comment.author.username}`">{{comment.author.username}}</router-link>
                            <div class="read-more">
                                {{comment.createdAt | formatDate}}
                                <button type="button" class="btn-outline-light btn-rounded ml-2" @click="deleteComment" v-if="comment.author.username == username">
                                    <mdb-icon size="2x" class="red-text p-1"  icon="trash-alt" />
                                </button>
                            </div>
                        </div>
                    </div>
                </mdb-media-body>
            </mdb-media>
        </mdb-card-footer>
    </mdb-card>
  </div>
</template>

<script>
    import moment from 'moment';
    import { mdbCard, mdbCardBody, mdbCardTitle, mdbMedia, mdbMediaBody, mdbMediaImage, mdbCardFooter, mdbIcon } from 'mdbvue';
    /**
     * Display comment under the Article
     */
	export default {
        name: 'comment',
        props: {
            comment: ''
        },
		 components: {
            mdbCard,
            mdbCardBody,
            mdbCardTitle,
            mdbMedia,
            mdbMediaBody,
            mdbMediaImage,
            mdbCardFooter,
            mdbIcon
        },
        computed: {
            username() {
                return this.$store.getters["username"];
            }
        },
        filters: {
            /**
             * Display Comment date in differnt format.
             */
            formatDate: function (value) {
                if (!value) return ''
                return moment(String(value)).format('DD MMM YYYY hh:mm');
            }
        },
        methods: {
            /**
             * Emit the event to delete particular comment.
             */
            deleteComment() {
                this.$emit('deleteCommentId', this.comment.id);
            }
        }
	}
</script>

<style scoped>
    .img {
        display: inline-block;
        vertical-align: middle;
        height: 30px;
        width: 30px;
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
        float: right;;
    }
</style>