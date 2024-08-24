const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: String, enum: ['student', 'teacher']},
  message: { type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
