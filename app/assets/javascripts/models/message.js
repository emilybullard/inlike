Fallinlike.Models.Message = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasOne,
    key: "sender",
    keySource: "sender_id",
    keyDestination: "sender_id",
    relatedModel: "Fallinlike.Models.User",
    autoFetch: true,
    includeInJSON: "id"
  },
  {
    type: Backbone.HasOne,
    key: "recipient",
    keySource: "recipient_id",
    keyDestination: "recipient_id",
    relatedModel: "Fallinlike.Models.User",
    autoFetch: true,
    includeInJSON: "id"
  }],

  urlRoot: "/messages/"
});