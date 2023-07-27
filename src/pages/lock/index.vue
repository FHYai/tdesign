<!--
--  Name:   index
--  Date:   2023/7/24
--  Author: edy
--  Vue Version: 3.x
-->
<template>
  <transition name="fade-bottom" mode="out-in">
    <lock-page v-if="getIsLock" />
  </transition>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import LockPage from '@/pages/lock/lockPage.vue';
import { useLockStore } from '@/store';

const lockStore = useLockStore();
const getIsLock = computed(() => lockStore?.getLockInfo?.isLock ?? false);
</script>
