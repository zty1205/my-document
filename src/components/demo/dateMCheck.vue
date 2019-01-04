<template>
  <div>

    <h3>日多选选择器</h3>
    <div class="date-top-box">
      <div class="op-last-year">
        <el-button type="primary" icon="el-icon-d-arrow-left" :disabled="curYear < minYear + 1" @click="goLastYear"></el-button>
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
              
              <div v-for="(item, index) in dayListInYear[m]" class="date-day-box" :key="index">
                  <div :class="[item.chosen && item.status ? 'day-number-container--checked' : 'day-number-container', (item.timeStamp < new Date().getTime() && item.status) ? 'day-number-container--disabled' : '']"  @click="clickDay(item)">
                     <!-- <div :class="item | classFilter"  @click="clickDay(item)"> -->
                      <span class="day-number" v-if="item.status">{{ item.day }}</span>
                      <span v-else></span>
                  </div>
              </div>
          </div>
      </div>
    </div>

    <div class="quick-time-container">
      <div class="quick-label">快速添加时间段</div>
      <el-date-picker
        v-model="quickTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <div class="quick-btn-box"> <el-button type='primary' @click="addQuickDate">添加</el-button> </div>
      
    </div>

    <div class="chosen-container">
      <p>已选择了</p>
      <div v-for="(list, key) in nowChooseDayMap" :key="key">
        <div style="display: inline-block">{{ key }}年</div>
        <div style="display: inline-block" v-for="(item, idx) in list" :key="idx">
          --{{ item.localeDateString }}
        </div>
      </div>
    </div>

    <el-row style="margin-top: 20px">
      <el-button type='primary' @click="setDate">点击赋值</el-button>
      <el-button type='primary' @click="setDateItem">item点击赋值</el-button>
      <el-button type='primary' @click="setDates">区间赋值</el-button>
      <el-button type='primary' @click="setDatesItem">item区间赋值</el-button>
      <el-button type='primary' @click="goMouth(7)">点击滚动到7月</el-button>
    </el-row>

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

  const DATE_ITEM_AUXILIARY = { // 辅助时间对象
    localeDateString: "0/0/0", // Date.prototype.toLocaleDateString()
    day: 0, // 天  Date.prototype.getDate()
    mouth: 0, // 月 index  Date.prototype.getMonth() + 1
    year: 0,  // 年 Date.prototype。getFullYear()
    timeStamp: 0, // 时间戳   Date.prototype.getTime()  // 用于比较时间大小
    status: 0, // 0 不可用 1 可用
    chosen: false // 选中
  }

  const MIN_YEAR = 2019 // 年份最小值

  export default {
    name: "DateChoose",
    data() {
      return {
        weekList: ["一", "二", "三", "四", "五", "六", "七"],
        today: "",
        curYear: 0,
        curMouth: 1,
        curTimeStamp: 0,
        dayListInYear: [],
        minYear: MIN_YEAR,
        /**
         * {year: chooseList}
         * {
         *  2018: [],
         *  2019: []
         * }
         */
        nowChooseDayMap: {},
        quickTime: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        }
      }
    },
    filters: { // 渲染较慢
      classFilter: (item) => {
        let curTimeStamp = new Date().getTime()
        console.log("this = ", this)
        // let curTimeStamp = this.curTimeStamp
        console.log("item = ", item)
        if(!item) {
          return ""
        } else {
          let cs = ""
          if (item.chosen) {
            cs += "day-number-container--checked"
          } else {
            cs += "day-number-container"
          }
          if (item.status && item.timeStamp < curTimeStamp) {
            cs += " day-number-container--disabled"
          }
          console.log("cs = ", cs)
          return cs;
        }
      }
    },
    created() {
      this.initNow()
    },
    mounted() {
      this.initDayListInYear()
      let s = new Set()
      s.add(this.weekList)
      s.add(this.weekList)
      console.log("s = ", s)
    },
    methods: {
      initNow() {
        let cur = new Date()
        this.curYear = cur.getFullYear()
        this.curMouth = cur.getMonth()
        this.curTimeStamp = cur.getTime()
      },
      getDayListByMouth(mouth) {
        let year = this.curYear
        // 一个月多少天
        let days_in_mouth = dateTools.numberOfDaysInMouth(year, mouth)

        let dayList = []
        for (let i = 1; i <= days_in_mouth; i++) {
          let date = `${year}/${mouth}/${i}`
          let date_item = {
            localeDateString: date,
            year: year,
            mouth: mouth - 1,
            day: i,
            timeStamp: new Date(date).getTime(),
            status: 1,
            chosen: false
          }
          dayList.push(date_item)
        }
        let firstDay_in_week = dateTools.whatDayIsItToday(year, mouth, 1)
        // 在dayList中填充一个冗余的,辅助对象，帮助渲染日期前的空日期
        for (let j = 1; j < firstDay_in_week; j++) {
          dayList.unshift(DATE_ITEM_AUXILIARY)
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
        let array = []
        for (let m = 1; m <= 12; m++) {
          array[m - 1] = this.getDayListByMouth(m)
        }
        // this.dayListInYear = array
        let oldChooseItemArray = this.nowChooseDayMap[this.curYear] || []
        console.log("oldChooseItemArray = ", oldChooseItemArray)
        if (oldChooseItemArray.length > 0) {
          // this.dayListInYear = this.setItemsByArray2(array, oldChooseItemArray) // todo
          this.dayListInYear = this.setItemsByOldArray(array, oldChooseItemArray) // todo
        } else {
          this.dayListInYear = array
        }
        
      },
      clickDay(item) {
        if (item.timeStamp < new Date().getTime()) {
          return false
        }
        item.chosen = !item.chosen
        let curYear = this.curYear
        if (!this.nowChooseDayMap[curYear]) {
          this.nowChooseDayMap[curYear] = []
        }
        let dayList = this.nowChooseDayMap[curYear]
        let idx = dayList.findIndex(x => {
          return x.localeDateString === item.localeDateString
        })
        if (item.chosen) {
          if (idx = -1) {
            dayList.push(item)
          }
        } else {
          if (idx > -1) {
            dayList.splice(idx, 1)
          }
        }
      },
      goLastYear() {
        this.curYear--;
        this.initDayListInYear()
      },
      goNextYear() {
        this.curYear++;
        this.initDayListInYear()
      },
      setDate() {
        let array = ["2019/1/1", "2019/2/2"]
        this.setItemsByArray(array)
      },
      setDates() {
        this.setItemsByTimes("2019/2/1", "2019/2/16")
      },
      setDateItem() {
        let arr = [
          {
            localeDateString: "2019/3/1", // Date.prototype.toLocaleDateString()
            day: 1, // 天  Date.prototype.getDate()
            mouth: 2, // 月 index  Date.prototype.getMonth() + 1
            year: 2019,  // 年 Date.prototype。getFullYear()
            timeStamp: 1551369600000, // 时间戳   Date.prototype.getTime()  // 用于比较时间大小
            status: 1, // 0 不可用 1 可用
            chosen: false // 选中
          },
          {
            localeDateString: "2019/3/11", // Date.prototype.toLocaleDateString()
            day: 11, // 天  Date.prototype.getDate()
            mouth: 2, // 月 index  Date.prototype.getMonth() + 1
            year: 2019,  // 年 Date.prototype。getFullYear()
            timeStamp: 1552233600000, // 时间戳   Date.prototype.getTime()  // 用于比较时间大小
            status: 1, // 0 不可用 1 可用
            chosen: false // 选中
          }
        ]
        this.setItemsByItemArray(arr)
      },
      setDatesItem() {
        let arr = [
          {
            localeDateString: "2019/3/1", // Date.prototype.toLocaleDateString()
            day: 1, // 天  Date.prototype.getDate()
            mouth: 2, // 月 index  Date.prototype.getMonth() + 1
            year: 2019,  // 年 Date.prototype。getFullYear()
            timeStamp: 1551369600000, // 时间戳   Date.prototype.getTime()  // 用于比较时间大小
            status: 1, // 0 不可用 1 可用
            chosen: false // 选中
          },
          {
            localeDateString: "2019/3/11", // Date.prototype.toLocaleDateString()
            day: 11, // 天  Date.prototype.getDate()
            mouth: 2, // 月 index  Date.prototype.getMonth() + 1
            year: 2019,  // 年 Date.prototype。getFullYear()
            timeStamp: 1552233600000, // 时间戳   Date.prototype.getTime()  // 用于比较时间大小
            status: 1, // 0 不可用 1 可用
            chosen: false // 选中
          }
        ]
        this.setItemsByItemTimes(arr[0], arr[1])
      },
      setItemsByItemArray(array) {
        array.forEach(x => {
          let year = x.year
          let mouth = x.mouth
          let date = x.localeDateString // "2019/1/1"
          let item = this.dayListInYear[mouth].find(ele => {
            return ele.localeDateString === x.localeDateString
          })
          console.log("item = ", item)
          if (item) {
            item.chosen = true
            if (!this.nowChooseDayMap[year]) {
              this.nowChooseDayMap[year] = []
            } else {
              this.nowChooseDayMap[year].push(item)
            }
          }
        })
      },
      setItemsByArray(array = []) {
        array.forEach(x => {
          let time = new Date(x)
          let year = time.getFullYear()
          let mouth = time.getMonth()
          let localeDateString = time.toLocaleDateString() // "2019/1/1"
          let item = this.dayListInYear[mouth].find(ele => {
            return ele.localeDateString === localeDateString
          })
          console.log("item = ", item)
          if (item) {
            item.chosen = true
            if (!this.nowChooseDayMap[item.year]) {
              this.nowChooseDayMap[year] = []
            } else {
              this.nowChooseDayMap[year].push(item)
            }
          }
        })
      },
      setItemsByOldArray(targetList, array = []) {
        console.log("targetList = ", targetList)
        console.log("array = ", array)
        array.forEach(x => {
          let year = x.year
          let mouth = x.mouth
          let localeDateString = x.localeDateString // "2019/1/1"
          let item = targetList[mouth].find(ele => {
            return ele.localeDateString === localeDateString
          })
          console.log("item = ", item)
          if (item) {
            item.chosen = true
            // 仍然要判断是
            this.nowChooseDayMap[year] = this.nowChooseDayMap[year] || []
            let dayList = this.nowChooseDayMap[year]
            let idx = dayList.findIndex(ele => {
              return ele.localeDateString === item.localeDateString
            })
            if (idx === -1) {
              dayList.push(item)
            }
          }
        })
        return targetList
      },
      setItemsByTimes(start, end) {
        console.log("11")
        let mouth = new Date(start).getMonth()
        let list = this.dayListInYear[mouth]
        this.nowChooseDayMap[this.curYear] = this.nowChooseDayMap[this.curYear] || []
        let choose = this.nowChooseDayMap[this.curYear]
        let s = new Date(start).getTime()
        let e = new Date(end).getTime()
        list.forEach(x => {
          let t = x.timeStamp
          if (t >= s && t <= e) {
            x.chosen = true
            choose.push(x)
          }
        })
      },
      setItemsByItemTimes(startItem, endItem) {
        let mouth = startItem.mouth
        let list = this.dayListInYear[mouth]
        this.nowChooseDayMap[this.curYear] = this.nowChooseDayMap[this.curYear] || []
        let choose = this.nowChooseDayMap[this.curYear]
        let s = startItem.timeStamp
        let e = endItem.timeStamp
        list.forEach(x => {
          let t = x.timeStamp
          if (t >= s && t <= e) {
            x.chosen = true
            choose.push(x)
          }
        })
      },
      setItemsByTimes2(array) {
        let start = array[0] || ""
        let end = array[1] || ""
        let mouth = start.getMonth()
        let list = this.dayListInYear[mouth]
        this.nowChooseDayMap[this.curYear] = this.nowChooseDayMap[this.curYear] || []
        let choose = this.nowChooseDayMap[this.curYear]
        let s = start.getTime()
        let e = end.getTime()
        list.forEach(x => {
          let t = x.timeStamp
          if (t >= s && t <= e) {
            x.chosen = true
            choose.push(x)
          }
        })
      },
      goMouth(m = 1) {
        let dom = document.querySelector(".date-year")
        let mult = (m - 3) > 0 ? Math.ceil((m/3 - 1)) : 0
        dom.scrollTo(0, mult * 220)
      },
      addQuickDate() {
        let times = this.quickTime
        if (times.length < 2) {
          this.$message({
            type: 'error',
            message: '请选择时间!',
            duration: 1200
          });
          return false;
        }
        console.log("this quickTime = ", this.quickTime)
        // this.setItemsByTimes2(times)
        this.setItemsByDateRange(times)
      },
      setByStampToMouth(startStamp, mouth) {
        let days = dateTools.numberOfDaysInMouth(this.curYear, mouth)
        let eTime = `${this.curYear}/${mouth}/${days}`
        let endStamp = new Date(eTime).getTime()
        let list = this.dayListInYear[mouth - 1]
        this.nowChooseDayMap[this.curYear] = this.nowChooseDayMap[this.curYear] || []
        let choose = this.nowChooseDayMap[this.curYear]
        list.forEach(x => {
          let t = x.timeStamp
          if (t >= startStamp && t <= endStamp) {
            x.chosen = true
            choose.push(x)
          }
        })
      },
      setByMouthToStamp(mouth, endStamp) {
        let sTime = `${this.curYear}/${mouth}/1`
        let startStamp = new Date(sTime).getTime()
        let list = this.dayListInYear[mouth - 1]
        this.nowChooseDayMap[this.curYear] = this.nowChooseDayMap[this.curYear] || []
        let choose = this.nowChooseDayMap[this.curYear]
        list.forEach(x => {
          let t = x.timeStamp
          if (t >= startStamp && t <= endStamp) {
            x.chosen = true
            choose.push(x)
          }
        })
      },
      setAllMouth(mouth) {
        let list = this.dayListInYear[mouth]
        this.nowChooseDayMap[this.curYear] = this.nowChooseDayMap[this.curYear] || []
        let choose = this.nowChooseDayMap[this.curYear]
        list.forEach(x => {
          x.chosen = true
          choose.push(x)
        })
      },
      setItemsByDateRange(array) {
        console.log("ininin")
        let startDate = array[0]
        let endDate = array[1]
        let startMouth = startDate.getMonth()
        let endMouth = endDate.getMonth()
        let s = startDate.getTime()
        let e = endDate.getTime()
        if (startMouth === endMouth) {
          let list = this.dayListInYear[startMouth]
          this.nowChooseDayMap[this.curYear] = this.nowChooseDayMap[this.curYear] || []
          let choose = this.nowChooseDayMap[this.curYear]
          list.forEach(x => {
            let t = x.timeStamp
            if (t >= s && t <= e) {
              x.chosen = true
              choose.push(x)
            }
          })
        } else {
          for(let m = startMouth; m <= endMouth; m++) {
            if (m === startMouth) {
              this.setByStampToMouth(s, m + 1)
            } else if (m === endMouth) {
              this.setByMouthToStamp(m + 1, e)
            } else {
              this.setAllMouth(m)
            }
          }
        }
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
  .day-number-container--disabled {
    background-color: #f5f7fa;
    opacity: 1;
    cursor: not-allowed;
    color: #c0c4cc;
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

  .quick-time-container {
    text-align: left;
    padding: 10px;

    .quick-label {
      margin-bottom: 10px;
    }
    .quick-btn-box {
      display: inline-block;
      margin-left: 4px;
    }
  }
</style>
