<template>
    <section class="hero is-dark is-fullheight">
    <div class="hero-body">
        <div class="container">
        <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen has-text-centered">
                <img style="padding: 10px 0 40px 0;" width="240" src="/img/valet_point_plus.png">
                <form v-if="loginForm" role="form" v-on:submit.prevent="login" class="box">
                        <h1 class="title size-4 has-text-black">Login - TEST-LOGIN </h1>
                        <b-field label="Username or Password">
                            <b-input label-position="on-border" v-model="username" placeholder="Enter email or username" type="text" maxlength="30" required></b-input>
                        </b-field>
                        <b-field label="Password">
                            <b-input v-model="password" placeholder="Enter password" type="password" required></b-input>
                        </b-field>
                        <button expanded :disabled="btnDisabled" class="button is-primary is-pulled-left" :class="{'is-loading':isLoading}">Login</button>
                        <button class="button is-info" @click="sendSMS">SMS</button>
                        <button expanded v-on:click.prevent="forgotPassword" :disabled="btnDisabled" class="button is-white is-pulled-right">Forgot Password</button>
                        <img style="padding: 40px 0 0px 0;" width="140" src="/img/dv_logo_web.png">
                </form>

                <form v-else role="form" v-on:submit.prevent="recoverPassword" class="box">
                    <h1 class="title size-4 has-text-black">Recover Account - TEST</h1>
                    <b-field style="margin-bottom: 118px;" label="Email Address">
                        <b-input v-model="username" placeholder="Enter email" type="email" class="form-control" required=""></b-input>
                    </b-field>
                    <button :disabled="btnDisabled" type="submit" class="button is-primary is-pulled-left" :class="{'is-loading': isLoading}">Recover Password</button>
                    <button v-on:click.prevent="forgotPassword" :disabled="btnDisabled" class="button is-white is-pulled-right"><b-icon ></b-icon> Login</button>
                    <img style="padding: 40px 0 0px 0;" width="140" src="/img/dv_logo_web.png">
                    
                </form>
            </div>
        </div>
        </div>
    </div>
    </section>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    import { VPP_CONFIG } from '../config.js';

    export default {
        data() {
            return {
                loginForm: true,
                btnDisabled: false,
                username: "",
                password: "",
                isLoading: false,
            }
        },
        //naming a component in vue, can be used to debug, router-link, etc
        name: 'LoginOverlay',

        //life cycle hook, gets executed when the component is created, before the component is mounted
        created() {
                console.log(this.$router.currentRoute.fullPath);
                if (this.getIsAuthenticated&&(this.$router.currentRoute.fullPath!='/')) {
                    this.$router.replace('/');
                }
        },
        computed: {
            ...mapGetters(['getIsAuthenticated','allowWithRole','allowWithPermission']),
        },
        components: {
        },
        methods: {
            ...mapActions(['CompleteAuthentication','CompleteLogin','loadCustomers','Cleanup']),
            login() {
                this.btnDisabled = true;
                this.isLoading = true;
                axios.post(`${VPP_CONFIG.API_URL}/login`, 
                    {
                        username: this.username,
                        password: encodeURI(this.password),
                        siteCode: (localStorage.getItem('site_settings')) ? this.$aes.decrypt(localStorage.getItem('site_settings')) : ''
                    }
                )
                .then(response  => {
                    // this.$buefy.toast.open('Response Received')
                    console.log('test-page test')

                    console.log(response)

                    // if (response.data.status==='Success') {
                    //     this.CompleteAuthentication(response.data);
                    //     if (this.allowWithRole(['valet.bay','pdic.supervisor'])) {
                    //         if (localStorage.getItem('site_settings')) {
                    //         } else {
                    //             this.$buefy.toast.open({
                    //                 duration: 10000,
                    //                 message: 'Valet Bay Users can only use Valet Bay Assigned Devices',
                    //                 type: 'is-danger'
                    //             });
                    //             this.username="";
                    //             this.password="";
                    //             this.btnDisabled = false;
                    //             this.isLoading = false;
                    //             this.Cleanup();
                    //             return;
                    //         }
                    //     }
                    //     this.CompleteLogin(response.data);
                    //     this.loadCustomers('%');
                    //     this.username="";
                    //     this.password="";
                    //     // this.$router.replace({ name: 'dashboard'});
                    //     this.btnDisabled = false;
                    //     this.isLoading = false;
                    // } else if (response.data.status==='Failure') {
                    //     this.$buefy.toast.open(response.data.reason)
                    //     this.username="";
                    //     this.password="";
                    //     this.isLoading = false;
                    //     this.btnDisabled = false;
                    // } else {
                    //     this.$buefy.toast.open(response)
                    //     this.username="";
                    //     this.password="";
                    //     this.isLoading = false;
                    //     this.btnDisabled = false;
                    // }
                })
                .catch(error => {
                    this.$buefy.toast.open("An error in sign-in occurred. Please try again later. If problem persists please contact Direct Valeting Ltd.")
                    this.btnDisabled = false;
                    this.isLoading = false;
                    // Sorry - something went wrong.
                })
            },
            forgotPassword() {
                this.loginForm = !this.loginForm;
            },
            recoverPassword() {
                this.loginForm = !this.loginForm;
            },
        }
    }

</script>