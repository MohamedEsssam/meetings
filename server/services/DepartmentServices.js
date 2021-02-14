const { result } = require("lodash");
const sql = require("../startup/connectDB");

class DepartmentServices {
  async create(departmentName) {
    const departmentId = await this.generateId();

    const query =
      "INSERT INTO department (departmentId, departmentName) VALUES (?, ?)";

    sql.query(query, [departmentId, departmentName], (err, result) => {
      if (err) throw err;
    });

    return await this.getDepartmentById(departmentId);
  }

  async getAll() {
    const query = "SELECT * FROM department";

    return new Promise((resolve, reject) => {
      sql.query(query, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  }

  async getDepartmentById(departmentId) {
    const query = "SELECT * FROM department WHERE departmentId=?";

    return new Promise((resolve, reject) => {
      sql.query(query, [departmentId], (err, result) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  async getDepartmentByName(departmentName) {
    const query = "SELECT * FROM department WHERE departmentName=?";

    return new Promise((resolve, reject) => {
      sql.query(query, [departmentName], (err, result) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  generateId() {
    return new Promise((resolve, reject) => {
      sql.query("SELECT UUID() AS departmentId", (err, result, field) => {
        if (err) reject(err);

        resolve(result[0].departmentId);
      });
    });
  }
}

module.exports = DepartmentServices;
