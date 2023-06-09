<template>
  <div></div>
</template>

<script setup>
import { EventBus } from "@/utils/EventBus";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();
const autoStartWorkTimer = computed(() => store.getters.autoStartWorkTimer);
const autoStartBreakTimer = computed(() => store.getters.autoStartBreakTimer);
const currentRound = computed(() => store.getters.currentRound);
const round = computed(() => store.getters.round);
const workRounds = computed(() => store.getters.workRounds);

const checkRound = () => {
  if (currentRound.value === "work" && round.value >= workRounds.value) {
    store.dispatch("setCurrentRound", "long-break");
    store.dispatch("incrementTotalWorkRounds");
    EventBus.emit("ready-long-break");
  } else if (currentRound.value === "work") {
    store.dispatch("setCurrentRound", "short-break");
    store.dispatch("incrementTotalWorkRounds");
    EventBus.emit("ready-short-break");
  } else if (currentRound.value === "short-break") {
    store.dispatch("setCurrentRound", "work");
    store.dispatch("incrementRound");
    EventBus.emit("ready-work");
  } else if (currentRound.value === "long-break") {
    store.dispatch("setCurrentRound", "work");
    store.dispatch("resetRound");
    EventBus.emit("ready-work");
  }
  dispatchTimer();
};
const dispatchTimer = () => {
  EventBus.emit("timer-init", {
    auto:
      currentRound.value === "work"
        ? autoStartWorkTimer.value
        : autoStartBreakTimer.value,
  });
};

onMounted(() => {
  EventBus.on("timer-completed", () => {
    checkRound();
  });
});
</script>
