<script setup>
import { EventBus } from "@/utils/EventBus";
import { computed, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const timeLongBreak = computed(() => store.getters.timeLongBreak);
const timeShortBreak = computed(() => store.getters.timeShortBreak);
const timeWork = computed(() => store.getters.timeWork);

const openNotification = (opts) => {
  const notification = new Notification(opts.title, {
    body: opts.body,
    icon: opts.icon,
    silent: true,
  });
  notification.onclick = (e) => {
    e.preventDefault();
    window.focus();
  };
};
const callNotification = (opts) => {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    openNotification(opts);
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        openNotification(opts);
      }
    });
  }

  // notification = new Notification(opts.title, {
  //   body: opts.body,
  //   icon: opts.icon,
  //   silent: true,
  // });
};

const notifyLongBreak = () => {
  callNotification({
    title: "Focus Round Complete",
    body: `Begin a ${timeLongBreak.value} minute long break.`,
    icon: null,
  });
};

const notifyShortBreak = () => {
  callNotification({
    title: "Focus Round Complete",
    body: `Begin a ${timeShortBreak.value} minute short break.`,
    icon: null,
  });
};

const notifyWork = () => {
  callNotification({
    title: "Break Finished",
    body: `Begin focusing for ${timeWork.value} minutes.`,
  });
};

onMounted(() => {
  EventBus.on("ready-long-break", notifyLongBreak);
  EventBus.on("ready-short-break", notifyShortBreak);
  EventBus.on("ready-work", notifyWork);
});

onBeforeUnmount(() => {
  EventBus.off("ready-long-break", notifyLongBreak);
  EventBus.off("ready-short-break", notifyShortBreak);
  EventBus.off("ready-work", notifyWork);
});
</script>
