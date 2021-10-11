import Project from "../models/projects";

export const getProject = async (req, res) => {
  const projects = await Project.findAll();
  if (projects) {
    return res.json({ data: projects });
  } else {
    res.status(404).json({ message: "There are no projects in the database" });
  }
};

export const createProject = async (req, res) => {
  const { name, priority, description, deliverydate } = req.body;

  try {
    let newProject = await Project.create(
      {
        name: name,
        priority: priority,
        description: description,
        deliverydate: deliverydate,
      },
      {
        fields: ["name", "priority", "description", "deliverydate"],
      }
    );

    if (newProject) {
      return res.json({
        message: "Project created successfully",
        data: newProject,
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

export const getOneProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({
      where: {
        id: id,
      },
    });

    if (project) {
      return res.json({
        data: project,
      });
    } else {
      return res.status(404).json({
        message: "There is no project with that id",
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteRowCount = await Project.destroy({
      where: {
        id: id,
      },
    });
    return res.json({
      message: "Project deleted successfully",
      count_deleted: deleteRowCount,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, priority, description, deliverydate } = req.body;

  try {
    const projects = await Project.findAll({
      attributes: ["id", "name", "priority", "description", "deliverydate"],
      where: {
        id: id,
      },
    });

    if (projects.length > 0) {
      projects.forEach(async (project) => {
        await project.update({
          name: name,
          priority: priority,
          description: description,
          deliverydate: deliverydate,
        });
      });
      return res.json({
        message: "Project updated successfully!",
        data: projects,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
