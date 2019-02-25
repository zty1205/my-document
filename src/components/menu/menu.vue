<template>
  <div class="g-page-wrapper">
    <div class="head-box">
      <h3>项目已存在菜单{{routes.length}}个</h3>
      <el-input class="g-el-input-375" v-model="name" @input="searchRoute" placeholder="输入菜单名或路径搜索"></el-input>
    </div>
    <ul>
      <li v-for="(item, index) in nowRoutes" :key="index">
        <router-link :to="item.path"><el-tag size="medium">{{item.title}}</el-tag></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { routes } from "@/router"

export default {
  data() {
    return {
      name: '',
      nowRoutes: [],
      routes: routes.slice(0, routes.length - 1),
    }
  },
  computed: {
    // $r() {
    //   return [...routes.options.routes]
    // },
    // routes() {
    //   return this.$r.slice(0, this.$r.length - 1)
    // }
  },
  created () {
    console.log("created")
    this.searchRoute()
  },
  methods: {
    searchRoute (val) {
      if (val) {
        this.nowRoutes = []
        for (let item of routes) {
          if (item.title.indexOf(val) !== -1 || item.path.indexOf(val) !== -1) {
            this.nowRoutes.push(item)
          }
        }
      } else {
        this.nowRoutes = routes
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .head-box{
    text-align: center;
  }
  ul {
    padding: 20px 50px;
  }
  li {
    display: inline-block;
    padding-right: 50px;
    line-height: 40px;
    /*width: 20%;*/
  }
</style>
