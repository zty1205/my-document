"use strict"

const dateTools = {
    // 获取一个月有几天

    // 当天是星期几

      /**
   * 格式化时间戳为日期
   * @param time
   * @param fmt
   * @returns {*|string}
   */
  formatTime: function (timeStr, fmt) {
    if (!timeStr) {
      return "";
    }
    fmt = fmt || "yyyy-MM-dd hh:mm:ss";
    let time = {};
    if (Object.prototype.toString.call(timeStr) !== "[object Date]") {
      time = /^\d*$/.test(timeStr) ? new Date(parseInt(timeStr)) : this.parseDate(timeStr);
    } else {
      time = timeStr;
    }
    let o = {
      "M+": time.getMonth() + 1, // 月份
      "d+": time.getDate(), // 日
      "h+": time.getHours(), // 小时
      "m+": time.getMinutes(), // 分
      "s+": time.getSeconds(), // 秒
      "q+": Math.floor((time.getMonth() + 3) / 3), // 季度
      "S": time.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
  },

  numberOfDaysInMouth: function (year, mouth, day = 1) { // 获取一个月有几天
    let dateString = `${year}/${mouth}/${day}`
    let date = new Date(dateString)
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    return date.getDate()
  },
  
  whatDayIsItToday: function (year, mouth = 1, day = 1) { // 获取某一是星期几
    let dateString = `${year}/${mouth}/${day}`
    let date = new Date(dateString)
    let w = date.getDay();
    if(w === 0 || w === "0") { // 美国星期天是第一天 index = 0
      w = 7
    }
    return w;
  }
}

export default dateTools;