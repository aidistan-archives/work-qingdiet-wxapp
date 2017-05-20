var app = getApp()

Page({
  data: {
    loaded: false,

    // Remote data
    user: {},
    userInfo: {},
    addresses: [],

    // User-derived data
    GENDERS: ['男', '女'],
    genderIndex: 0
  },
  onLoad: function () {
    app.loginWeixin(() => {
      app.getUserInfo((userInfo) => this.setData({userInfo: userInfo}))

      app.loginQingDiet(() => {
        app.getUser((user) => this.updateUser(user))
        app._getAddresses((addresses) => this.setData({addresses: addresses}))

        this.setData({loaded: true})
      })
    })
  },
  onShow: function () {
    if (this.data.loaded) {
      app.loginQingDiet(() => app._getAddresses((addresses) => this.setData({addresses: addresses})))
    }
  },
  bindGenderChange: function (e) {
    app._updateUser({
      gender: e.detail.value === '0' ? 'male' : 'female'
    }, (user) => this.updateUser(user))
  },
  bindBirthdayChange: function (e) {
    app._updateUser({
      birthday: e.detail.value
    }, (user) => this.updateUser(user))
  },
  updateUser: function (user) {
    this.setData({
      user: user,
      genderIndex: user.gender === 'female' ? 1 : 0
    })
  }
})
