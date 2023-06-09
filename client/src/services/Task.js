import { Api } from "@/services/Api";

export default {
  getTaskList: () => {
    return Api.get("/task");
  },
  addTask: (data) => {
    return Api.put("/task", { data: data });
  },
  updateTask: (data) => {
    return Api.post("/task", { data: data });
  },
  deleteTask: (id) => {
    return Api.delete(`/task?id=${id}`);
  },
};
