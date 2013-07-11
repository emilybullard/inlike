Fallinlike.Views.SideBar = Backbone.View.extend({
  template: JST['side-bar'],

  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },
});