<template>
    <el-container style="border: 1px solid #eee; height: 100%;">

        <el-header class="zty-fixed-header">
            <el-row :gutter="20">
                <el-col :span="8" class="border-red">
                    <el-row :gutter="10">
                        <el-col :span="6" class="border-black">
                            <div class="header-icon">RZty</div>
                        </el-col>
                        <el-col :span="18" class="border-black">
                            <el-input v-model="menuItemName" class="search-input-large"  placeholder="请输入菜单名" suffix-icon="el-icon-search"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="16" class="border-red">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">处理中心</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">模板菜单</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3">消息中心</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
    
        <el-main>
            <el-table :data="tableData">
                <el-table-column prop="date" label="日期" width="140">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
            </el-table>
        </el-main>

    </el-container>
</template>

export default {
    name: "menu",
}

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(30).fill(item),
      menuItemName: null
    };
  }
};
</script>

<style scoped lang="scss">
 .zty-fixed-header {
    position: fixed;
    width: 100%;
    height: 80px;
    top: 0;
    left: 0;
    z-index: 2018 !important;
 }
 .zty-fix-aside {
    background-color: #f2f6fc;
    position: fixed;
    top: 80px;
    left: 0;
    z-index: 2018 !important;
 }
 .border-red {
    border: 1px solid red;
 }
 .border-black {
    border: 1px solid black;
 }
 .search-input-large {
     width: 300px;
 }
 .header-icon {
    font-family: "font-family";
    font-size: 20px;
}
</style>