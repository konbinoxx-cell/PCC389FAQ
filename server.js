const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 模拟数据库（可以换成 MongoDB 或 GitHub Issues）
let faqs = [];

// 提交新问题
app.post('/submit', (req, res) => {
  const { question, category, contact } = req.body;
  const newFaq = {
    id: faqs.length + 1,
    question,
    answer: "Pending answer from admin.",
    category,
    contact,
    date: new Date().toISOString(),
    status: "pending"
  };
  faqs.push(newFaq);
  res.status(200).send("✅ Question submitted successfully, pending review.");
});

// 获取所有 FAQ
app.get('/faqs', (req, res) => {
  res.json({ faqs });
});

// 获取 pending 数量
app.get('/pending', (req, res) => {
  const count = faqs.filter(f => f.status === 'pending').length;
  res.json({ pending: count });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`FAQ server running at http://localhost:${PORT}`);
});
