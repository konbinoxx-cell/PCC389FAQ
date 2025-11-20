export default async function handler(req, res) {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { question, category, contact } = req.body;
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO || 'konbinoxx-cell/pcc389faq';

    if (!question || !category) {
      return res.status(400).json({ error: '❌ 问题和分类不能为空' });
    }

    const title = `[FAQ] ${question.slice(0, 50)}…`;
    const body = `**Question:** ${question}\n\n**Category:** ${category}\n**Contact:** ${contact || 'N/A'}\n**Status:** Pending\n**Submitted:** via PCC389 FAQ Form`;

    const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        title, 
        body, 
        labels: ['pending', 'faq'] 
      })
    });

    if (response.ok) {
      return res.status(200).json({ 
        success: true,
        message: '✅ 提交成功，感谢您的提问！' 
      });
    } else {
      const error = await response.text();
      console.error('GitHub API error:', error);
      return res.status(500).json({ error: '❌ 提交失败，请稍后再试。' });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: '❌ 服务器错误，请稍后再试。' });
  }
}
