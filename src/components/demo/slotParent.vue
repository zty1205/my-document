<template>
    <div>
        <div class="parent">
            <slot-son :toEmailVisible="visible" @close="visible = false" @save="sonSave">
                <div solt="timer">
                    <!-- <el-form-item></el-form-item> -->
                    <div>111</div>
                </div>
            </slot-son>
        </div>
        <div>
            <el-button type="primary" @click="visible = !visible">点击</el-button>
        </div>
    </div>
</template>

<script>
import slotSon from "./slotSon.vue"
export default {
    name: "slotParent",
    components: {
        slotSon,
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        sonSave(value) {
            console.log("value = ", value)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
