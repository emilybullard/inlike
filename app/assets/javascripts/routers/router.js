Fallinlike.Routers.Router = Backbone.Router.extend({
	
	initialize: function($rootEl) {
		this.$rootEl = $rootEl;
    this.initSidebar();
	},

	routes: {
    "": "showDragArea"
	},

	showDragArea: function() {
    var dragArea = new Fallinlike.Views.DragArea();
    $('#drag-area').html(dragArea.render().$el);
	},

  initSidebar: function() {
    var sideBar = new Fallinlike.Views.SideBar({model: Fallinlike.Store.current_user});
    $('#side-nav').html(sideBar.render().$el);

  },
});