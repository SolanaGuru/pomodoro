const Task = require("../db/models").Task;

exports.addTask = async (req, res, next) => {
  const { data } = req.body;
  return Task.create({ name: data.name })
    .then((task) => res.status(200).send(task))
    .catch((error) => res.status(400).send(error));
};

exports.getTaskList = async (req, res, next) => {
  const data = await Task.findAll();
  res.status(200).send(data);
};

exports.updateTask = async (req, res, next) => {
  const { data } = req.body;
  return Task.update({ name: data.name }, { where: { id: data.id } })
    .then(async (response) => {
      const result = await Task.findOne({ where: { id: data.id } });
      console.log(result)
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error)
      res.status(400).send(error);
    });
};

exports.deleteTask = async (req, res, next) => {
  const { id } = req.query;
  return Task.destroy({ where: { id } })
    .then(() => res.status(200).send())
    .catch((error) => res.status(400).send(error));
};

