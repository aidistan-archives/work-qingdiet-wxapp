var app = getApp()

Page({
  data: {
    tabs: ['measurement', 'requirement', 'dishes', 'combo', 'order'],
    activeTab: 'measurement'
  },
  handleTabTap: function (e) {
    this.setData({ activeTab: e.currentTarget.id });
  }
});
