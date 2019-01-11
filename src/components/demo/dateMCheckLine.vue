<template>
  <div>

    <h3>横向日期选择</h3>


    <div class="date-year">
      <div v-for="(day, index) in dayListInYear" class="date-day" :key="day.date">
        <div class="day-box">
          <div class="day-number-container">{{ weekMap[(index+1)%7] }}</div>
        </div>
        <div class="day-box">
          <div :class="day.chosen ? 'day-number-container--checked' : 'day-number-container'"  @click="clickDay(day)">
            <span class="day-number" v-if="day.status">{{ day.desc }}</span>
            <span v-else></span>
        </div>
        </div>
        
      </div>
    </div>


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
    name: "DateChooseLine", // 横向的日期多选
    data() {
      return {
        weekList: ["一", "二", "三", "四", "五", "六", "七"],
        weekMap: {
          1: "一",
          2: "二",
          3: "三",
          4: "四",
          5: "五",
          6: "六",
          0: "七"
        },
        today: "",
        curYear: 0,
        curMouth: 1,
        dayListInYear: [],
        nowChooseNameList: [],
        nowChooseDayMap: {},
        nowChooseItemMap: {},
        firstDayInYear: 0
      }
    },
    mounted() {
      this.initNow()
      this.initDayListInYear()
    },
    methods: {
      initNow() {
        let cur = new Date()
        this.today = cur
        this.curYear = cur.getFullYear()
        this.curMouth = cur.getMonth()
        let y = 2016
        let isLeap = (0===y%4) && (0===y%100) || (0===y%400)
        let days = isLeap ? 366 : 365;
        console.log(days);
        this.firstDayInYear = dateTools.whatDayIsItToday(this.curYear, 1, 1)
        console.log("firstDayInYear = ", this.firstDayInYear)
      },
      getDayListByMouth(mouth) {
        let year = this.curYear
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
        return dayList
      },
      initDayListInYear() {
        // 需要根据已选择的时间，进行回显， 特别是在更换年份的时候
        this.dayListInYear = []
        let arr = []
        for (let m = 1; m <= 12; m++) {
          let newArr = this.getDayListByMouth(m)
          arr = arr.concat(newArr)
        }
        this.dayListInYear = arr
        console.log("arr = ", arr)
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
    // padding: 10px 4px;
    // height: $date-m-container_heigth;
    // width: $date_day_box_weight * 7 * 4 - 40px;
    overflow: auto;
    height: 200px;
    white-space: nowrap;
    // border: 1px solid red;
    .date-day {
      width: 50px;
      height: 100px;
      display: inline-block;
      box-sizing: border-box;
      // border: 1px solid red;
    }
}

  .date-mouth-box {
    display: flex;
    height: 50px;
    // width: $date_day_box_height * 7;
    flex-wrap: wrap;
  }

  .day-box {
    height: 50px;
    width: 50px;
    @include flexCenter;
    box-sizing: border-box;
    border:1px solid #ccc;
  }

  .day-number-container {
    height: 30px;
    // width: $date_number_box_ratio;
    @include flexCenter;
    cursor: pointer;
    // box-sizing: border-box;
    // border:1px solid #ccc;
  }
  .day-number-container--checked {
    height: 30px;
    width: 30px;
    border-radius: 100%;
    // box-sizing: border-box;
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

</style>
