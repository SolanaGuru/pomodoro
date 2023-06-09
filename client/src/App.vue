<template>
  <div style="width: 400px; margin: 0 auto; margin-top: 30px">
    <app-titlebar />
    <app-timer />
    <!-- <app-notification-win v-if="os === 'win32' && notifications" /> -->
    <app-notification v-if="notifications" />
    <app-task />
  </div>
  <app-drawer v-if="settingOpen" />
  <app-task-list v-if="taskListOpen" />
</template>

<script setup>
import appDrawer from "@/components/drawer/Drawer.vue";
import appNotification from "@/components/notification/Notification.vue";
import appTimer from "@/components/timer/Timer.vue";
import appTitlebar from "@/components/Titlebar.vue";
import appTask from "@/components/Task.vue";
import appTaskList from "@/components/task/TaskList.vue";

import "animate.css";
import "element-plus/dist/index.css";
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";
const store = useStore();

onBeforeMount(() => {
  store.dispatch("syncData", {setting: store.state.Setting, task: store.getters.taskList})
});

const settingOpen = computed(() => store.getters.settingOpen);
const taskListOpen = computed(() => store.getters.taskListOpen);
const notifications = computed(() => store.getters.notifications);
</script>

<style lang="scss">
@import "./assets/stylesheets/main.scss";

#app {
  animation: fade-in 0.5s ease forwards;
  position: relative;
}
</style>
