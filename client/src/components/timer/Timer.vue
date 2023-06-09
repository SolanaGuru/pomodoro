<template>
  <div class="Timer-wrapper">
    <app-audio />
    <app-timer-dial
      :current-time="currentTime"
      :minutes="minutes"
      :timerActive="timerActive"
    >
      <p class="Dial-time" v-if="!timerStarted">{{ prettyMinutes }}</p>
      <p class="Dial-time" v-else>{{ prettyTime }}</p>
    </app-timer-dial>

    <section class="Container Button-wrapper">
      <transition name="fade" mode="out-in">
        <div>
          <div
            class="Button"
            v-if="!timerStarted"
            @click="startTimer"
            :key="'start'"
          >
            <div class="Button-icon-wrapper">
              <svg
                version="1.2"
                baseProfile="tiny"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 7.6 15"
                xml:space="preserve"
                height="15px"
                class="Icon--start"
              >
                <polygon
                  fill="var(--color-foreground)"
                  points="0,0 0,15 7.6,7.4 "
                />
              </svg>
            </div>
          </div>
          <div
            class="Button"
            v-if="timerStarted && !timerActive"
            @click="resumeTimer"
            :key="'resume'"
          >
            <div class="Button-icon-wrapper">
              <svg
                version="1.2"
                baseProfile="tiny"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 7.6 15"
                xml:space="preserve"
                height="15px"
              >
                <polygon
                  fill="var(--color-foreground)"
                  points="0,0 0,15 7.6,7.4 "
                />
              </svg>
            </div>
          </div>
          <div
            class="Button"
            v-else-if="timerStarted && timerActive"
            @click="pauseTimer"
            :key="'pause'"
          >
            <div class="Button-icon-wrapper">
              <svg
                version="1.2"
                baseProfile="tiny"
                id="Layer_2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 10.9 18"
                xml:space="preserve"
                height="15px"
                class="Icon--pause"
              >
                <line
                  fill="none"
                  stroke="var(--color-foreground)"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  x1="1.5"
                  y1="1.5"
                  x2="1.5"
                  y2="16.5"
                />
                <line
                  fill="none"
                  stroke="var(--color-foreground)"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  x1="9.4"
                  y1="1.5"
                  x2="9.4"
                  y2="16.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </transition>
    </section>

    <app-timer-footer />
    <app-timer-controller />
  </div>
</template>

<script setup>
import TimerWorker from "@/utils/timer.worker";
import appAudio from "@/components/TimerAudio.vue";
import appTimerController from "@/components/timer/Timer-controller.vue";
import appTimerDial from "@/components/timer/Timer-dial.vue";
import appTimerFooter from "@/components/timer/Timer-footer.vue";
import { EventBus } from "@/utils/EventBus";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

/** store **/
const store = useStore();

let timerWorker = ref(null);
let currentTime = ref(0);
let minutes = ref(1);
let timerActive = ref(false);
let timerStarted = ref(false);

const currentRound = computed(() => store.getters.currentRound);
const currentRoundDisplay = computed(() => {
  if (currentRound.value === "work") {
    return "focus round";
  } else if (currentRound.value === "short-break") {
    return "short break";
  } else if (currentRound.value === "long-break") {
    return "long break";
  }
  return "";
});

const timeLongBreak = computed(() => store.getters.timeLongBreak);
const timeShortBreak = computed(() => store.getters.timeShortBreak);
const timeWork = computed(() => store.getters.timeWork);

const timeRemaining = computed(() => {
  const time = currentTime;
  const elapsedMinutes = Math.floor(time.value / 60);
  const elapsedSeconds = time.value - elapsedMinutes * 60;
  const remainingSeconds = formatTimeDouble(60 - elapsedSeconds);
  let remainingMinutes = minutes.value - elapsedMinutes;

  if (elapsedSeconds > 0) {
    remainingMinutes -= 1;
  }

  return {
    remainingMinutes,
    remainingSeconds,
  };
});
const prettyMinutes = computed(() => {
  return `${minutes.value}:00`;
});
const prettyTime = computed(() => {
  return `${timeRemaining.value.remainingMinutes}:${timeRemaining.value.remainingSeconds}`;
});
const formatTimeDouble = (time) => {
  if (time === 60) {
    return "00";
  } else if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

const initTimer = () => {
  switch (currentRound.value) {
    case "work":
      minutes.value = timeWork.value;
      createTimer(timeWork.value);
      break;
    case "short-break":
      minutes.value = timeShortBreak.value;
      createTimer(timeShortBreak.value);
      break;
    case "long-break":
      minutes.value = timeLongBreak.value;
      createTimer(timeLongBreak.value);
      break;
    default:
      createTimer(25);
      break;
  }
};

const createTimer = (min) => {
  if (!timerWorker.value) return;
  timerWorker.value.handleCreate(min);
};

const pauseTimer = () => {
  if (!timerWorker.value) return;
  timerWorker.value.handlePause();
  timerActive.value = !timerActive.value;
  console.info(`${currentRoundDisplay.value} round paused`);
};

const resetTimer = () => {
  if (!timerWorker.value) return;
  timerWorker.value.handleReset();
  timerActive.value = !timerActive.value;
  timerStarted.value = false;
};

const resumeTimer = () => {
  if (!timerWorker.value) return;
  timerWorker.value.handleResume();
  timerActive.value = true;
};

const startTimer = () => {
  if (!timerWorker.value) return;
  timerWorker.value.handleStart();
  timerActive.value = true;
  timerStarted.value = true;
};
const toggleTimer = () => {
  if (timerActive.value) {
    pauseTimer();
  } else {
    startTimer();
  }
};

onMounted(() => {
  // timerWorker = SWorker.create(TimerWorker)
  timerWorker.value = new TimerWorker();

  initTimer();

  EventBus.on("timer-init", (opts) => {
    // clear previous timers
    resetTimer();
    initTimer();
    if (opts.auto) {
      setTimeout(() => {
        startTimer();
      }, 1500);
    } else {
      timerActive.value = false;
    }
  });

  EventBus.on("call-timer-reset", () => {
    resetTimer();
    console.info(`${currentRoundDisplay.value} round reset`);
  });

  EventBus.on("call-timer-toggle", () => {
    console.info(`${currentRoundDisplay.value} toggle`);
    toggleTimer();
  });

  EventBus.on("call-timer-skip", () => {
    EventBus.emit("timer-completed");
  });

  self.onmessage = (message) => {
    switch (message.data.event) {
      case "complete":
        EventBus.emit("timer-completed");
        break;
      case "pause":
        EventBus.emit("timer-paused");
        break;
      case "reset":
        EventBus.emit("timer-reset");
        break;
      case "resume":
        EventBus.emit("timer-started");
        currentTime.value = message.data.elapsed;
        break;
      case "start":
        EventBus.emit("timer-started");
        currentTime.value = message.data.elapsed;
        console.info(`${currentRoundDisplay.value} round started`);
        break;
      case "tick":
        currentTime.value = message.data.elapsed;
        EventBus.emit("timer-tick", {
          elapsed: message.data.elapsed,
          total: message.data.totalSeconds,
        });
        break;
      default:
        break;
    }
  };

  // Bind event listener to Space key
  window.addEventListener(
    "keypress",
    (e) => {
      if (e.code === "Space") {
        toggleTimer();
      }
    },
    true
  );
});
</script>

<style lang="scss" scoped>
.Button {
  border: 2px solid var(--color-background-lightest);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  // transition: $transitionDefault;
  width: 50px;
  height: 50px;
  -webkit-app-region: no-drag;

  &:hover {
    background-color: var(--color-background-light);

    & .Icon--pause line {
      stroke: var(--color-accent);
    }

    & .Icon--start polygon {
      fill: var(--color-accent);
    }
  }
}

.Button-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0 10px 0;
}

.Button-icon-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
}

.Dial-time {
  font-family: "RobotoMono", monospace;
  font-size: 46px;
  margin: 0;
  position: absolute;
  top: 32%;
}

.Timer-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
