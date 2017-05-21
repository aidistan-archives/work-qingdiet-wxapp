import async from '../vendor/async'

const app = getApp()

Page({
  data: {
    loaded: false,

    // Remote data
    userInfo: {},
    user: {},
    addresses: [],

    // User-derived data
    GENDERS: ['男', '女'],
    genderIndex: 0
  },
  onLoad: function () {
    app.loginWeixin(() => async.parallel([
      (cb) => app.getUserInfo((err, userInfo) => err ? cb(err) : this.updateUserInfo(userInfo, cb)),
      (cb) => app.loginQingDiet((err) => {
        if (err) return cb(err)
        async.parallel([
          (cb) => async.waterfall([app.getUser, this.updateUser], cb),
          (cb) => async.waterfall([app._getAddresses, this.updateAddresses], cb)
        ], cb)
      })
    ], () => {
      this.setData({ loaded: true })

      // Use userInfo.gender to initialize user.gender
      if (this.data.user.gender === 'unknown' && this.data.userInfo.gender > 0) {
        this.bindGenderChange({ detail: { value: this.data.userInfo.gender - 1 } })
      }
    }))
  },
  onShow: function () {
    if (this.data.loaded) {
      async.waterfall([app.loginQingDiet, app._getAddresses, this.updateAddresses])
    }
  },
  updateUserInfo: function (userInfo, cb) {
    this.setData({ userInfo: userInfo })
    typeof cb === 'function' && cb()
  },
  updateUser: function (user, cb) {
    this.setData({
      user: user,
      genderIndex: user.gender === 'female' ? 1 : 0
    })
    typeof cb === 'function' && cb()
  },
  updateAddresses: function (addresses, cb) {
    this.setData({ addresses: addresses })
    typeof cb === 'function' && cb()
  },
  bindGenderChange: function (e) {
    app._updateUser({
      gender: e.detail.value == 0 ? 'male' : 'female'
    }, (err, user) => err || this.updateUser(user))
  },
  bindBirthdayChange: function (e) {
    app._updateUser({
      birthday: e.detail.value
    }, (err, user) => err || this.updateUser(user))
  }
})
