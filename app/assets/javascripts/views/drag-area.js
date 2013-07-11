Fallinlike.Views.DragArea = Backbone.View.extend({
	template: JST['users/drag-area'],

  className: "drag-area",

  attributes: {
    "style": "height: 100%;"
  },

  events: {
    'dragstop': "reLayout",
    'needFish': 'reloadFish',
    'rendered': 'initInteractive',
    'drop #decisions': 'removeItem',
    'mouseenter img': 'enlargePhoto',
    'mouseleave img': 'restorePhotoSize'
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
    console.log("should relayout");
    this.$photoBoxes.packery();
  },

  removeItem: function(event) {
    var $item = $('.ui-draggable-dragging');
    var decision = $(event.target).attr('id');
    var id = $item.data('id');
    if ($item.size()) {
      this.makeDecision(id, decision);
      this.$photoBoxes.packery('remove', $item);
      this.fishCount -= 1;
      this.$photoBoxes.packery();
    };
    if (this.fishCount < 15) {
      this.$el.trigger('needFish');
    };
  },

  makeDecision: function(decidedId, decision) {
    $.ajax({
      url: "/users/" + decidedId + "/" + decision,
      type: "post",
      success: function(data) {
        Fallinlike.Store.current_user.get('decisions').add(data);
      }
    })
  },

  addPictures: function(event) {
    var that = this;

    for (var i = 0; i < 24; i++) {
      var fish = Fallinlike.Store.fish.models[i];
      if (fish) {
        var photo = fish.get('photos').first();
        var $img = $('<img>')
                            .attr("src", photo.get("image_url"));
        var $div = that.photoDiv().data("id", fish.id).html($img);
        that.$photoBoxes.append($div);
        this.fishCount = i;
        console.log(this.fishCount);
      }
    }
  },

  reloadFish: function() {
    var that = this;
    for(var i = this.fishCount; i < 24; i++) {
      var fish = Fallinlike.Store.fish.models[i];
      if (fish) {
        var photo = fish.get('photos').first();
        var $img = $('<img>')
                            .attr("src", photo.get("image_url"));
        var $div = that.photoDiv().data("id", fish.id).html($img);
        $div.draggable();
        that.$photoBoxes.append($div);
        that.$photoBoxes.packery('appended', $div);
        this.$photoBoxes.packery('bindUIDraggableEvents', $div);
        this.fishCount = i;
        console.log(this.fishCount);
      }
    }
  },

});