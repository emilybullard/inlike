window.Fallinlike = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
    var router = new Fallinlike.Routers.Router($('body'));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Fallinlike.initialize();

  var tokenValue = $("meta[name='csrf-token']").attr('content');
   $.ajaxSetup({
      headers: {'X-CSRF-Token': tokenValue}
    });

  var $container = $('#photo-boxes');
  $container.packery({
    itemSelector: '.item',
    gutter: 10
  });

  var $itemElems = $($container.packery('getItemElements'));
  $itemElems.draggable();
  $container.packery('bindUIDraggableEvents', $itemElems);


});
