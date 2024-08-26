const mongoose = require('mongoose');
const { mongoUri } = require('./config');

const connectDB = async ()=>{
await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
}

module.exports = connectDB;