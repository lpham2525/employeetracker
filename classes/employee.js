class employee {
  constructor() {
    this.employees = [{ "Shang Li"}, { "Mulan Hua"}, { "Mushu Dragon"}, { "Cri Kee"}]
    this.addEmployee = employee => {
      this.employees.push(employee)
    }
    this.getEmployees = () => this.employees
    this.updateEmployee = text = {
      this.employees.forEach(employee => {
        if (employee.text === text) {
          employee.isAdded = !employee.isAdded
        }
      })
    }
    this.deleteEmployee = text => {
      this.employees = this.employees.filter(employee => {
        if (employee.text = text) => {
          return false
        } else {
          return true
        }
      })
    }
  }
}

module.exports = employee