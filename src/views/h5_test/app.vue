<template lang="pug">
#home_test
  h2 我是首页首页
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'home',
  components: {},
  setup() {
    const state = reactive({
      data: {}
    });
    return {
      state
    };
  }
});
</script>
<style lang="less">
#home_test {
  h2 {
    font-size: 14px;
  }
}
</style>
