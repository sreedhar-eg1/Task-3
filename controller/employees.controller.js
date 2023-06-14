const employeeCollection = require("../db");
const { getPagination } = require("../services/pagination");

const insertEmployee = async (req, res) => {
  try {
    // #swagger.autoBody=true
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Insert an employee',
                schema: { $ref: '#/definitions/insertEmployee' }
        } */

    const employee = await employeeCollection.findOne({
      userId: req.body.userId,
    });

    if (employee) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Employee with this User ID already exists",
        });
    }

    const insertedEmployee = await employeeCollection.insertOne(req.body);
    res.status(201).json({ insertedEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong, please try again later....");
  }
};

const getAllEmployee = async (req, res) => {
  try {
    //#swagger.autoQuery=true
    //  #swagger.parameters['page'] = { in: 'query' }
    //  #swagger.parameters['limit'] = { in: 'query' }
    const { skip, limit } = getPagination(req.query);
    const employees = await employeeCollection
      .find({}, { sort: { id: 1 }, skip: skip, limit: limit })
      .toArray();

    if (employees.length < 1) {
      return res.status(200).json({ message: "There is no product" });
    }

    res.status(200).json({ employees });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong, please try again later....");
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await employeeCollection.findOne(
      { id: Number(employeeId) },
      {
        projection: {
          _id: 0,
          id: 1,
          userId: 1,
          jobTitleName: 1,
          firstName: 1,
          lastName: 1,
          preferredFullName: 1,
          employeeCode: 1,
          region: 1,
          phoneNumber: 1,
          emailAddress: 1,
        },
      }
    );

    if (!employee) {
      return res
        .status(404)
        .json({ message: `Employee with ID ${employeeId} was not found.` });
    }

    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).send("Something went wrong, please try again later....");
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    /*  #swagger.parameters['updateObj'] = {
                in: 'body',
                description: 'update an employee',
                schema: { $ref: '#/definitions/updateEmployee' }
        } */
    const { employeeId } = req.params;
    const employee = await employeeCollection.updateOne(
      { id: Number(employeeId) },
      {
        $set: req.body,
      },
      {
        upsert: true,
      }
    );

    if (employee.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: `Could not update with employee ID you provided` });
    }

    if (
      employee.acknowledged &&
      employee.matchedCount === 1 &&
      employee.matchedCount === 1
    ) {
      return res
        .status(201)
        .json({ success: true, message: "Upadated document successfully" });
    }
  } catch (error) {
    res.status(500).send("Something went wrong, please try again later....");
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const deletedEmployee = await employeeCollection.deleteOne({
      id: Number(employeeId),
    });

    if (deletedEmployee.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: `There is no employee with that ID you provided` });
    }

    if (deletedEmployee.deletedCount === 1) {
      return res
        .status(201)
        .json({ success: true, message: "Successfully deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong, please try again later...");
  }
};

const pageNotFoundRoute = (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
};

module.exports = {
  insertEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  pageNotFoundRoute,
};
