<template>
  <div>

    <h3>绑在vue上</h3>
    <p>点了下一年，会清空上一年的数据</p>
    <div class="date-top-box">
      <div class="op-last-year">
        <el-button type="primary" icon="el-icon-d-arrow-left" @click="goLastYear"></el-button>
      </div>
      <div calss="year-title">{{ curYear }}年</div>
      <div class="op-next-year">
        <el-button type="primary" icon="el-icon-d-arrow-right" @click="goNextYear"></el-button>
      </div>
    </div>

    <div class="date-year">
      <div class="date-m-container" v-for="(mouth, m) in getMouthList()" :key="mouth">
          <div class="date-mouth-box">
              <div class="date-mouth">{{ mouth }}</div>
              <div class="date-weeks-container">
                  <div class="date-week-box" v-for="week in weekList" :key="week">
                      <span>{{ week }}</span>
                  </div>
              </div>
              
              <div v-for="(item, index) in dayListInYear[m+1]" class="date-day-box" :key="index">
                  <div :class="item.chosen ? 'day-number-container--checked' : 'day-number-container'"  @click="clickDay(item)">
                      <span class="day-number" v-if="item.status">{{ item.desc }}</span>
                      <span v-else></span>
                  </div>
              </div>
          </div>
      </div>
    </div>

    <!-- <div>
      <p>已选择了</p>
      <p>{{ nowChooseNameList.join(" , ") }}</p>
    </div> -->

    <div>
      <p>已选择了</p>
      <p v-for="(value, key) in nowChooseDayMap" :key="key">
        {{key}}年 - {{value}}
      </p>
    </div>

  </div>
</template>

<script>

  import utils from "../../assets/js/utils.js"
  import dateTools from "../../assets/js/date.js"

  // const day = {  定义的天的对象
  //   date: "2018/12/1",
  //   desc: "1",
  //   status: 1,
  //   chosen: false
  // }
  // const year = {
  //   1: [
  //     day, day, ... day
  //   ],
  //   2: [],
  //   ...
  //   12: []
  // }

  // 已选择的日期根year对象一致

  export default {
    name: "DateChoose",
    data() {
      return {
        weekList: ["一", "二", "三", "四", "五", "六", "七"],
        today: "",
        curYear: 0,
        curMouth: 1,
        dayListInYear: {},
        nowChooseNameList: [],
        nowChooseDayMap: {},
        nowChooseItemMap: {}
      }
    },
    mounted() {
      this.initNow()
      this.initDayList()
      this.initDayListInYear()
    },
    methods: {
      initNow() {
        let cur = new Date()
        this.today = cur
        this.curYear = cur.getFullYear()
        this.curMouth = cur.getMonth()
      },
      initDayList() {
        let year = 2019
        let mouth = 1
        let day = 1
        // 一个月有几天
        let days_in_mouth = dateTools.numberOfDaysInMouth(year, mouth) // getDaysInMouth(year, mouth)

        let dayList = []
        for (let i = 1; i <= days_in_mouth; i++) {
          let date_item = {
            date: `${year}/${mouth}/${i}`,
            desc: `${i}`,
            status: 1,
            chosen: false
          }
          dayList.push(date_item)
        }
        let firstDay_in_week = dateTools.whatDayIsItToday(year, mouth, 1)
        // 没有找到很好的v-for遍历的方法所以需要在dayList中填充一个冗余的对象
        for (let j = 1; j < firstDay_in_week; j++) {
          dayList.unshift({
            date: "0/0/0",
            desc: "辅助时间",
            status: 0,
            chosen: false
          })
        }
        console.log("init dayList = ", dayList)
        this.dayList = dayList
      },
      getDayListByMouth(m) {
        let year = this.curYear
        let mouth = m
        let day = 1
        // 一个月多少天
        let days_in_mouth = dateTools.numberOfDaysInMouth(year, mouth) // getDaysInMouth(year, mouth)

        let dayList = []
        for (let i = 1; i <= days_in_mouth; i++) {
          let date_item = {
            date: `${year}/${mouth}/${i}`,
            desc: `${i}`,
            status: 1,
            chosen: false
          }
          dayList.push(date_item)
        }
        let firstDay_in_week = dateTools.whatDayIsItToday(year, mouth, 1)
        // 没有找到很好的v-for遍历的方法所以需要在dayList中填充一个冗余的对象
        for (let j = 1; j < firstDay_in_week; j++) {
          dayList.unshift({
            date: "0/0/0",
            desc: "辅助时间",
            status: 0,
            chosen: false
          })
        }
        return dayList
      },
      getMouthList() {
        let mouthList = []
        for (let i = 1; i <= 12; i++) {
          mouthList.push(`${this.curYear}年${i}月`)
        }
        return mouthList
      },
      initDayListInYear() {
        // 需要根据已选择的时间，进行回显， 特别是在更换年份的时候
        this.dayListInYear = {}
        let map = {}
        for (let m = 1; m <= 12; m++) {
          map[m] = this.getDayListByMouth(m)
        }
        this.dayListInYear = map
      },
      clickDay(item) {
        // console.log("item = ", item)
        item.chosen = !item.chosen
        // 存日期的string 还是存定义的day对象 ？

        // 在已选择的列表中找
        // 找到且原状态选中 删除该记录 
        // 没找到 加入该记录
        let time = item.date
        let index = this.nowChooseNameList.indexOf(time)
        if (item.chosen) {
          if (index = -1) {
            this.nowChooseNameList.push(time)
          }
        } else {
          if (index > -1) {
            this.nowChooseNameList.splice(index, 1)
          }
        }
        // console.log("this.nowChooseNameList = ", this.nowChooseNameList)
        
        let curYear = this.curYear
        if (!this.nowChooseDayMap[curYear]) {
          this.nowChooseDayMap[curYear] = []
        }
        let dayList = this.nowChooseDayMap[curYear]
        let idx = dayList.indexOf(time)
        if (item.chosen) {
          if (idx = -1) {
            dayList.push(time)
          }
        } else {
          if (idx > -1) {
            dayList.splice(idx, 1)
          }
        }
        console.log("this.nowChooseDayMap = ", this.nowChooseDayMap)

      },
      goLastYear() {
        this.curYear--;
        this.initDayListInYear()
      },
      goNextYear() {
        this.curYear++;
        this.initDayListInYear()
      }
    }

  }
</script>

<style lang="scss" scoped>

$date-m-container_heigth: 220px; // 一个月容器的高度

$date_mouth_box_heigth: 40px;

$date_week_box_height: 30px;
$date_week_box_weight: 30px;

$date_week_day_border: 1px solid #606266;  // 周和日隔开的一像素边框

$date_day_box_height: 30px;
$date_day_box_weight: 30px;

$date_number_box_ratio: 80%; // 日期外部格子占父容器的比例
$date_number_checked_color: green;
$date_number_checked_ratio: 75%; // 选中后显示的圆形背景占父容器的比例

@mixin flexCenter {
    display: flex;
    align-items: center;
    justify-content: center;
}

.date-year {
    padding: 10px 4px;
    height: $date-m-container_heigth;
    width: $date_day_box_weight * 7 * 4 - 40px;
    overflow: auto;
    // border: 1px solid red;
}

.date-m-container {
    display: inline-block;
    margin: 2px 4px 4px 10px;
    height: $date-m-container_heigth;
    width: $date_day_box_weight * 7;
}

  .date-mouth-box {
    display: flex;
    height: 50px;
    width: $date_day_box_height * 7;
    flex-wrap: wrap;
  }
  .date-mouth {
    width: 100%;
    // box-sizing: border-box;
    // border:1px solid #ccc;
    font-size: 16px;
    font-weight: 500;
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    color: #606266;
  }

  .date-week-box{
    box-sizing: border-box;
    // border:1px solid red;
    height: $date_week_box_height;
    text-align: center;
    @include flexCenter;
    width: calc(1/7*100%);
  }
  .date-weeks-container {
    position: relative;
    width: 100%;
    height: 30px;
    @include flexCenter;
    margin-bottom: 2px; 
    // width: calc(1/7*100%);
  }
  .date-weeks-container::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 4%;
    width: 184%;
    height: 200%;
    border-bottom:  $date_week_day_border; //1px solid#c0c4cc;
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    pointer-events: none;
  }

  .date-day-box {
    box-sizing: border-box;
    // border:1px solid #ccc;
    height: $date_day_box_height;
    text-align: center;
    @include flexCenter;
    width: calc(1/7*100%);
  }
  .day-number-container {
    height: $date_number_box_ratio;
    width: $date_number_box_ratio;
    @include flexCenter;
    cursor: pointer;
  }
  .day-number-container--checked {
    height: $date_number_checked_ratio;
    width: $date_number_checked_ratio;
    border-radius: 100%;
    box-sizing: border-box;
    // border:1px solid #ccc;
    background-color: $date_number_checked_color; // #4094ff;
    color: #fff;
    @include flexCenter;
    cursor: pointer;
  }
  .day-number {
    font-size: 14px;
    user-select: none;
  }


  .date-top-box {
    @include flexCenter;
    height: 30px;
    width: 80%;
    margin: 10px auto;
  }
  .op-last-year, .op-next-year {
    margin-left: 10px;
    margin-right: 10px;
  }
  .year-title {
    width: 120px;
  }
</style>
