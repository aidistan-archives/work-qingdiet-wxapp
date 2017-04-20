var app = getApp()

Page({
  data: {
    user: {},
    userInfo: {}
  },
  onLoad: function () {
    app.loginWeixin(() => {
      app.getUser((user) => this.setData({ user: user }))
      app.getUserInfo((userInfo) => this.setData({ userInfo: userInfo }))
    })
  },
  bindBirthdayChange: function (e) {
    app._updateUser({
      birthday: e.detail.value
    }, (user) => this.setData({ user: user }))
  }
})
