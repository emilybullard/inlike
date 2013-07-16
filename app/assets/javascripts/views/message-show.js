Fallinlike.Views.MessageShow = Backbone.View.extend({
  template: JST['message-show'],

  events: {
    "click .reply": "replyToSender",
  },

  render: function() {
    var renderedContent = this.template({message: this.model});
    this.$el.html(renderedContent);
    return this;
  },

   replyToSender: function(event) {
    event.preventDefault();
    var message = new Fallinlike.Models.Message({
      sender: Fallinlike.Store.current_user,
      recipient: this.model.get('sender')
    });
    var newMessage = new Fallinlike.Views.SendMessage({model: message});
    $('.new-message').html(newMessage.render().$el);
    $('.new-message').modal();
  },
});