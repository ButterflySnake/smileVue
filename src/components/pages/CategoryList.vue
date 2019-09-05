<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"></van-nav-bar>
        </div>
            <van-row > 
                <van-col sapn="6">
                    <div id="leftNav">
                        <ul>
                            <li v-for="(item,index) in category" @click="clickCategory(index,item.ID)" :key="index" :class="{categoryActive:categoryIndex==index}">
                                {{ item.MALL_CATEGORY_NAME }}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col sapn="18" class="van-col2">
               <div class="tabCategorySub">
                   <van-tabs v-model="active" @click="onClickCategorySub">
                    <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                       
                    </van-tab>
                   </van-tabs>
               </div>
               <div id="list-div">
                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                   <van-list 
                   v-model="loading" 
                   :finished="finished" 
                   @load="onLoad"
                   >
                       <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                            <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg"/></div>
                            <div class="list-item-text">
                                <div>{{item.NAME}}</div>
                                <div class="">￥{{item.ORI_PRICE | moneyFilter }}</div>
                            </div>
                    </div>
                   </van-list>
                </van-pull-refresh>
               </div>
                </van-col>
            </van-row>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        created(){
            this.getCategory();
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
        mounted () {
            let winHeight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height= winHeight-46-50 +'px'
            document.getElementById("list-div").style.height= winHeight-90-50 +'px'
        },
        data() {
            return {
                category:[],
                categoryIndex:0,
                categorySub:[],
                active:0,
                loading:false,//上拉加载使用
                finished:false,//x下拉加载是否没有数据了
                isRefresh:false,//x下拉加载
                page:1,
                goodList:[],
                categorySubId:'',
                errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径

            }
        },
        methods: {
            getCategory() {
                axios({
                    url:url.getCategoryList,
                    method:'get',
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code == 200 && response.data.message){
                        this.category = response.data.message
                        this.getCategorySubByCategoryId(this.category[0].ID)
                        
                    }else{
                        Toast('服务器错误，数据获取失败')
                    }
                }).catch(error=>{
                    console.log(error)
                })
            },
            getCategorySubByCategoryId(categoryId){
                axios({
                    url:url.getCategorySubList,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(response=>{
                    if(response.data.code == 200 && response.data.message ){
                        this.categorySub = response.data.message
                        this.active = 0
                        
                        
                        
                    }else{
                        Toast("服务器错误，数据获取失败")
                    }
                })
                .catch(err=>{
                    console.log(error)
                })
            },
            clickCategory(index,categoryId){
                this.categoryIndex=index
                this.page=1
                this.finished = false
                this.goodList=[]
                this.getCategorySubByCategoryId(categoryId)
                
                
            },
            getGoodList(){
                axios({
                    url:url.getGoodsListByCategorySubID,
                    method:'post',
                    data:{
                            categorySubId:this.categorySubId,
                            page:this.page
                        }
                 })
                .then(response=>{
                    console.log(response)
                    if(response.data.code == 200 && response.data.message.length ){
                        this.page++
                        this.goodList=this.goodList.concat(response.data.message)
                       console.log(this.goodList)
                    }else{
                            this.finished = true;
                    }
                    this.loading=false;
                    console.log(this.finished)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            },
            //点击子类获取商品信息
            onClickCategorySub(index,title){
                //console.log( this.categorySub)
                this.categorySubId= this.categorySub[index].ID
                console.log(this.categorySubId)
                
                this.goodList=[]
                this.finished = false
                this.page=1
                this.onLoad()

            },
            onLoad(){
                setTimeout(() => {
                    this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getGoodList()
                }, 1000);    
            },
            onRefresh(){
                setTimeout(()=>{
                    this.isRefresh = false;
                    this.finished = false;
                    this.goodLis=[],
                    this.page=[];
                    this.onLoad();
                },500);
            },
            goGoodsInfo(id){
                this.$router.push({name:'Goods',params:{goodsId:id}})
            }
        },
    }
</script>

<style scoped>
 #leftNav{
        background-color: aliceblue;
    }
#leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}
.categoryActive{
    background-color: #fff;
}
.van-col2{
    width:82%
}

 .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>