const express = require('express');
require('./db');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const TestSchema = new mongoose.Schema({ ad: String });
const Test = mongoose.model('Test', TestSchema);

app.post('/ekle', async (req, res) => {
  try {
    const yeni = await Test.create({ ad: req.body.ad });
    res.json({ mesaj: 'Veri başarıyla eklendi!', veri: yeni });
  } catch (err) {
    res.status(500).json({ mesaj: 'Veri eklenemedi', hata: err });
  }
});

app.listen(80, () => {
  console.log('Sunucu 80 portunda çalışıyor');
});