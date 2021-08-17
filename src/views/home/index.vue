<template>
  <div>
    <h2>我是首页</h2>
    <Button type="danger">点击</Button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue';
export default defineComponent({
  name: "Home",
  components: {
    Button
  },
})
</script>

<style scoped>

</style>
