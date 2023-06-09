<template>
  <div>
    <audio
      id="audio-long-break"
      ref="audioLongBreak"
      :src="alertLongBreakSound"
    ></audio>
    <audio
      id="audio-short-break"
      ref="audioShortBreak"
      :src="alertShortBreakSound"
    ></audio>
    <audio id="audio-work" ref="audioWork" :src="alertWorkSound"></audio>
    <audio id="audio-tick" ref="audioTick" :src="tickSound"></audio>
  </div>
</template>

<script setup>
import { EventBus } from "@/utils/EventBus";
import tickSound from "@/assets/audio/tick.mp3";
import alertLongBreakSound from "@/assets/audio/alert-long-break.mp3";
import alertShortBreakSound from "@/assets/audio/alert-short-break.mp3";
import alertWorkSound from "@/assets/audio/alert-work.mp3";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const volume = computed(() => store.getters.volume / 100.0).value;
const currentRound = computed(() => store.getters.currentRound).value;
const tickSoundsDuringBreak = computed(
  () => store.getters.tickSoundsDuringBreak
).value;
const tickSounds = computed(() => store.getters.tickSounds).value;

const audioShortBreak = ref(null);
const audioTick = ref(null);
const audioWork = ref(null);
const audioLongBreak = ref(null);

/** mounted() **/
onMounted(() => {
  EventBus.on("ready-long-break", () => {
    audioShortBreak.value.volume = volume;
    audioShortBreak.value.play();
  });

  EventBus.on("ready-short-break", () => {
    audioShortBreak.value.volume = volume;
    audioShortBreak.value.play();
  });

  EventBus.on("timer-tick", () => {
    audioTick.value.volume = volume;
    const isBreak =
      currentRound === "short-break" || currentRound === "long-break";
    if (isBreak && !tickSoundsDuringBreak) return;
    if (!isBreak && !tickSounds) return;
    audioTick.value.play();
  });

  EventBus.on("ready-work", () => {
    audioWork.value.volume = volume;
    audioWork.value.play();
  });
});
</script>
