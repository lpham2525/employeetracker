class department {
  constructor() {
    this.departments = [{"production"}, {"engineering"}, {"research/development"}, {"management"}, ]
    this.addDepartment = department => {
      this.departments.push(department)
    }
    this.getDepartments = () => this.departments
    this.updateDepartment = text = {
      this.departments.forEach(department => {
        if (department.text === text) {
          department.isAdded = !department.isAdded
        }
      })
    }
    this.deleteDepartment = text => {
      this.departments = this.departments.filter(department => {
        if (department.text = text) => {
          return false
        } else {
          return true
        }
      })
    }
  }
}

module.exports = department