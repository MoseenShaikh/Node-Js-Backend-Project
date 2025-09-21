const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Department = require("../models/Department");
const employeeController = require("../controllers/employeeController");

// 1. List employees
router.get("/", employeeController.getAllEmployees);

// 2. Show create form (STATIC route)
router.get("/create", async (req, res) => {
  const departments = await Department.find();
  const employees = await Employee.find();
  res.render("employees/create", { departments, employees });
});

// 3. Create employee
router.post("/", employeeController.createEmployee);

// 4. Show edit form (STATIC-like route)
router.get("/:id/edit", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  const departments = await Department.find();
  const employees = await Employee.find();
  res.render("employees/edit", { employee, departments, employees });
});

// 5. Show employee details (DYNAMIC)
router.get("/:id", employeeController.getEmployeeById);

// 6. Update employee
router.put("/:id", employeeController.updateEmployee);

// 7. Delete employee
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
