const Department = require("../models/Department");

// GET all Departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.render("departments/index", { departments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// GET Create Department Form
exports.getCreateForm = (req, res) => {
  try {
    res.render("departments/create");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// POST Create Department
exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newDepartment = new Department({ name, description });
    await newDepartment.save();
    res.redirect("/departments");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// GET Edit Department Form
exports.getEditForm = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.redirect("/departments");
    res.render("departments/edit", { department });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// PUT Update Department
exports.updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Department.findByIdAndUpdate(req.params.id, { name, description });
    res.redirect("/departments");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// DELETE Department
exports.deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.redirect("/departments");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
