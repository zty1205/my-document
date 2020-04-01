<template>
  <div>
    <div class="box box-0">
      <div>
        <div class="item" v-for="(char, index) in list" :key="index">
          {{ char }}
        </div>
      </div>
      <div class="left arrow">
        <div class="el-icon-top icon"></div>
        <div>left</div>
      </div>
      <div class="right arrow">
        <i class="el-icon-top icon"></i>
        <div>right</div>
      </div>
      <div class="desc">
        <div>初始状态</div>
        <div>left = 0; right = 0</div>
        <div>map = { }</div>
        <div>maxL = -1</div>
      </div>
    </div>

    <div class="box box-1">
      <div>
        <div class="item" v-for="(char, index) in list" :key="index">
          {{ char }}
        </div>
      </div>
      <div class="left arrow">
        <div class="el-icon-top icon"></div>
        <div>left</div>
      </div>
      <div class="right arrow">
        <i class="el-icon-top icon"></i>
        <div>right</div>
      </div>
      <div class="desc">
        <div>第一次循环结束</div>
        <div>left = 0; right = 1</div>
        <div>map = { p: 0 }</div>
        <div>maxL = -1</div>
      </div>
    </div>

    <div class="box box-2">
      <div>
        <div class="item" v-for="(char, index) in list" :key="index">
          {{ char }}
        </div>
      </div>
      <div class="left arrow">
        <div class="el-icon-top icon"></div>
        <div>left</div>
      </div>
      <div class="right arrow">
        <i class="el-icon-top icon"></i>
        <div>right</div>
      </div>
      <div class="desc">
        <div>第二次循环结束</div>
        <div>left = 0; right = 2</div>
        <div>map = { p: 0, w: 1 }</div>
        <div>maxL = -1</div>
      </div>
    </div>

    <div class="box box-3">
      <div>
        <div class="item" v-for="(char, index) in list" :key="index">
          {{ char }}
        </div>
      </div>
      <div class="left arrow">
        <div class="el-icon-top icon"></div>
        <div>left</div>
      </div>
      <div class="right arrow">
        <i class="el-icon-top icon"></i>
        <div>right</div>
      </div>
      <div class="desc">
        <div>第三次循环结束</div>
        <div>left = 2; right = 2</div>
        <div>map = { p: 0, w: 1 }</div>
        <div>maxL = 2</div>
      </div>
    </div>

    <div class="box box-4">
      <div>
        <div class="item" v-for="(char, index) in list" :key="index">
          {{ char }}
        </div>
      </div>
      <div class="left arrow">
        <div class="el-icon-top icon"></div>
        <div>left</div>
      </div>
      <div class="right arrow">
        <i class="el-icon-top icon"></i>
        <div>right</div>
      </div>
      <div class="desc">
        <div>第四次循环结束</div>
        <div>left = 2; right = 3</div>
        <div>map = { p: 0, w: 2 }</div>
        <div>maxL = 2</div>
      </div>
    </div>

    <div class="box box-5">
      <div>
        <div class="item" v-for="(char, index) in list" :key="index">
          {{ char }}
        </div>
      </div>
      <div class="left arrow">
        <div class="el-icon-top icon"></div>
        <div>left</div>
      </div>
      <div class="right arrow">
        <i class="el-icon-top icon"></i>
        <div>right</div>
      </div>
      <div class="desc">
        <div>第五次循环结束</div>
        <div>left = 2; right = 4</div>
        <div>map = { p: 0, w: 2, k: 3 }</div>
        <div>maxL = 2</div>
      </div>
    </div>

    <div class="box box-6">
      <div>
        <div class="item" v-for="(char, index) in list" :key="index">
          {{ char }}
        </div>
      </div>
      <div class="left arrow">
        <div class="el-icon-top icon"></div>
        <div>left</div>
      </div>
      <div class="right arrow">
        <i class="el-icon-top icon"></i>
        <div>right</div>
      </div>
      <div class="desc">
        <div>第六次循环结束</div>
        <div>left = 2; right = 5</div>
        <div>map = { p: 0, w: 2, k: 3, e: 4 }</div>
        <div>maxL = 2</div>
      </div>
    </div>

    <div class="box box-7">
      <div>
        <div class="item" v-for="(char, index) in list" :key="index">
          {{ char }}
        </div>
      </div>
      <div class="left arrow">
        <div class="el-icon-top icon"></div>
        <div>left</div>
      </div>
      <div class="right arrow">
        <i class="el-icon-top icon"></i>
        <div>right</div>
      </div>
      <div class="desc">
        <div>第七次循环结束</div>
        <div>left = 3; right = 5</div>
        <div>map = { p: 0, w: 2, k: 3, e: 4 }</div>
        <div>maxL = 3</div>
      </div>
    </div>

    <div class="box box-8">
      <div>
        <div class="item" v-for="(char, index) in list" :key="index">
          {{ char }}
        </div>
      </div>
      <div class="left arrow">
        <div class="el-icon-top icon"></div>
        <div>left</div>
      </div>
      <div class="right arrow">
        <i class="el-icon-top icon"></i>
        <div>right</div>
      </div>
      <div class="desc">
        <div>第八次循环结束</div>
        <div>left = 3; right = 6</div>
        <div>map = { p: 0, w: 5, k: 3, e: 4 }</div>
        <div>maxL = 3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lengthOfLongestSubstring',
  data() {
    return {
      list: ["q", "w", "w", "k", "e", "w"]
    };
  }
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 32px;
  font-weight: 300;
}
.box {
  text-align: left;
  margin: 40px;
  position: relative;
}
$size: 40px;
.item {
  text-align: center;
  width: $size;
  height: $size;
  line-height: $size;
  box-sizing: border-box;
  border-top: 1px solid blue;
  border-left: 1px solid blue;
  border-bottom: 1px solid blue;
  display: inline-block;
  font-size: 18px;

  &:last-of-type {
    border-right: 1px solid blue;
  }
}
.arrow {
  position: absolute;
}
.desc {
  font-size: 16px;
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  left: 300px;
}
.box-0 {
  .left {
    left: -8px;
    top: 50px;
  }
  .right {
    left: 16px;
    top: 50px;
  }
}
.box-1 {
  margin-top: 120px;
  .left {
    left: -8px;
    top: 50px;
  }
  .right {
    left: 16px + $size * 1;
    top: 50px;
  }
}
.box-2 {
  margin-top: 120px;
  .left {
    left: -8px;
    top: 50px;
  }
  .right {
    left: 16px + $size * 2;
    top: 50px;
  }
}
.box-3 {
  margin-top: 120px;
  .left {
    left: -8px + $size * 2;
    top: 50px;
  }
  .right {
    left: 16px + $size * 2;
    top: 50px;
  }
}
.box-4 {
  margin-top: 120px;
  .left {
    left: -8px + $size * 2;
    top: 50px;
  }
  .right {
    left: 16px + $size * 3;
    top: 50px;
  }
}
.box-5 {
  margin-top: 120px;
  .left {
    left: -8px + $size * 2;
    top: 50px;
  }
  .right {
    left: 16px + $size * 4;
    top: 50px;
  }
}

.box-6 {
  margin-top: 120px;
  .left {
    left: -8px + $size * 2;
    top: 50px;
  }
  .right {
    left: 16px + $size * 5;
    top: 50px;
  }
}

.box-7 {
  margin-top: 120px;
  .left {
    left: -8px + $size * 3;
    top: 50px;
  }
  .right {
    left: 16px + $size * 5;
    top: 50px;
  }
}

.box-8 {
  margin-top: 120px;
  margin-bottom: 120px;
  .left {
    left: -8px + $size * 3;
    top: 50px;
  }
  .right {
    left: 16px + $size * 6;
    top: 50px;
  }
}
</style>
