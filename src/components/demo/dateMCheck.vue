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

    <h3>日期</h3>

    <div class="date-year">
        <div class="date-m-container" v-for="mouth in mouthList" :key="mouth">
            <div class="date-mouth-box">
            <div class="date-mouth">{{ mouth }}</div>
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
        </div>
        <!-- <div class="date-m-container">
            <div class="date-mouth-box">
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
        </div> -->
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
  export default {
    name: "DateChoose",
    data() {
      return {
        dayList: date3,
        weekList: ["一", "二", "三", "四", "五", "六", "七"],
        customColor: "blue",
        today: new Date(),
        mouthList: ["2018/1", "2018/2", "2018/3", "2018/4", "2018/5", "2018/6", 
        "2018/7", "2018/8", "2018/9", "2018/10", "2018/11", "2018/12"]
      }
    },
    methods: {
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
      }
    }

  }
</script>

<style lang="scss" scoped>
$DATE_DAY_NUMBER_BOX_RADIO: 80%;
$DATE_DAY_BOX_BORDER: 1px solid #ccc;
$date_number_container_height: 40px;

.date-year {
    padding: 15px 10px;
    height: 380px;
    width: 100%;
    overflow: auto;
}

.date-m-container {
    display: inline-block;
    margin: 0 4px;
    height: 100%;
}

.date-num {
  display: inline-block;
  border: 1px solid red;
}
  .date-mouth-box {
    display: flex;
    height: 50px;
    width: 350px;
    flex-wrap: wrap;
  }
  .date-mouth {
    width: 100%;
    box-sizing: border-box;
    // border:1px solid #ccc;
    font-size: 16px;
    font-weight: 500;
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    color: #606266;
  }
  .date-day-box , .date-week-box{
    box-sizing: border-box;
    border:1px solid #ccc;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(1/7*100%);
  }
  .date-week-container {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    // width: calc(1/7*100%);
  }
  .date-week-container::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 4%;
    width: 184%;
    height: 200%;
    border-bottom: 1px solid#c0c4cc;
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    pointer-events: none;
  }
  .date-day-box--checked {
    border-radius: 100% ;
    box-sizing: border-box;
    border:1px solid #ccc;
    height: 100%;
    text-align: center;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(1/7*100%);
    cursor: pointer;

  }
  .day-number-container {
    height: 80%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .day-number-container--checked {
    height: 60%;
    width: 60%;
    border-radius: 60%;
    box-sizing: border-box;
    // border:1px solid #ccc;
    background-color: #4094ff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .day-number {
    // height: 100%;
    // line-height: 100%;
    // text-align: center;
    // vertical-align: middle;
    font-size: 14px;
    user-select: none;
  }
</style>
