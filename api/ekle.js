import mongoose from 'mongoose';

const uri = 'mongodb+srv://mraydin:09qxHvwmka6ojrn8@cluster.paqdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';

const TestSchema = new mongoose.Schema({ ad: String });
const Test = mongoose.models.Test || mongoose.model('Test', TestSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ mesaj: 'Sadece POST istekleri desteklenir.' });
  }

  try {
    await connectDB();
    const yeni = await Test.create({ ad: req.body.ad });
    res.status(200).json({ mesaj: 'Veri başarıyla eklendi!', veri: yeni });
  } catch (err) {
    res.status(500).json({ mesaj: 'Veri eklenemedi', hata: err.message });
  }
}