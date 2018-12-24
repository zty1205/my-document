<template>
  <div>
    <div>111</div>
    <div class="dates" v-if="false">
      <div v-for="date in dayList" class="item"
           :class="[{
            today: date.status ? (today == date.date) : false,
            event: date.status ? (date.title != undefined) : false
          }, ...date.customClass]"
           :key="date.date"
      >
        <p class="date-num"
           @click="handleChangeCurday(date)"
           :style="{color: date.title != undefined ? ((date.date == selectedDay) ? '#fff' : customColor) : 'inherit'}">
          {{date.status ? date.date.split('/')[2] : '&nbsp;'}}</p>
        <span v-if="date.status ? (today == date.date) : false" class="is-today" :style="{backgroundColor: customColor }" ></span>
        <span v-if="date.status ? (date.title != undefined) : false" class="is-event"
              :style="{borderColor: customColor, backgroundColor: (date.date == selectedDay) ? customColor : 'inherit'}"></span>
      </div>
    </div>
    <!--<h3>日期</h3>-->

    <!--<div class="date-mouth-box">-->
      <!--<div class="date-mouth">2018年12月</div>-->
      <!--<div class="date-week-box" v-for="week in weekList">-->
        <!--<span>{{ week }}</span>-->
      <!--</div>-->
      <!--<div class="date-day-box" v-for="item in dayList">-->
        <!--<span v-if="item.status">{{ item.desc }}</span>-->
        <!--<span v-else></span>-->
      <!--</div>-->
    <!--</div>-->

    <h3>固定的</h3>

    <div class="date-year">
        <div class="date-m-container" v-for="mouth in mouthList" :key="mouth">
            <div class="date-mouth-box">
                <div class="date-mouth">{{ mouth }}</div>
                <div class="date-weeks-container">
                    <div class="date-week-box" v-for="week in weekList" :key="week">
                        <span>{{ week }}</span>
                    </div>
                </div>
                
                <div v-for="item in dayList" class="date-day-box" :key="item.date">
                    <div :class="item.chosen ? 'day-number-container--checked' : 'day-number-container'"  @click="clickDay(item)">
                        <span class="day-number" v-if="item.status">{{ item.desc }}</span>
                        <span v-else></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="date-mouth-box">
      <div class="date-mouth">2018年12月</div>
      <div class="date-week-container">
        <div class="date-week-box" v-for="week in weekList" :key="week">
            <span>{{ week }}</span>
        </div>
      </div>
      
      <div v-for="item in dayList" class="date-day-box" :key="item.date">
        <div :class="item.chosen ? 'day-number-container--checked' : 'day-number-container'"  @click="clickDay(item)">
            <span class="day-number" v-if="item.status">{{ item.desc }}</span>
            <span v-else></span>
        </div>
        
      </div>
    </div>

    <div @click="showDay">查看</div>
    <div @click="onShow">选中</div> -->

    <h3>生成的</h3>
    <p>变量没有绑定在vue上，观察不到变化，所以不会变色</p>

    <div class="date-year">
      <div class="date-m-container" v-for="(mouth, m) in getMouthList()" :key="mouth">
          <div class="date-mouth-box">
              <div class="date-mouth">{{ mouth }}</div>
              <div class="date-weeks-container">
                  <div class="date-week-box" v-for="week in weekList" :key="week">
                      <span>{{ week }}</span>
                  </div>
              </div>
              
              <div v-for="(item, index) in getDayListByMouth(m+1)" class="date-day-box" :key="index">
                  <div :class="item.chosen ? 'day-number-container--checked' : 'day-number-container'"  @click="clickDay(item)">
                      <span class="day-number" v-if="item.status">{{ item.desc }}</span>
                      <span v-else></span>
                  </div>
              </div>
          </div>
      </div>
    </div>

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

  </div>
</template>

<script>
  const date3 = [{date: "2018/11/26", status: 0, chosen: false},
    {date: "2018/11/27", desc: "27", status: 0, chosen: false},
    {date: "2018/11/28", desc: "28", status: 0, chosen: false},
    {date: "2018/11/29", desc: "29", status: 0, chosen: false},
    {date: "2018/11/30", desc: "30", status: 0, chosen: false},
    {date: "2018/12/1", desc: "1", status: 1, chosen: false},
    {date: "2018/12/2", desc: "2", status: 1, chosen: false},
    {date: "2018/12/3", desc: "3", status: 1, chosen: false},
    {date: "2018/12/4", desc: "4", status: 1, chosen: false},
    {date: "2018/12/5", desc: "5", status: 1, chosen: false},
    {date: "2018/12/6", desc: "6", status: 1, chosen: false},
    {date: "2018/12/7", desc: "7", status: 1, chosen: false},
    {date: "2018/12/8", desc: "8", status: 1, chosen: false},
    {date: "2018/12/9", desc: "9", status: 1, chosen: false},
    {date: "2018/12/10", desc: "10", status: 1, chosen: false},
    {date: "2018/12/11", desc: "11", status: 1, chosen: false},
    {date: "2018/12/12", desc: "12", status: 1, chosen: false},
    {date: "2018/12/13", desc: "13", status: 1, chosen: false},
    {date: "2018/12/14", desc: "14", status: 1, chosen: false},
    {date: "2018/12/15", desc: "15", status: 1, chosen: false},
    {date: "2018/12/16", desc: "16", status: 1, chosen: false},
    {date: "2018/12/17", desc: "17", status: 1, chosen: false},
    {date: "2018/12/18", desc: "18", status: 1, chosen: false},
    {date: "2018/12/19", desc: "19", status: 1, chosen: false},
    {date: "2018/12/20", desc: "20", status: 1, chosen: false},
    {date: "2018/12/21", desc: "21", status: 1, chosen: false},
    {date: "2018/12/22", desc: "22", status: 1, chosen: false},
    {date: "2018/12/23", desc: "23", status: 1, chosen: false},
    {date: "2018/12/24", desc: "24", status: 1, chosen: false},
    {date: "2018/12/25", desc: "25", status: 1, chosen: false},
    {date: "2018/12/26", desc: "26", status: 1, chosen: false},
    {date: "2018/12/27", desc: "27", status: 1, chosen: false},
    {date: "2018/12/28", desc: "28", status: 1, chosen: false},
    {date: "2018/12/29", desc: "29", status: 1, chosen: false},
    {date: "2018/12/30", desc: "30", status: 1, chosen: false},
    {date: "2018/12/31", desc: "31", status: 1, chosen: false},
    {date: "2019/1/1", desc: "1", status: 0, chosen: false},
    {date: "2019/1/2", desc: "2", status: 0, chosen: false},
    {date: "2019/1/3", desc: "3", status: 0, chosen: false},
    {date: "2019/1/4", desc: "4", status: 0, chosen: false},
    {date: "2019/1/5", desc: "5", status: 0, chosen: false},
    {date: "2019/1/6", desc: "6", status: 0, chosen: false}]

    function getDaysInMouth(year, mouth, day = 1) { // 获取一个月有几天
      let dateString = `${year}/${mouth}/${day}`
      let date = new Date(dateString)
      date.setMonth(date.getMonth() + 1)
      date.setDate(0)
      return date.getDate()
    }
    function getDaysInWeek(year, mouth = 1, day = 1) { // 获取某一是星期几
      let dateString = `${year}/${mouth}/${day}`
      let date = new Date(dateString)
      let w = date.getDay();
      if(w === 0 || w === "0") { // 美国星期天是第一天 index = 0
        w = 7
      }
      return w;
    }
  export default {
    name: "DateChoose",
    data() {
      return {
        dayList: date3,
        weekList: ["一", "二", "三", "四", "五", "六", "七"],
        customColor: "blue",
        today: "",
        curYear: 0,
        curMouth: 1,
        mouthList: ["2018/1", "2018/2", "2018/3", "2018/4", "2018/5", "2018/6", 
        "2018/7", "2018/8", "2018/9", "2018/10", "2018/11", "2018/12"],
        dayListInYear: {}
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
        // getDay 得到星期几
        let days_in_mouth = getDaysInMouth(year, mouth)

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
        let firstDay_in_week = getDaysInWeek(year, mouth, day)
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
        // getDay 得到星期几
        let days_in_mouth = getDaysInMouth(year, mouth)

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
        let firstDay_in_week = getDaysInWeek(year, mouth, day)
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
        this.dayListInYear = {}
        let map = {}
        for (let m = 1; m <= 12; m++) {
          map[m] = this.getDayListByMouth(m)
        }
        this.dayListInYear = map
      },
      handleChangeCurday() {

      },
      showDay() {
        console.log("dayList = ", this.dayList)
      },
      clickDay(item) {
        console.log("item = ", item)
        item.chosen = !item.chosen
      },
      onShow() {
          let dayChosen = this.dayList.filter((x) => x.chosen)
          console.log("dayChosen = ", dayChosen)
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
    border: 1px solid red;
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
