const { convertC2S } = require("../utils/utils");
const { response } = require("express");
const Settings = require("../db/models").Setting;

exports.saveSetting = async (req, res, next) => {
  const data = req.body
  const convertData = convertC2S(data)
  await Settings.truncate({restartIdentity:true})
  Settings.bulkCreate(convertData).then(response => {
    res.status(200).send()
  }).catch(
    e => res.status(400).send(e)
  )
}

exports.selectTask = async (req, res, next) => {
  const data = req.body
  console.log(data)
  Settings.update({value: data.selectedTask, type: "number"}, {where: {name: "selectedTask"}}).then(() => {
    res.status(200).send()
  }).catch((e) => {
    console.log(e)
    res.status(400).send(e)
  })
}