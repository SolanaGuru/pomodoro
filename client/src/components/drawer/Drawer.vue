<template>
  <div class="Modal">
    <transition name="fade" mode="out-in">
      <div class="content">
        <div style="padding: 5px; display: flex; justify-content: flex-end">
          <div class="Icon-wrapper" @click="toggleSetting">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-ea893728=""
            >
              <path
                fill="var(--color-background-lightest)"
                d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
              ></path>
            </svg>
          </div>
        </div>

        <app-drawer-timer />
        <app-drawer-settings />
      </div>
      <!-- <component :is="currentDrawer" /> -->
    </transition>
    <div
      class="modal-back"
      @click="
        () => {
          store.dispatch('toggleSetting');
        }
      "
    ></div>
  </div>

</template>

<script setup>
import appDrawerSettings from "@/components/drawer/Drawer-settings.vue";
import appDrawerTimer from "@/components/drawer/Drawer-timer.vue";
import { useStore } from "vuex";
import { onUnmounted } from "vue";

const store = useStore();
const toggleSetting = () => {
  store.dispatch("toggleSetting");
};
onUnmounted(() => {
  store.dispatch("saveSetting", store.state.Setting);
});
</script>
