const express = require("express");
const taskRoutes = require("express").Router();
const validateInput = require("../utils/helper");

taskRoutes.use(express.json());

const {
  getAllTasks,
  getLatestTask,
  getTaskId,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require("../tasks/service");

taskRoutes.get("/", async (req, res) => {
  try {
    // Sending the user data as a JSON response
    const taskList = await getAllTasks();
    res.status(200).json(taskList.tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

taskRoutes.get("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskIdDetails = await getTaskId(taskId);
    console.log(taskIdDetails);
    if (taskIdDetails) {
      res.status(200).json(taskIdDetails);
    } else {
      throw { message: "Task not found" };
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Task not found" });
  }
});

taskRoutes.post("/", async (req, res) => {
  try {
    const latestTask = await getLatestTask();
    const valid = await validateInput(req.body);
    if (valid) {
      const newTask = {
        id: latestTask.id + 1,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
      };
      const taskIdDetails = await createTask(newTask);
      if (taskIdDetails) {
        res.status(201).json({ message: "Task created" });
      } else {
        throw { message: "error while creating task" };
      }
    } else {
      res.status(400).json({
        message: "Invalid input",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while creating task kindly check provided input",
    });
  }
});

taskRoutes.put("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskExits = await getTaskId(taskId);
    if (taskExits) {
      //validate req.body
      const valid = await validateInput(req.body);
      if (valid) {
        const updateTask = {
          title: req.body.title,
          description: req.body.description,
          completed: req.body.completed,
        };
        const taskIdDetails = await updateTaskById(taskId, updateTask);
        if (taskIdDetails) {
          res.status(200).json({ message: "Task updated" });
        }
      } else {
        res.status(400).json({ message: "Bad request, kindly check input" });
      }
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while updating task kindly check provided input",
    });
  }
});

taskRoutes.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskIdDetails = await getTaskId(taskId);
    if (taskIdDetails) {
      await deleteTaskById(taskId);
      res.status(200).json({ message: "Task deleted" });
    } else {
      throw { message: "Task not found" };
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Task not found" });
  }
});

module.exports = taskRoutes;
