<template>
    <div>
        <!--floor one area-->
        <div class="floor">
            <div class="floor-title">{{floorTitle}}</div>
            <div class="floor-anomaly">
                <div class="floor-one"><img :src="floorData0.image" width="100%" /></div>
                <div>
                    <div class="floor-two"><img :src="floorData1.image" width="100%" /></div>
                    <div><img :src="floorData2.image" width="100%" /></div>
                </div>
            </div>

            <div class="floor-rule">
                <div v-for="(item ,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" width="100%"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props:['floorData','floorTitle'],
        data() {
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{},
            }
        },
        created(){
            //这里写得不到数据，应为数据是延迟返回的
            
        },
        watch:{
            floorData:function(val){
                console.log(this.floorData)
                this.floorData0=this.floorData[0]
                this.floorData1=this.floorData[1]
                this.floorData2=this.floorData[2]
            }
        }

    }
</script>

<style scoped>
  .floor-anomaly{
      display: flex;
      flex-direction:row;
      background-color: #fff;
      border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
     width:10rem;
    
     box-sizing: border-box;
     -webkit-box-sizing: border-box;
  }
  .floor-one{
      border-right:1px solid #ddd;
      
  }
  .floor-two{
      border-bottom:1px solid #ddd;
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
  .floor-title{
      text-align:center;
      font-size:20px;
      height: 1.8rem;
      line-height: 1.8rem;
      color: #e5017d;
  }
</style>