<template>
  <section class="Container Footer">
    <div class="Round-wrapper">
      <p>
        {{ round + "/" + workRounds }}
        <span
          v-if="totalWorkRounds > 0"
          class="Total-rounds"
          title="Focus rounds completed"
          >({{ totalWorkRounds }})</span
        >
      </p>
      <p class="TextButton" title="Reset current round" @click="callForReset">
        Reset
      </p>
    </div>
    <div class="Icon-group">
      <!--task-->
      <div
        class="Icon-wrapper Icon-wrapper--double--left"
        title="Tasks"
        @click="toggleTaskList"
      >
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-ea893728=""
          class="Icon--task"
        >
          <path
            fill="var(--color-background-lightest)"
            d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"
          ></path>
        </svg>
      </div>
      <!--setting-->
      <div
        class="Icon-wrapper Icon-wrapper--double--left"
        title="Options"
        @click="toggleSetting"
      >
        <svg
          version="1.2"
          baseProfile="tiny"
          id="Layer_1"
          class="Icon--setting"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 19.5 20"
          width="18"
          xml:space="preserve"
        >
          <path
            fill="var(--color-background-lightest)"
            d="M17.2,11c0-0.3,0.1-0.6,0.1-1s0-0.7-0.1-1l2.1-1.6c0.2-0.1,0.2-0.4,0.1-0.6l-2-3.5C17.3,3.1,17,3,16.8,3.1
            l-2.5,1c-0.5-0.4-1.1-0.7-1.7-1l-0.4-2.7C12.2,0.2,12,0,11.7,0h-4C7.5,0,7.3,0.2,7.2,0.4L6.9,3.1c-0.6,0.3-1.2,0.6-1.7,1l-2.5-1
            C2.4,3,2.2,3.1,2.1,3.3l-2,3.5C-0.1,6.9,0,7.2,0.2,7.4L2.3,9c0,0.3-0.1,0.6-0.1,1s0,0.7,0.1,1l-2.1,1.6C0,12.8-0.1,13,0.1,13.3
            l2,3.5c0.1,0.2,0.4,0.3,0.6,0.2l2.5-1c0.5,0.4,1.1,0.7,1.7,1l0.4,2.6c0,0.2,0.2,0.4,0.5,0.4h4c0.3,0,0.5-0.2,0.5-0.4l0.4-2.6
            c0.6-0.3,1.2-0.6,1.7-1l2.5,1c0.2,0.1,0.5,0,0.6-0.2l2-3.5c0.1-0.2,0.1-0.5-0.1-0.6L17.2,11z M9.7,13.5c-1.9,0-3.5-1.6-3.5-3.5
            s1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5S11.7,13.5,9.7,13.5z"
          />
        </svg>
      </div>
      <!-- skip -->
      <div
        class="Icon-wrapper Icon-wrapper--double--left"
        title="Skip the current round"
        @click="skipRound"
      >
        <svg
          version="1.2"
          baseProfile="tiny"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 8 12"
          xml:space="preserve"
          height="15px"
          class="Icon--skip"
        >
          <polygon
            fill="var(--color-background-lightest)"
            points="0,0 0,12 6.1,5.9"
          />
          <rect
            x="6.9"
            y="0"
            fill="var(--color-background-lightest)"
            width="1.1"
            height="12"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EventBus } from "@/utils/EventBus";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const round = computed(() => store.getters.round);
const workRounds = computed(() => store.getters.workRounds);
const totalWorkRounds = computed(() => store.getters.totalWorkRounds);

const callForReset = () => {
  EventBus.emit("call-timer-reset");
};

const skipRound = () => {
  EventBus.emit("timer-completed");
};

const toggleSetting = () => {
  store.dispatch("toggleSetting");
};

const toggleTaskList = () => {
  store.dispatch("toggleTaskList");
};
</script>

<style lang="scss" scoped>
.Footer {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
