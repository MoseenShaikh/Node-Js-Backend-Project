const Employee = require("../models/Employee");
const Department = require("../models/Department");

// GET all employees with pagination, search, filter
exports.getAllEmployees = async (req, res) => {
  try {
    // Destructure query params with defaults
    let { page = 1, pageSize = 10, search = "", department, jobTitle } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    // Build query
    let query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (department) query.department = department;
    if (jobTitle) query.jobTitle = { $regex: jobTitle, $options: "i" };

    // Total count for pagination
    const total = await Employee.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize);

    // Fetch employees with pagination
    const employees = await Employee.find(query)
      .populate("department")
      .populate("supervisor")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Fetch departments for filter dropdown
    const departments = await Department.find();

    // Render view
    res.render("employees/index", {
      employees,
      departments,
      search,
      department,
      jobTitle,
      currentPage: page,
      totalPages,
      pageSize
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// GET employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("department")
      .populate("supervisor");

    if (!employee) return res.status(404).send("Employee not found");

    const departments = await Department.find();
    res.render("employees/show", { employee, departments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// CREATE Employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, jobTitle, department, supervisor, country, state, city } = req.body;

    const newEmployee = new Employee({
      name,
      email,
      jobTitle,
      department,
      supervisor: supervisor || null,
      country,
      state,
      city
    });

    await newEmployee.save();
    res.redirect("/employees");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// UPDATE Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, jobTitle, department, supervisor, country, state, city } = req.body;

    await Employee.findByIdAndUpdate(req.params.id, {
      name,
      email,
      jobTitle,
      department,
      supervisor: supervisor || null,
      country,
      state,
      city
    });

    res.redirect("/employees");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// DELETE Employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect("/employees");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
