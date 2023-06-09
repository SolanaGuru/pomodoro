import { Api } from "@/services/Api";

export default {
  syncData: (data) => {
    return Api.post("/sync", data);
  },
};
