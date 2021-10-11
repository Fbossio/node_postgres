import Task from "../models/tasks";

export const createTask = async (req, res) => {
  const { name, done, projectid } = req.body;

  try {
    let newTask = await Task.create(
      {
        name: name,
        done: done,
        projectid: projectid,
      },
      {
        fields: ["name", "done", "projectid"],
      }
    );

    if (newTask) {
      return res.json({
        message: "Task created successfully",
        data: newTask,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

export const getTasks = async (req, res) => {
  const tasks = await Task.findAll({
    // Se puede especificar que atributos se van a entregar. Por defecto es todos, y acá estamos especificando todos.
    attributes: ["id", "projectid", "name", "done"],
    order: [["id", "DESC"]],
  });
  if (tasks) {
    return res.json({ data: tasks });
  } else {
    return res
      .status(404)
      .json({ message: "There are no tasks in the database" });
  }
};

export const getOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      where: {
        id: id,
      },
    });

    if (task) {
      return res.json({
        data: task,
      });
    } else {
      return res.status(404).json({
        message: "There is no task with that id",
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, done, projectid } = req.body;

  try {
    const tasks = await Task.findAll({
      attributes: ["id", "name", "done", "projectid"],
      where: {
        id: id,
      },
    });

    if (tasks.length > 0) {
      tasks.forEach(async (task) => {
        await task.update({
          name: name,
          done: done,
          projectid: projectid,
        });
      });
      return res.json({
        message: "Task updated successfully!",
        data: tasks,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteRowCount = await Task.destroy({
      where: {
        id: id,
      },
    });
    return res.json({
      message: "Task deleted successfully",
      count_deleted: deleteRowCount,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTaskByProject = async (req, res) => {
  const { projectid } = req.params;
  const tasks = await Task.findAll({
    where: {
      projectid: projectid,
    },
  });

  return res.json({ tasks: tasks });
};
