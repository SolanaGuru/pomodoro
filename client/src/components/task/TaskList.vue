<template>
  <div class="Modal">
    <transition>
      <div class="content" style="padding: 10px">
        <div
          style="padding: 5px; display: flex; justify-content: space-between"
        >
          <el-button @click="addRow" :icon="Plus" type="primary" size="small"
            >Add Task</el-button
          >
          <div class="Icon-wrapper" @click="toggleTaskList">
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

        <el-table
          :data="taskListData"
          lazy
          style="background: none; height: 500px"
        >
          <el-table-column type="index" label="No"></el-table-column>
          <el-table-column prop="name" label="Task" align="center">
            <template #default="scope">
              <el-input
                v-if="scope.row.id === editId"
                v-model="editData.name"
                size="small"
              />
              <span v-else>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Actions" width="90" align="center">
            <template #default="scope">
              <div v-if="scope.row.id === editId">
                <el-button
                  :icon="Close"
                  circle
                  type="danger"
                  @click="cancelEdit"
                  size="small"
                /><el-button
                  :icon="Check"
                  circle
                  type="success"
                  size="small"
                  @click="saveRow(scope.$index)"
                />
              </div>
              <div v-else>
                <el-button
                  :icon="Edit"
                  circle
                  type="primary"
                  size="small"
                  @click="editRow(scope.row)"
                /><el-button
                  :icon="Delete"
                  circle
                  type="danger"
                  size="small"
                  @click="deleteRow(scope.row)"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </transition>
    <div
      class="modal-back"
      @click="
        () => {
          store.dispatch('toggleTaskList');
        }
      "
    ></div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { Close, Check, Edit, Delete, Plus } from "@element-plus/icons-vue";

const store = useStore();
const taskList = computed(() => store.getters.taskList || []);
let taskListData = ref([...taskList.value]);
let editData = reactive({ id: -1, name: "" });
let editId = ref(null);

const addRow = () => {
  if (editId.value === null) {
    editId.value = -1;
    taskListData.value.unshift({ id: -1, name: "" });
    editData.id = -1;
    editData.name = "";
  }
};

const toggleTaskList = () => {
  store.dispatch("toggleTaskList");
};
const editRow = (row) => {
  editId.value = row.id;
  editData.id = row.id;
  editData.name = row.name;
};

const deleteRow = (row) => {
  const index = taskListData.value.indexOf(row);
  taskListData.value.splice(index, index + 1);
  store.dispatch("deleteRow", row);
};

const cancelEdit = () => {
  if (editId.value === -1) {
    taskListData.value.shift();
  }
  editId.value = null;
  editData.id = -1;
  editData.name = "";
};

const saveRow = (index) => {
  if (editId.value === -1) {
    let lastId = 0;
    for (let element of taskList.value) {
      if (lastId < element.id) {
        lastId = element.id;
      }
    }
    editData.id = lastId + 1;
    taskListData.value[index] = { ...editData };
    taskList.value[index] = { ...editData };
    store.dispatch("addNewRow", { ...editData });
    editData.id = -1;
    editData.name = "";
    editId.value = null;
  } else {
    taskListData.value[index] = { ...editData };
    taskList.value[index] = { ...editData };
    store.dispatch("saveRow", { ...editData });
    editData.id = -1;
    editData.name = "";
    editId.value = null;
  }
};
</script>

<style scoped lang="scss"></style>
