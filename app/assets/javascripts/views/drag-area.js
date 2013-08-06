Fallinlike.Views.DragArea = Backbone.View.extend({

  initialize: function() {
    this.listenTo(Fallinlike.Store.current_user, "change", this.render);
    this.listenTo(Fallinlike.Store.current_user.get('matches'), "add", this.alertMatch);
  },

	template: JST['drag-area'],

  className: "drag-area",

  attributes: {
    "style": "height: 100%;"
  },

  events: {
         'dragstop': "reLayout",
    'needMoreUsers': 'reloadUsers',
         'rendered': 'initInteractive',
  'drop #decisions': 'removeItem',
   'mouseenter img': 'enlargePhoto',
   'mouseleave img': 'restorePhotoSize',
      'click .item': 'showProfile',
  },

  checkForMatches: function() {
    var that = this;
    var matches = Fallinlike.Store.current_user.get('matches');
    if (matches) {
      matches.each(function (match) {
        if (match.get('alerted') != true) {
          that.alertMatch();
        }
      });
    }
  },

  alertMatch: function() {
    var match = Fallinlike.Store.current_user.get('matches').last()
    if (match.get('alerted') != true) {
      var alertView = new Fallinlike.Views.AlertPage({model: match});
      $('.match-alert').html(alertView.render().$el);
      $('.match-alert').modal();
    };
  },

  photoDiv: function() {
    var sizes = ["w1", "w2", "w3", "w4"];
    var randSize = function() {
      return sizes[_.random(0, sizes.length - 1)];
    };
    return $('<div>').addClass('item').addClass(randSize());
  },

	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
    this.$el.trigger('rendered');
		return this;
	},

  initInteractive: function() {
    this.$decisions = this.$('#decisions');
    this.$like = this.$('#like');
    this.$dislike = this.$('#dislike');
    this.$photoBoxes = this.$('#photo-boxes');
    this.addPictures();
    this.initPackery();
    this.initDragging();
  },

  initPackery: function() {
    this.$photoBoxes.packery({
      itemSelector: '.item',
            gutter: 10,
    });
  },

  initDragging: function(container) {
    var $itemElems = $(this.$photoBoxes.packery('getItemElements'));
    $itemElems.draggable({zIndex: 999});
    this.$like.droppable();
    this.$dislike.droppable();
    this.$photoBoxes.packery('bindUIDraggableEvents', $itemElems);
  },

  enlargePhoto: function(event) {
    $(event.target).parent().animate({
      margin: -5,
       width: "+=10",
      height: "+=10"
    }, 100);
  },

  restorePhotoSize: function() {
    $(event.target).parent().animate({
      margin: 0,
       width: "-=10",
      height: "-=10"
    }, 100);
  },

  reLayout: function() {
    this.$photoBoxes.packery();
  },

  removeItem: function(event) {
    var $item = $('.ui-draggable-dragging');
    var decision = $(event.target).attr('id');
    var id = $item.data('id');
    // console.log(this.userCount);
    // check real userCount
    if ($item.size()) {
      this.makeDecision(id, decision);
      this.$photoBoxes.packery('remove', $item);
      $item.remove();
      this.userCount -= 1;
      this.$photoBoxes.packery();
    };
    if (this.userCount < 15) {
      this.$el.trigger('needMoreUsers');
    };
  },

  makeDecision: function(decidedId, decision) {
    $.ajax({
          url: "/users/" + decidedId + "/" + decision,
         type: "post",
      success: function(data) {
        Fallinlike.Store.current_user.get('decisions').add(data);
        var matches = Fallinlike.Store.current_user.get('matches')
        matches.fetch();
      }
    })
  },

  showProfile: function(event) {
    var id = $(event.target).parent().data('id');
    var user = Fallinlike.Store.users.get(id);
    var profileShow = new Fallinlike.Views.Profile({model: user});
    $('.profile').html(profileShow.render().$el);
    $('.profile').modal();
  },

  addPictures: function(event) {
    var that = this;
    var divsToLoad = [];

    for (var i = 0; i < 16; i++) {
      var user = Fallinlike.Store.users.models[i];
      if (user) {
        var photo = user.get('photos').first();
        if (photo) {
          var $img = $('<img>').attr("src", photo.get("image_url"));
          var $div = that.photoDiv().data("id", user.id).html($img);
          that.$photoBoxes.append($div);
          this.userCount = i;
          divsToLoad.push($div);
        }
      }
    }

    _(divsToLoad).each(function($div) {
      imagesLoaded($div, function() {
        Fallinlike.fitPhotos($div);
      })
    });
  },

  reloadUsers: function() {
    var that = this;
    var divsToLoad = [];
    var userCount = Fallinlike.Store.users.models.length
    var randNum = Math.floor(Math.random() * userCount);
    if (this.userCount < 18) {
      for(var i = this.userCount; i < 16; i++) {
        var user = Fallinlike.Store.users.models[randNum];
        if (user) {
          var photo = user.get('photos').first();
          if (photo) {
            var $img = $('<img>').attr("src", photo.get("image_url"));
            var $div = that.photoDiv().data("id", user.id).html($img);
            $div.draggable();
            that.$photoBoxes.append($div);
            that.$photoBoxes.packery('appended', $div);
            this.$photoBoxes.packery('bindUIDraggableEvents', $div);
            this.userCount = i;
            divsToLoad.push($div);
          }
        }
      }
    };

    imagesLoaded($('.item'), function(instance) {
      _(divsToLoad).each(function($div) {
        Fallinlike.fitPhotos($div);
      })
    });

    this.checkForMatches();
  },

});