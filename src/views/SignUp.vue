<template>
    <div class="signup">
        <h1>Sign Up</h1>
        <router-link to="/signin" class="green-text">Have an account ?</router-link>
        <br>
        <br>
        <div>
            <h6 v-for="error in Object.keys(errors)" v-bind:key="error" class="red-text">{{error}}&nbsp;{{errors[error][0]}}</h6>
        </div>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-input id="username" v-model="form.username" :state="form.username == '' ? false : true" type="text" aria-describedby="input-username" required placeholder="user name"></b-form-input>
            <b-form-invalid-feedback id="input-username" class="text-left">
                Username can not be null or empty.
            </b-form-invalid-feedback>
            <br>
            <b-form-input id="email" v-model="form.email" :state="form.email == '' ? false : true" type="email" aria-describedby="input-email" required placeholder="email id"></b-form-input>
            <b-form-invalid-feedback id="input-email" class="text-left">
                Email can not be null or empty.
            </b-form-invalid-feedback>
            <br>
            <b-input type="password" v-model="form.password" :state="form.password == '' ? false : true" required aria-describedby="input-password" placeholder="password"></b-input>
            <b-form-invalid-feedback id="input-password" class="text-left">
                Password can not be null or empty.
            </b-form-invalid-feedback>
            <br>
            <b-button pill type="submit" class="button right" variant="success"
                :disabled="form.email == '' || form.password == '' || form.username == '' ">Sign up</b-button>
            <b-button pill type="reset" class="button right" variant="warning">Reset</b-button>
        </b-form>

    </div>
</template>

<script>
/**
 * Sig up View : For create a new User
 */
export default {
    name: "sign-up",
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: '',
            },
            show: true,
            errors: []
        }
    },
    methods: {
        /**
         * Method to create new user.
         */
        onSubmit(evt) {
            evt.preventDefault();
            this.errors = [];
            axios.post('/users', {
                    user: {
                        username: this.form.username,
                        email: this.form.email,
                        password: this.form.password
                    }
                }).then((response) => {
                    this.setToken(response.data.user.token);
                    this.$store.commit('setUser', response.data.user);
                    this.$router.push('/');
                })
                .catch((e) => {
                    this.errors = e.response.data.errors;
                });
        },

        /**
         * Reset the form
         */
        onReset(evt) {
            evt.preventDefault();
            this.form.email = '';
            this.form.password = '';
            this.show = false;
            this.$nextTick(() => {
                this.show = true
            })
        },

        /**
         * Set token in axioms api
         */
        setToken(jwt) {
            axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
        }        
    }
};
</script>

<style>
.signup {
    text-align: center;
    padding: 5% 25% 0 25%;
}

.button {
    margin: 2%
}

.right {
    float: right;
}
</style>