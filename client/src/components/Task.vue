<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

/** load vuex store**/
const store = useStore();

const taskId = ref(null);
const selectedTask = computed(() => store.getters.selectedTask);
const taskList = computed(() => store.getters.taskList);

/** methods **/
const handleChange = (e) => {
  store.dispatch("selectTask", e);
};

/** mounted() **/
onMounted(() => {
  taskId.value = selectedTask.value;
});
</script>

<template>
  <div style="display: flex; padding: 10px 20px 10px 10px">
    <el-select
      v-model="taskId"
      filterable
      placeholder="Select"
      @change="handleChange"
      style="background: none; width: 100%"
      size="large"
    >
      <el-option
        v-for="item in taskList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        style="background: none"
      />
    </el-select>
  </div>
</template>

<style scoped lang="scss"></style>
