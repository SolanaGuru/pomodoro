const db = require('../db')

class Task {
  constructor({taskname}) {
    this.taskname = taskname
  }
  createTask = async () => {
    console.log(this)
    try {
      const { rows } = await db.query(
        `INSERT INTO tasks(name) VALUES ($1)`,
        [this.taskname]
      )
      return rows;
    } catch (e) {
      throw e
    }
  }
}

// Task.prototype.createTask = async () => {
//   console.log(this)
//   try {
//     const { rows } = await db.query(
//       `INSERT INTO tasks(name) VALUES (${this.taskname})`
//     )
//     return rows;
//   } catch (e) {
//     throw e
//   }
// }
module.exports = Task