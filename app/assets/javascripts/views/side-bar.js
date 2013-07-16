Fallinlike.Views.SideBar = Backbone.View.extend({
  template: JST['side-bar'],

  events: {
    "click button.edit-profile": "showProfileEdit",
    "click button.messages-index": "showMessages"
  },

  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  showProfileEdit: function() {
    var profileEdit = new Fallinlike.Views.ProfileEdit({model: Fallinlike.Store.current_user});
    $('.show-edit-profile').html(profileEdit.render().$el);
    $('.show-edit-profile').modal();
  },

  showMessages: function() {
    var messagesIndex = new Fallinlike.Views.MessagesIndex({model: Fallinlike.Store.current_user});
    $('.show-messages').html(messagesIndex.render().$el);
    $('.show-messages').modal();
  },

});