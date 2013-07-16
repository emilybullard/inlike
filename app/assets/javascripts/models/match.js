Fallinlike.Models.Match = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasOne,
    key: "admirer",
    keySource: "admirer_id",
    relatedModel:  "Fallinlike.Models.User",
    autoFetch: true,
    includeInJSON: false
  },
  {
    type: Backbone.HasOne,
    key: "admired_user",
    keySource: "admired_id",
    relatedModel: "Fallinlike.Models.User",
    autoFetch: true,
    includeInJSON: false
  }],

  urlRoot: "/matches/"
});