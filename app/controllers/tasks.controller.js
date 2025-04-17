const express = require("express");
const Tasks = require("../models/task.model");
const apiRoutes = express.Router();

module.exports = function (app) {
  apiRoutes.post("/tasks", async (req, res) => {
    try {
      const { taskName, createdBy } = req.body;

      if (!taskName || !createdBy) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const randomNumber = Math.floor(Math.random() * 10000);

      const taskData = new Tasks({
        taskId: randomNumber,
        taskName,
        createdBy,
      });
      await taskData.save();

      res.status(200).json({ message: "Data Saved Succesfully", taskData });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went Wrong", error: error.message });
    }
  });

  // apiRoutes.get('/tasks', async(req, res) => {
  //     try {
  //         const taskData = await Tasks.find({});
  //         return res.status(200).json(taskData)
  //     } catch (error) {
  //        res.status(500).json("Something went wrong : "+error.message)
  //     }
  // })

  apiRoutes.get("/tasks/:id", async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "taskId is required!" });
      }

      const taskData = await Tasks.findOne({ taskId: id });

      if (!taskData) {
        return res.status(404).json({ message: "Task not found!" });
      }

      res.status(200).json(taskData);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong: " + error.message });
    }
  });

  apiRoutes.post("/update-task", async (req, res) => {
    try {
      const { createdBy, taskId, updateFields } = req.body;

      if (!createdBy || !taskId || !updateFields) {
        return res.status(400).json("All Fields are Required !");
      }

      const taskData = await Tasks.findOne({
        taskId: taskId,
        createdBy: createdBy,
      });

      if (!taskData) {
        res
          .status(400)
          .json(
            "You`re not the Owner of this Task! , Only Owner can Update the Task"
          );
      }

      const updateTask = await Tasks.findOneAndUpdate(
        { taskId: taskId },
        { $set: updateFields },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Data Updated Successfully", updateTask });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  apiRoutes.put("/delete-task", async (req, res) => {
    try {
      const { taskId, createdBy } = req.body;

      if (!taskId || !createdBy) {
        return res.status(400).json("All Fields are required !");
      }

      const taskData = await Tasks.findOne({
        taskId: taskId,
        createdBy: createdBy,
      });

      if (!taskData) {
        return res.status(400).json("You`re not the owner of this Task !");
      }

      const deleteTask = await Tasks.findOneAndDelete({ taskId: taskId });

      res
        .status(200)
        .json({ message: "Task Deleted successfully!", deleteTask });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something Went Wrong: " + error.message });
    }
  });

  app.use("/", apiRoutes);
};
