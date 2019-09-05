<template>
<div>
        <div class="search-bar">
            <van-row>
                <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" alt=""></van-col>
                <van-col span="16"><input type="text" class="search-input"></van-col>
                <van-col span="5"><van-button szie="mini">查找</van-button></van-col>
            </van-row>   
        </div>
          <!-- swiper  -->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img :src="banner.image"  width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type-bar -->
        <div class="type-bar">
            <div  v-for="(cate,index) in category" :key="index" >
                <img v-lazy="cate.image" :src="cate.image" width="90%" />
                <span>{{cate.mallCategoryName}}</span> 
            </div>
        </div>
        <!-- ad banner area -->
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
        </div>
        <!-- Reacommend goods area -->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            
            <div class="recommend-body">
                <!-- swiper -->
            <swiper :options="swiperOption">
                <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                <div class="recommend-item">
                        <img :src="item.image" width="80%" />
                        <div>{{item.goodsName}}</div>
                        <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
                        
                </div>
                </swiper-slide>
            </swiper>
            </div>         
    </div>
            <!--floor one area-->
            <floor-component1 :floorData="floor1" :floorTitle="floorName.floor1"></floor-component1>
            <floor-component1 :floorData="floor2" :floorTitle="floorName.floor2"></floor-component1>
            <floor-component1 :floorData="floor3" :floorTitle="floorName.floor3"></floor-component1>
            <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                             <goods-info1 :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId="item.goodsId"></goods-info1>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
</div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import floorComponent1 from '../component/floorComponent1'
import {toMoney} from '@/filter/moneyFilter.js'
import goodsInfo1 from '../component/goodsInfo1'
import url from '@/serviceAPI.config.js'
    export default {
        created(){
            axios({
                url:url.getShoppingMallInfo,
                method:'get'
            })
            .then(response =>{
                console.log(response)
                if(response.status==200){
                    this.bannerPicArray=response.data.data.slides
                    this.category = response.data.data.category
                    this.adBanner = response.data.data.advertesPicture
                    this.recommendGoods = response.data.data.recommend
                    this.floor1 = response.data.data.floor1             //楼层1数据
                    this.floor2 = response.data.data.floor2
                    this.floor3 = response.data.data.floor3
                    this.floorName = response.data.data.floorName
                    this.hotGoods = response.data.data.hotGoods
                    
                    
                }
            })
            .catch((error) => {

            })
        },
        components: {
            swiper,
            swiperSlide,
            floorComponent1,
            goodsInfo1
            
        },
        filters: {
            moneyFilter(money){
                return toMoney(money)
            }
        },
        data() {
            return {
                swiperOption:{
                    slidesPerView: 3
                },
                locationIcon: require('../../assets/images/location.png'),
                bannerPicArray:[],
                category:[],
                adBanner:[],
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[]
                
            }
        }
    }
</script>

<style  scoped>
.search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
}
.search-input{
    width:100%;
      height: 1.3rem;
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid 1px !important ;
      background-color: #e5017d;
      color:#fff;
}
.location-icon{
    padding: .2rem 0rem 0rem .3rem;
    color: #fff;
    font-size: 16px;
}
.swiper-area{
    width: 20rem;
    clear: both;
}
.type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
  .type-bar div:nth-child(1){
      width: 95%;
  }
   .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
  .recommend-body{
       border-bottom: 1px solid #eee;
   }
  
  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
.floor-rule{
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      background-color: #fff;

  }
  .floor-rule div{
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width:10rem;
      border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
      border-right: 1px solid #ddd;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
</style>