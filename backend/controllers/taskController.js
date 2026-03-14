const Task = require("../models/Task");
const { encryptData } = require("../utils/encryption");

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      user: req.user,
    });

    return res.status(201).json({
      success: true,
      data: encryptData(task),
    });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({
      success: false,
      data: encryptData({ message: "Server error" }),
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const search = req.query.search || "";
    const status = req.query.status || "";

    const query = { user: req.user };
    if (search) query.title = { $regex: search, $options: "i" };
    if (status) query.status = status;

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: encryptData(tasks),
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    return res.status(500).json({
      success: false,
      data: encryptData({ message: "Server error" }),
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { title, description, status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        data: encryptData({ message: "Task not found" }),
      });
    }

    return res.json({
      success: true,
      data: encryptData(task),
    });
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json({
      success: false,
      data: encryptData({ message: "Server error" }),
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        data: encryptData({ message: "Task not found" }),
      });
    }

    return res.json({
      success: true,
      data: encryptData({ message: "Task deleted" }),
    });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({
      success: false,
      data: encryptData({ message: "Server error" }),
    });
  }
};
