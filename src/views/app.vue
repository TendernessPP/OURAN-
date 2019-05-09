<style lang="stylus">
html
    height: 100%
    font-size: 12px
    font-family: '微软雅黑'!important
    body
        margin: 0
        padding: 0
        height: 100%
        background: #f1f1f1
    #app
        display: flex
        flex-direction: column
        height: 100%
</style>
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapMutations } from 'vuex'
    const arr=['Q&A','Brainstorm'];
    export default {
        data() {
            return {};
        },
        methods: {
            ...mapMutations([
                'radioStatusChange'
            ]),
            benRadioChange(val){
                 this.$store.commit('radioStatusChange', val);
                let name= arr[val];
                // let name2=arr[this.$store.state.radioStatus]
                this.$goRoute(Object.assign({
                    name  : `${name}List`,
                    // params: {id: item[this.paramsIdApiKeyEdit]}
                }, {}));
            }
        }
    };
</script>
