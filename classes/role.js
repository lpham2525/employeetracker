class role {
  constructor() {
    this.roles = [{ "lead researcher"}, { "researcher"}, { "lead engineer"}, { "engineer"}]
    this.addRole = role => {
      this.roles.push(role)
    }
    this.getRoles = () => this.roles
    this.updateRole = text = {
      this.roles.forEach(role => {
        if (role.text === text) {
          role.isAdded = !role.isAdded
        }
      })
    }
    this.deleteRole = text => {
      this.roles = this.roles.filter(role => {
        if (role.text = text) => {
          return false
        } else {
          return true
        }
      })
    }
  }
}

module.exports = role