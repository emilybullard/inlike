Fallinlike.Views.ProfileEdit = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model.get('photos'), "add", this.render)
  },

  template: JST['users/profile-edit'],

  events: {
    "click input[type='submit'].save-changes": "saveChanges",
    "click button.upload-photo": "uploadPhoto"
  },

  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  saveChanges: function(event) {
    event.preventDefault();
    var data = $(event.target.form).serializeJSON();
    Fallinlike.Store.current_user.save(data, {wait: true});
    document.location.reload();
  },

  uploadPhoto: function(event) {
    var that = this;
    event.preventDefault();
    filepicker.pickAndStore(
      {mimetype:"image/*"},
      {location:"S3"}, 
      function(InkBlobs) { 
        _(InkBlobs).each(function(InkBlob) {
          var photo = new Fallinlike.Models.Photo();
          photo.save({
            image_url: InkBlob.url
          }, 
          {wait: true,
          success: function(data) {
            Fallinlike.Store.current_user.get('photos').add(data);
          }
        });
      })
    })
  },

});