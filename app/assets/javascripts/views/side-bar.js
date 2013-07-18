Fallinlike.Views.SideBar = Backbone.View.extend({

  template: JST['side-bar'],

  events: {
    "click button.edit-profile": "showProfileEdit",
    "click button.messages-index": "showMessages",
    "click button.log-out": "logOut"
  },

  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  addUserPhoto: function() {
    main_img_src = this.model.get('photos').first().get('image_url')
    $img = $('<img>').attr('src', main_img_src)
    $('.user-image').append()
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

  logOut: function() {
    event.preventDefault();
    $.ajax({
      url: "/users/sign_out/",
      type: "delete",
      success: function() {

        window.location.href = "/users/sign_in/"
      },
      error: function() {
        console.log("Failed to log out.")
      }
    })
  },

});