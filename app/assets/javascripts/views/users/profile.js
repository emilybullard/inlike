Fallinlike.Views.Profile = Backbone.View.extend({
  template: JST['users/profile'],

  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },

});