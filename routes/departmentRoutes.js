const express = require("express");
const router = express.Router();
const deptController = require("../controllers/departmentController");

// List all departments
router.get("/", deptController.getAllDepartments);

// Show create form
router.get("/create", deptController.getCreateForm);

// Create department
router.post("/", deptController.createDepartment);

// Show edit form
router.get("/:id/edit", deptController.getEditForm);

// Update department
router.put("/:id", deptController.updateDepartment);

// Delete department
router.delete("/:id", deptController.deleteDepartment);

module.exports = router;
