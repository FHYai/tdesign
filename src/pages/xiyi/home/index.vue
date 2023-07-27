<!--
--  Name:   index
--  Date:   2023/7/17
--  Author: edy
--  Vue Version: 3.x
-->
<template>
  <div>物鱼首</div>
  <t-button v-auth="[666]">aa</t-button>
  <t-button v-auth="['22']">22</t-button>
</template>
<script lang="ts" setup>
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted } from 'vue';

onMounted(() => {
  // MessagePlugin.success({ content: '用户表示操作顺利达成', duration: 10000 });
});
</script>
<style scoped lang="less"></style>
