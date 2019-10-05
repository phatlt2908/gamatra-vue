import Vue from 'vue'

const USER_DATA = 'user'

var user = {
  logged: false,
  // User data:
  username: '',
  accessToken: '',

  login(data) {
    if (data.user.username && data['accessToken']) {
      this.logged = true
      this.setData(data)
      this.saveData()
      return true
    }
    return false
  },
  setData(data) {
    this.username = data['username']
    this.accessToken = data['accessToken']
  },
  saveData() {
    var data = {
      username: this.username,
      accessToken: this.accessToken
    }
    localStorage.setItem(USER_DATA, JSON.stringify(data))
  },

  logout() {
    this.logged = false
    localStorage.removeItem(USER_DATA)
  },

  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken
    } else if (localStorage.getItem(USER_DATA)) {
      var data = JSON.parse(localStorage.getItem(USER_DATA))
      if (data['accessToken']) {
        return data['accessToken']
      }
    }
    return ''
  }
}

Vue.use({
  install(Vue, options) {
    Vue.prototype['$user'] = user
  }
})

export default user