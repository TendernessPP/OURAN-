<style lang="stylus" scoped>
    @import "../static/styles/varibales.styl"
    @import "../static/styles/mixins"
    .side-bar-sub
        width 1.80rem
        // background-color #ededee
        background-color #f5f5f5
        .side-bar-sub-content
            width 100%
            padding 0.1rem 0
        /*.tab-main.is-capital
            /deep/ .tab-item-text-extend-operation
                .tab-item
*/
        .operation
            border-top 1px solid #d0ced6
            box-shadow 0px 1px 1px #ffffff inset
            padding 0.1rem 0
            width 100%
            .btn
                width 1.24rem
                margin 0 auto
                height 0.3rem
                &.btn-add
                    .icon-plus
                        iconPlus(3px, #a09ea9, 0, 0.13rem)
                        margin-right 0.05rem

</style>
<template>
    <div class="side-bar-sub layout-2-auto-bottom-first">
        <div class="side-bar-sub-content scroll-y">
            <tab class="tab-main" :class="{'is-capital': isCapital}" :items="data.items" layoutDirection="column"
                    :needTextExtend="data.needTextExtend === undefined ? true : data.needTextExtend"
                    :needTextTitle="data.needTextTitle === undefined ? true : data.needTextTitle"
                    :textExtendOperation="textExtendOperation"
                    @clickTabItem="clickItem"
            >
            </tab>
        </div>
        <div class="operation" v-if="data.needOperation">
            <template v-for="btn in data.operation.btns">
                <template v-if="btn.className.indexOf('btn-add') !== -1">
                    <div class="btn gray" :class="btn.className" @click="() => {btn.onclick && btn.onclick();}">
                        <div>
                            <i class="icon-plus"></i><span>{{$gl(btn)}}</span>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="btn" @click="() => {btn.onclick && btn.onclick();}" :class="btn.className">{{btn.text}}</div>
                </template>
            </template>
        </div>
        <masker :data="mask"></masker>
    </div>
</template>
<script>
    import {
        FormInputItem,
        FormLangInputsItem,
        FormPart,
        Mask,
        MaskDeleteMsg,
        MaskMsg
    } from '@/lib/class/Components';
    import {addClickFnToElementById} from '@/lib/plugins/dom';

    export default {
        components: {
            'tab'   : require('@/views/base/tab.vue').default,
            'masker': require('@/views/base/masker.vue').default
        },
        props     : {
            data: {
                type   : Object,
                default: () => ({
                    apiModule     : '',
                    type          : '',
                    items         : [
                        {lang: {en: 'Mobile Phone', cn: ''}, select: false},
                        {lang: {en: 'Tablet', cn: ''}, select: false},
                        {lang: {en: 'Electronics', cn: ''}, select: true},
                        {lang: {en: 'Mobile Phone', cn: ''}, select: false},
                        {lang: {en: 'Tablet', cn: ''}, select: false},
                        {lang: {en: 'Electronics', cn: ''}, select: false},
                        {lang: {en: 'Mobile Phone', cn: ''}, select: false},
                        {lang: {en: 'Tablet', cn: ''}, select: false},
                        {lang: {en: 'Electronics', cn: ''}, select: false}
                    ],
                    needOperation : false,
                    needTextExtend: true,
                    needTextTitle : true,
                    operation     : {
                        btns: [
                            {text: 'Category', className: 'btn-add', onclick: () => {alert(1);}}
                        ]
                    }
                })
            }
        },
        data() {
            return {
                mask               : {},
                textExtendOperation: {
                    isShow: false,
                    items : [
                        {
                            lang   : {en: 'Move Up', cn: '上移'},
                            onclick: (e, item, index) => {
                                this.upItem(index);
                            }
                        },
                        {
                            lang   : {en: 'Move Down', cn: '下移'},
                            onclick: (e, item, index) => {
                                this.downItem(index);
                            }
                        },
                        {
                            lang         : {en: 'Rename', cn: '重命名'},
                            haveBorderTop: true,
                            onclick      : (e, item, index) => {
                                this.maskRename.open(this)
                                    .then((mask) => {
                                        let subItem = mask.content.data.items[0];
                                        if (subItem instanceof FormLangInputsItem) {
                                            ['en', 'cn'].forEach((type, index) => {
                                                subItem.items[index].value = item.lang[type];
                                            });
                                        }
                                    })
                                    .onsuccess = (mask) => {this.renameItem(index, mask.content.data.items[0]);};
                            }
                        },
                        {
                            isShow       : true,
                            haveBorderTop: true,
                            lang         : {en: 'Delete', cn: '删除 '},
                            onclick      : (e, item, index) => {
                                this.maskDeleteMsg.open(this).onsuccess = async () => {
                                    await this.deleteItem(index);
                                    this.$emit('ondelete');
                                };
                            }
                        }
                    ]
                },
                maskRename         : new Mask({
                    isHeightAuto: true,
                    vm          : this,
                    title       : {lang: {en: 'Rename Category', cn: '重命名分类'}},
                    content     : {
                        type: 'form-part',
                        data: new FormPart({
                            items: [
                                new FormLangInputsItem({
                                    title: {lang: {en: 'Category Name', cn: '分类名称'}},
                                    items: [
                                        {
                                            required: {lang: {en: 'Category Name EN is required!', cn: '新名称英文必须'}}
                                        },
                                        {
                                            required: {lang: {en: 'Category Name CN is required!', cn: '新名称中文必须'}}
                                        }
                                    ]
                                })
                            ]
                        })
                    }
                }),
                maskDeleteMsg      : new MaskDeleteMsg({vm: this}),
                isCapital          : false
            };
        },
        methods   : {
            upItem(index) {
                return this.data.upOrDownItem('up', index);
            },
            downItem(index) {
                return this.data.upOrDownItem('down', index);
            },
            renameItem(index, newName) {
                return this.data.renameItem(index, newName);
            },
            deleteItem(index) {
                return this.data.deleteItem(index);
            },
            clickItem(e, item, index) {
                if (this.data.setSelectedItem) {

                    let isSelected = this.data.setSelectedItem(index);
                    if (isSelected) {
                        this.$emit('clickItem', e, item, index);
                    }
                }
                else {
                    this.data.items[index].onclick && this.data.items[index].onclick(item, index);
                    this.$emit('clickItem', e, item, index);
                }
            },
            setCapitalTextExtendOperation() {
                if (this.data.apiModule === 'spendCategoryCapital') {
                    this.isCapital                           = true;
                    this.textExtendOperation.items[2].isShow = false;
                    this.textExtendOperation.items[3].isShow = false;
                }
                else {
                    this.isCapital = false;
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.setCapitalTextExtendOperation();
                addClickFnToElementById('app', () => {
                    this.textExtendOperation.isShow = false;
                });
            });
        }
    };
</script>
