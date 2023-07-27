<!--
--  Name:   index
--  Date:   2023/7/17
--  Author: edy
--  Vue Version: 3.x
-->
<template>
  <t-dialog v-model:visible="formVisible" destroyOnClose header="锁定屏幕" :width="500">
    <template #body>
      <div class="p-4">
        <div class="flex-col aic">
          <t-avatar
            size="100px"
            :image="user.userInfo.avatar || 'https://wework.qpic.cn/wwpic/771975_pTCAvI-3QLKRE3a_1657501203/0'"
          />
          <span class="mv-10">{{ user.userInfo.name }}</span>
        </div>
        <!-- 表单内容 -->
        <t-form ref="form" :data="formData" :rules="rules" :label-width="80" @submit="onSubmit">
          <t-form-item label="锁屏密码" name="lockPass">
            <t-input
              type="password"
              v-model="formData.lockPass"
              :style="{ width: '400px' }"
              placeholder="请输入锁屏密码"
            />
          </t-form-item>
        </t-form>
      </div>
    </template>
    <template #footer>
      <t-button block theme="primary" @click="form.submit()">锁定</t-button>
    </template>
  </t-dialog>
</template>
<script lang="ts" setup>
import { FormRule } from 'tdesign-vue-next';
import { ref, watch } from 'vue';

import { useLockStore, useUserStore } from '@/store';

const user = useUserStore();
const lockStore = useLockStore();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const rules: Record<string, FormRule[]> = {
  lockPass: [{ required: true, message: '请输入锁屏密码', type: 'error' }],
};

const form = ref(null);
const formVisible = ref(false);
const formData = ref({ lockPass: '' });

const emit = defineEmits(['update:visible']);
watch(
  () => formVisible.value,
  (val) => {
    formData.value.lockPass = '';
    emit('update:visible', val);
  },
);
watch(
  () => props.visible,
  (val) => {
    formVisible.value = val;
  },
);

const onSubmit = ({ validateResult }: { validateResult: any }) => {
  if (validateResult === true) {
    lockStore.setLockInfo({
      isLock: true,
      pwd: formData.value.lockPass,
    });
    formVisible.value = false;
  }
};
</script>
<style scoped lang="less"></style>
