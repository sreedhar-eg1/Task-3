const express = require("express");


const {
  insertEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  pageNotFoundRoute
} = require("../controller/employees.controller");

const router = express.Router();

router.post("/api/employee", insertEmployee);
router.get("/api/employee", getAllEmployee)
router.get('/api/employee/:employeeId', getEmployeeById)
router.patch('/api/employee/:employeeId', updateEmployeeById)
router.delete('/api/employee/:employeeId', deleteEmployeeById)
router.all('*', pageNotFoundRoute)

module.exports = router;
