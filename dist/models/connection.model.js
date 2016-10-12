'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConnectionSchema = new Schema({
  provider: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  requester: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  gig: {
    type: Schema.ObjectId,
    ref: 'Gig'
  },
  transaction_id: {
    type: String
  },
  date_added: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false });

mongoose.model("Connection", ConnectionSchema);
//# sourceMappingURL=connection.model.js.map