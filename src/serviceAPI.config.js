const BASEURL = "https://www.easy-mock.com/mock/5cd79e6b7500082351cc3f86/index/index"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL,
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register', //用户注册接口
    login:LOCALURL+'user/login',   //用户登录接口
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',
    getCategoryList:LOCALURL+'goods/getCategoryList',
    getCategorySubList:LOCALURL+'goods/getCategorySubList',
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息
}

module.exports = URL