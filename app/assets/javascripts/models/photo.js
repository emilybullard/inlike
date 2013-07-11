Fallinlike.Models.Photo = Backbone.RelationalModel.extend({
	relations: [{
		type: Backbone.HasOne,
		key: "user",
		relatedModel: "Fallinlike.Models.User",
	}]
});