const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://mraydin:09qxHvwmka6ojrn8@cluster.paqdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB bağlantı hatası:', error);
});

db.once('open', () => {
  console.log('MongoDB bağlantısı başarılı!');
});

module.exports = db;