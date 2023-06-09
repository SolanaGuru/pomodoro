<template>
  <div class="Container">
    <p class="Drawer-heading">Settings</p>
    <div class="Setting-wrapper">
      <p class="Setting-title">Auto-start Work Timer</p>
      <div
        class="Checkbox"
        @click="selectAutoStartWorkTimer"
        :class="autoStartWorkTimer ? 'is-active' : 'is-inactive'"
      ></div>
    </div>
    <div class="Setting-wrapper">
      <p class="Setting-title">Auto-start Break Timer</p>
      <div
        class="Checkbox"
        @click="selectAutoStartBreakTimer"
        :class="autoStartBreakTimer ? 'is-active' : 'is-inactive'"
      ></div>
    </div>
    <div class="Setting-wrapper">
      <p class="Setting-title">Tick Sounds - Work</p>
      <div
        class="Checkbox"
        @click="selectTickSounds"
        :class="tickSounds ? 'is-active' : 'is-inactive'"
      ></div>
    </div>
    <div class="Setting-wrapper">
      <p class="Setting-title">Tick Sounds - Break</p>
      <div
        class="Checkbox"
        @click="selectTickSoundsDuringBreak"
        :class="tickSoundsDuringBreak ? 'is-active' : 'is-inactive'"
      ></div>
    </div>
    <div class="Setting-wrapper">
      <p class="Setting-title">Desktop Notifications</p>
      <div
        class="Checkbox"
        @click="selectNotifications"
        :class="notifications ? 'is-active' : 'is-inactive'"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const autoStartWorkTimer = computed(() => store.getters.autoStartWorkTimer);
const autoStartBreakTimer = computed(() => store.getters.autoStartBreakTimer);
const notifications = computed(() => store.getters.notifications);
const tickSounds = computed(() => store.getters.tickSounds);
const tickSoundsDuringBreak = computed(
  () => store.getters.tickSoundsDuringBreak
);

const selectAutoStartWorkTimer = () => {
  const payload = {
    key: "autoStartWorkTimer",
    val: !autoStartWorkTimer.value,
  };
  // store.dispatch("setSetting", payload);
  store.dispatch("setViewState", payload);
};

const selectAutoStartBreakTimer = () => {
  const payload = {
    key: "autoStartBreakTimer",
    val: !autoStartBreakTimer.value,
  };
  // store.dispatch("setSetting", payload);
  store.dispatch("setViewState", payload);
};

const selectNotifications = () => {
  const payload = {
    key: "notifications",
    val: !notifications.value,
  };
  // store.dispatch("setSetting", payload);
  store.dispatch("setViewState", payload);
};

const selectTickSounds = () => {
  store.dispatch("setTickSounds", !tickSounds.value);
};

const selectTickSoundsDuringBreak = () => {
  store.dispatch("setTickSoundsDuringBreak", !tickSoundsDuringBreak.value);
};
</script>

<style lang="scss" scoped>
.Checkbox {
  background-color: var(--color-background);
  border: 2px solid var(--color-background-lightest);
  border-radius: 100%;
  display: inline-block;
  // transition: $transitionDefault;
  width: 16px;
  height: 16px;
  &:hover {
    border-color: var(--color-accent);
  }
  &.is-active {
    background-color: var(--color-accent);
    border-color: var(--color-background);
    &:hover {
      background-color: var(--color-accent);
      border-color: var(--color-background-lightest);
    }
  }
}

.Container {
  max-height: calc(100% - 36px);
  overflow-y: auto;
}

.Setting-wrapper {
  background-color: var(--color-background);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  padding: 12px;
}

.Setting-title {
  color: var(--color-foreground-darker);
  font-size: 14px;
  letter-spacing: 0.05em;
}
</style>
