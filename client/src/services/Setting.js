import { Api } from "@/services/Api";

export default {
  saveSetting: (data) => {
    return Api.post("/setting", data);
  },
  selectTask: (data) => {
    return Api.post("/setting/select-task", data);
  },
};
