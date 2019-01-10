
export default dateUtils = {

    ONE_DAY_TIMESTAMP: 8.64e7,

     /**
      * 当前是星期几
      * @param year
      * @param mouth
      * @param day
      * @returns {*|number} 1 - 7
      */
    whatDayIsItToday: (year, mouth, day) => {
        if (year && mouth && day) {
            let m = mouth < 13 ? mouth : (mouth % 12)
            return new Date(`${year}/${m}/${day}`).getDate() || 7 // 美国星期天为第一天
        }
        return false
    },

     /**
      * 一个月有多少天
      * @param year
      * @param mouth
      * @returns {*|string}
      */
     numberOfDaysInMouth: (year, mouth) => {
        if (year && mouth) {
            let m = mouth < 13 ? mouth : (mouth % 12)
            let date = new Date(`${year}/${m}/1`)
            date.setMonth(date.getMonth() + 1)
            date.setDate(0)
            return date.getDate()
        }
        return false
     },

     /**
      * 格式化时间
      * @param time
      * @param fmt
      * @returns {*|string}
      */
     formatTime: (time, fmt = "yyyy-MM-dd hh:mm:ss") => {
        if (time) {
            fmt = fmt || "yyyy-MM-dd hh:mm:ss";
            let t = new Date(time);
            let obj = {
                "M+": t.getMonth() + 1, // 月份
                "d+": t.getDate(), // 日
                "h+": t.getHours(), // 小时
                "m+": t.getMinutes(), // 分
                "s+": t.getSeconds(), // 秒
                "q+": Math.floor((t.getMonth() + 3) / 3), // 季度
                "S": t.getMilliseconds() // 毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in obj) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[k]) : (("00" + obj[k]).substr(("" + obj[k]).length)));
            }
            return fmt;
        }
        return false
    }

}