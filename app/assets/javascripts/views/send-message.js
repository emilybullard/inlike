Fallinlike.Views.SendMessage = Backbone.View.extend({
  template: JST['send-message'],

  sentTemplate: JST['message-submitted'],

  initialize: function() {
    this.sender = this.model.get('sender');
    this.recipient = this.model.get('recipient');
  },

  events: {
    "click .send-message": "sendMessage",
    "click .close-message": "closeMessage"
  },

  render: function() {
    var renderedContent = this.template({
      message: this.model,
      sender: this.sender,
      recipient: this.recipient
    });
    this.$el.html(renderedContent);
    return this;
  },

  sendMessage: function(event) {
    var that = this;
    event.preventDefault();
    var text = $('.body').val();
    this.model.save({body: text}, {
      wait: true,
      success: function() {
        that.messageSubmitted();
      },
    })
  },

  closeMessage: function(event) {
    $('.new-message').modal('hide');
    event.preventDefault();
    this.remove();
  },

  messageSubmitted: function() {
    var renderedContent = this.sentTemplate();
    this.$el.html(renderedContent);
    return this;
  },

});