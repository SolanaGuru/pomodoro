const { convertC2S, convertS2C } = require("../utils/utils");
const Task = require("../db/models").Task;
const Settings = require("../db/models").Setting;
exports.syncData = async (req, res, next) => {
  try {
    const { setting, task } = req.body;
    const clientSetting = convertC2S(setting);
    let settingData = [];
    let taskList = Array.isArray(task) ? [...task] : [];
    let settingSyncResult = [];
    let taskListSyncResult;
    if (!setting.serverSync) {
      settingData = [...clientSetting];
      await Settings.truncate({ restartIdentity: true });
      settingSyncResult = await Settings.bulkCreate(settingData);
      for (const item of taskList) {
        switch (item.state) {
          case "added":
            await Task.create(item);
            break;
          case "updated":
            await Task.update(item, { where: { id: item.id } });
            break;
          case "deleted":
            await Task.destroy({ where: { id: item.id } });
            break;
          default:
            break;
        }
      }
      taskListSyncResult = await Task.findAll();
    } else {
      const serverTaskList = await Task.findAll();
      const serverSetting = await Settings.findAll();
      settingSyncResult = [...serverSetting];
      taskListSyncResult = [...serverTaskList];
    }
    
    let temp = convertS2C(settingSyncResult);
    temp.serverSync = false;
    if (taskListSyncResult.length === 0) temp.selectedTask = null;
  
    res.status(200).send({ taskListSyncResult, settingSyncResult: temp });
  } catch (e) {
    console.log(e)
  }
  
};
