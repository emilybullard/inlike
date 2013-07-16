Fallinlike.Views.MessageShow = Backbone.View.extend({
  template: JST['message-show'],

  render: function() {
    var renderedContent = this.template({message: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  
});