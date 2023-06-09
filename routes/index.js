const express = require('express')
const router = express.Router()

const tasksController = require('../controllers/tasks')
const syncController = require("../controllers/sync");
const settingController = require("../controllers/settings");

router.put('/task', tasksController.addTask)
router.get('/task', tasksController.getTaskList)
router.post('/task', tasksController.updateTask)
router.delete('/task', tasksController.deleteTask)

router.post('/sync', syncController.syncData)

router.post('/setting', settingController.saveSetting)
router.post("/setting/select-task", settingController.selectTask)

module.exports = router