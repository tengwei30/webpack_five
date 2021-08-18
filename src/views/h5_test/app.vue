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
<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
