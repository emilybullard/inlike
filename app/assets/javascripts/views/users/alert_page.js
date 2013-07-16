Fallinlike.Views.AlertPage = Backbone.View.extend({
  initialize: function() {
    this.admirer = this.model.get('admirer');
    this.admired_user = this.model.get('admired_user');
    this.model.set({alerted: true});
    this.model.save();
  },

  events: {
    "click .create-message": "openMessageSend",
    "click .fail-to-seize-opportunity": "denyOpportunity"
  },

  template: JST['users/alert_page'],

  render: function() {
    var renderedContent = this.template({
      match: this.model,
      admirer: this.admirer,
      admired_user: this.admired_user
    });
    this.$el.html(renderedContent)
    return this;
  },

  openMessageSend: function() {
    $('.match-alert').modal('hide');
    var message = new Fallinlike.Models.Message({
      sender: this.admired_user,
      recipient: this.admirer
    });
    var newMessage = new Fallinlike.Views.SendMessage({model: message});
    $('.new-message').html(newMessage.render().$el);
    $('.new-message').modal();
    this.remove();
  },

});