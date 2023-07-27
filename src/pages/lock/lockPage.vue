<!--
--  Name:   lockPage
--  Date:   2023/7/24
--  Author: edy
--  Vue Version: 3.x
-->
<template>
  <div class="lock-page flex aic jcc">
    <!--  点击解锁  -->
    <div v-show="showDate" class="unlock flex-col aic jcc pt-20" @click="handleShowForm(false)">
      <t-icon class="unlock-icon" name="lock-on" />
      <span>点击解锁</span>
    </div>
    <!--  时间显示  -->
    <div class="lock-time flex aic jcc">
      <div class="lock-hour mr-20">
        <span>{{ hour }}</span>
        <span v-show="showDate" class="meridiem">
          {{ meridiem }}
        </span>
      </div>
      <div class="lock-minute">
        <span> {{ minute }}</span>
      </div>
    </div>
    <!--  输入密码进入系统  -->
    <transition name="fade-slide">
      <div v-show="!showDate" class="lock-entry">
        <div class="lock-entry-content">
          <div class="flex-col aic enter-x mb-12">
            <t-avatar
              size="70px"
              :image="user.userInfo.avatar || 'https://wework.qpic.cn/wwpic/771975_pTCAvI-3QLKRE3a_1657501203/0'"
            />
            <span class="mv-5 lock-entry-name">{{ user.userInfo.name }}</span>
          </div>
          <t-input v-model="password" type="password" class="enter-x" placeholder="请输入锁屏密码" />
          <span v-if="errMsg" class="lock-entry-errMsg enter-x error-color">{{ errMsg }}</span>
          <div class="enter-x mt-10 flex jcsb">
            <t-link class="ml-6 enter-x" theme="primary" hover="color" @click="handleShowForm(true)">返回</t-link>
            <t-link class="enter-x" theme="primary" hover="color" @click="goLogin()">返回登录</t-link>
            <t-link class="mr-6 enter-x" theme="primary" hover="color" @click="unlock()">进入系统</t-link>
          </div>
        </div>
      </div>
    </transition>
    <!--  底部日期  -->
    <div class="lock-date enter-y">
      <div v-show="!showDate" class="mb-16 enter-x">
        {{ hour }}:{{ minute }} <span class="text-3xl">{{ meridiem }}</span>
      </div>
      <div>{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { useUserStore, useLockStore } from '@/store';

import { useNow } from './useNow';
import { isEmpty } from '@/utils/is';

const user = useUserStore();
const lockStore = useLockStore();
const showDate = ref(true);
const password = ref('');
const errMsg = ref('');
const { hour, month, minute, meridiem, year, day, week } = useNow(true);

function handleShowForm(show = false) {
  showDate.value = show;
}
function unlock() {
  if (isEmpty(password.value)) {
    errMsg.value = '锁屏密码不能为空';
    return;
  }
  errMsg.value = lockStore.unLock(password.value);
}
function goLogin() {
  user.logout();
  lockStore.resetLockInfo();
}
</script>
<style scoped lang="less">
.lock-page {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  overflow-x: hidden;
  background: black;
  .unlock {
    //height: 64px;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    color: white;
    cursor: pointer;
    font-weight: bold;
  }
  .lock-time {
    width: 100vw;
    height: 100vh;
    .lock-hour {
      position: relative;
      margin-right: 20px;
      .meridiem {
        position: absolute;
        left: 20px;
        top: 20px;
        font-size: 14px;
        @media screen and (min-width: 1280px) {
          font-size: 20px;
        }
      }
      @media screen and (min-width: 768px) {
        margin-right: 80px;
      }
    }
    .lock-hour,
    .lock-minute {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40%;
      height: 40%;
      border-radius: 30px;
      background-color: #141313;
      color: #bababa;
      font-weight: 700;

      @media screen and (max-width: 768px) {
        span:not(.meridiem) {
          font-size: 160px;
        }
      }

      @media screen and (min-width: 768px) {
        height: 80%;
        span:not(.meridiem) {
          font-size: 160px;
        }
      }

      @media screen and (max-width: 640px) {
        span:not(.meridiem) {
          font-size: 90px;
        }
      }

      @media screen and (min-width: 1024px) {
        span:not(.meridiem) {
          font-size: 220px;
        }
      }

      @media screen and (min-width: 1280px) {
        span:not(.meridiem) {
          font-size: 260px;
        }
      }

      @media screen and (min-width: 1536px) {
        span:not(.meridiem) {
          font-size: 320px;
        }
      }
    }
  }
  .lock-date {
    position: absolute;
    bottom: 20px;
    width: 100%;
    color: rgb(209 213 219);
    text-align: center;
    div:nth-child(1) {
      font-size: 48px;
      line-height: 1;
      span {
        font-size: 30px;
        line-height: 36px;
      }
    }
    div:nth-child(2) {
      font-size: 24px;
      line-height: 32px;
    }
  }
  .lock-entry {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(8px);
    .lock-entry-content {
      width: 260px;
      .lock-entry-name {
        color: #bababa;
        font-weight: 500;
      }
      .lock-entry-errMsg {
        display: inline-block;
        margin-top: 10px;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .unlock {
    font-size: 14px;
    line-height: 20px;
  }
  .unlock-icon {
    font-size: 18px;
  }
}
@media screen and (min-width: 1280px) {
  .unlock {
    font-size: 20px;
    line-height: 28px;
  }
  .unlock-icon {
    font-size: 25px;
  }
}
</style>
