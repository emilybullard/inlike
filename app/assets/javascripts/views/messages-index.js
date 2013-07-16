Fallinlike.Views.MessagesIndex = Backbone.View.extend({

  initialize: function() {
    this.received_messages = this.model.get('received_messages');
    this.sent_messages = this.model.get('sent-messages');
  },

  events: {
    "click .show-user-profile": "showUserProfile",
    "click .view-message": "viewMessage",
    "click .close-messages": "closeMessages",
  },

  template: JST['messages-index'],

  render: function() {
    var renderedContent = this.template({
          user: this.model,
      received: this.received_messages,
          sent: this.sent_messages
        });
    this.$el.html(renderedContent);
    return this;
  },

  showUserProfile: function(event) {
    var id = $(event.target).data('id');
    var fish = Fallinlike.Store.fish.get(id);
    var profileShow = new Fallinlike.Views.Profile({model: fish});
    $('.profile').html(profileShow.render().$el);
    $('.profile').modal();
  },

  viewMessage: function(event) {
    var id = $(event.target).data('id');
    var message = this.received_messages.get(id);
    var messageShow = new Fallinlike.Views.MessageShow({model: message});
    this.$el.html(messageShow.render().$el);
  },

  closeMessages: function() {
    $('.show-messages').modal('hide');
    this.remove();
  },

});