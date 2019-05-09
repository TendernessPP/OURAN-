<template></template>
<script>
    import {
        RETURN_OK
    } from '@/conf/api.conf';

    export default {
        mixins : [
            require('@/views/mixins/auth').default,
            {methods: require('@/views/mixins/common').default.methods}
        ],
        data() {
            return {};
        },
        methods: {
            async setLoginConf() {
                let apiData = await this.$api.user.getPermissions();
                if (apiData.code.toString() === RETURN_OK) {
                    let loginConf        = apiData.data.user;
                    loginConf.LOGOUT_URL = apiData.data.logoutUrl;
                    await this.setLoginConfig(loginConf);
                    this.goDefaultEnterPage(this.enterPageRoute);
                }
                else {
                    this.goLogin();
                }
            },
            getEnterPageRoute() {
                if (this.$route.params && this.$route.params.from) {
                    this.enterPageRoute = this.$route.params.from.path;
                }
            }
        },
        created() {
            this.getEnterPageRoute();
            this.setLoginConf();
        }
    };
</script>
