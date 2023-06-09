<template>
  <div class="Dial-wrapper">
    <slot></slot>
    <p class="Dial-label">{{ currentRoundDisplay }}</p>
    <svg
      version="1.2"
      baseProfile="tiny"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 230 230"
      xml:space="preserve"
      width="220"
      height="220"
      class="Dial-fill"
      :class="dialClass"
    >
      <path
        fill="none"
        stroke-width="10"
        stroke-linecap="round"
        stroke-miterlimit="10"
        d="M115,5c60.8,0,110,49.2,110,110s-49.2,110-110,110S5,175.8,5,115S54.2,5,115,5"
      />
    </svg>
    <svg
      version="1.2"
      baseProfile="tiny"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 230 230"
      xml:space="preserve"
      width="220"
      height="220"
      class="Dial-bg"
    >
      <path
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-miterlimit="10"
        d="M115,5c60.8,0,110,49.2,110,110s-49.2,110-110,110S5,175.8,5,115S54.2,5,115,5"
      />
    </svg>
  </div>
</template>

<script setup>
import anime from "animejs";
import { EventBus } from "@/utils/EventBus";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  currentTime: {
    type: Number,
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  timerActive: {
    type: Boolean,
    required: true,
  },
});
const store = useStore();

let dial = null;

const timeLongBreak = computed(() => store.getters.timeLongBreak * 60 * 1000);
const timeShortBreak = computed(() => store.getters.time * 60 * 1000);
const timeWork = computed(() => store.getters.timeWork * 60 * 1000);

const currentRoundDisplay = computed(() => {
  const currentRound = store.getters.currentRound;
  if (currentRound === "work") {
    return "Focus";
  } else if (currentRound === "short-break") {
    return "Short Break";
  } else if (currentRound === "long-break") {
    return "Long Break";
  }
  return "";
});

const dialClass = computed(() => {
  const currentRound = store.getters.currentRound;
  if (currentRound === "work") {
    return "Dial-fill--work";
  } else if (currentRound === "short-break") {
    return "Dial-fill--shortBreak";
  } else if (currentRound === "long-break") {
    return "Dial-fill--longBreak";
  }
  return "";
});

const dialAnimation = (duration) => {
  if (dial !== null) {
    dial = null;
    anime.remove(".Dial-fill path");
    dialAnimation(duration);
  }
  dial = anime({
    targets: ".Dial-fill path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: function () {
      return function (t) {
        return t.toFixed(3);
      };
    },
    duration: duration,
    direction: "reverse",
    autoplay: false,
  });
  dial.seek(dial.duration);
};

/**
 * Reset timer animation on window focus.
 * Required due to RequestAnimationFrame not running in blurred windows.
 */
const handleFocus = () => {
  if (props.timerActive) {
    const duration = dial.duration;
    const position = dial.duration - props.currentTime * 1000;
    dial.pause();
    dialAnimation(duration);
    dial.seek(position);
    dial.play();
  }
};

onMounted(() => {
  // set timer to initial work time
  window.onfocus = handleFocus;
  dialAnimation(timeWork.value);
  EventBus.on("timer-started", () => {
    dial.play();
  });
  EventBus.on("timer-paused", () => {
    dial.pause();
  });
  EventBus.on("timer-resumed", () => {
    dial.play();
  });
  EventBus.on("timer-reset", () => {
    dial.pause();
    dial.seek(dial.duration);
  });
  EventBus.on("timer-init", () => {
    const currentRound = store.getters.currentRound;
    dial.pause();
    if (currentRound === "work") {
      dialAnimation(timeWork.value);
    } else if (currentRound === "short-break") {
      dialAnimation(timeShortBreak.value);
    } else if (currentRound === "long-break") {
      dialAnimation(timeLongBreak.value);
    }
  });
});
</script>

<style lang="scss" scoped>
.Dial-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 35px;
  position: relative;
}

.Dial-label {
  letter-spacing: 0.1em;
  position: absolute;
  top: 66%;
  text-transform: uppercase;
}

.Dial-bg {
  stroke: var(--color-background-lightest);
}

.Dial-fill {
  position: absolute;
  transform-origin: center;
  -webkit-app-region: no-drag;
}

.Dial-fill--work {
  stroke: var(--color-focus-round);
}

.Dial-fill--shortBreak {
  stroke: var(--color-short-round);
}

.Dial-fill--longBreak {
  stroke: var(--color-long-round);
}
</style>
