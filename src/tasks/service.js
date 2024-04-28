const fs = require("fs");
const path = require("path");
// Import the existing tasks from the JSON file
const filePath = path.join(__dirname, "../../task.json");
const rawData = fs.readFileSync(filePath);
const tasksArr = JSON.parse(rawData);

exports.getAllTasks = () => {
  return tasksArr;
};
exports.getLatestTask = () => {
  return tasksArr.tasks.sort((a, b) => b - a).pop();
};
exports.getTaskId = (taskId) => {
  const taskres = tasksArr.tasks.find((task) => task.id === parseInt(taskId));
  return taskres;
};
exports.createTask = async (newTaskObj) => {
  //validate
  if (
    typeof newTaskObj.id === "number" &&
    typeof newTaskObj.title === "string" &&
    typeof newTaskObj.description === "string" &&
    typeof newTaskObj.completed === "boolean"
  ) {
    // Import the existing tasks from the JSON file
    const filePath = path.join(__dirname, "../../task.json");
    const rawData = fs.readFileSync(filePath);
    const tasksArr = JSON.parse(rawData);
    tasksArr.tasks.push(newTaskObj);
    const updatedData = JSON.stringify(tasksArr, null, 2);

    fs.writeFileSync(filePath, updatedData);
    return true;
  } else {
    throw { message: "Invalid input" };
  }
};

exports.updateTaskById = async (taskId, updateTask) => {
  const taskUpdate = tasksArr.tasks.filter(
    (task) => task.id === parseInt(taskId)
  );
  //validate
  if (
    taskUpdate &&
    typeof updateTask.title === "string" &&
    typeof updateTask.description === "string" &&
    typeof updateTask.completed === "boolean" &&
    updateTask.description != "" &&
    updateTask.title != ""
  ) {
    taskUpdate[0].title = updateTask.title;
    taskUpdate[0].description = updateTask.description;
    taskUpdate[0].completed = updateTask.completed;

    const updatedData = JSON.stringify(tasksArr, null, 2);

    fs.writeFileSync(filePath, updatedData);
    return true;
  } else {
    return false;
  }
};

exports.deleteTaskById = async (taskId) => {
  const taskDel = tasksArr.tasks.find((task) => task.id === parseInt(taskId));
  const index = tasksArr.tasks.indexOf(taskDel);

  tasksArr.tasks.splice(index, 1);
  const updatedData = JSON.stringify(tasksArr, null, 2);
  fs.writeFileSync(filePath, updatedData);
  return true;
};
