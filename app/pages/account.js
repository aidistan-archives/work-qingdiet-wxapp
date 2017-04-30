var app = getApp()

Page({
  data: {
    loaded: false,

    user: {},
    userInfo: {},
    addresses: []
  },
  onLoad: function () {
    app.loginWeixin(() => {
      app.getUserInfo((userInfo) => this.setData({userInfo: userInfo}))

      app.loginQingDiet(() => {
        app.getUser((user) => this.setData({user: user}))
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
  bindBirthdayChange: function (e) {
    app._updateUser({
      birthday: e.detail.value
    }, (user) => this.setData({user: user}))
  },
  bindAddressCreate: function () {
    wx.navigateTo({url: 'address'})
  },
  bindAddressEdit: function (e) {
    wx.navigateTo({url: 'address?id=' + e.currentTarget.dataset.addressId})
  }
})
