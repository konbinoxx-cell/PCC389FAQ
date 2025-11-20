export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { question, category, contact } = req.body;
  const token = process.env.GITHUB_TOKEN;
  const repo = 'konbinoxx-cell/pcc389faq';

  const title = `[FAQ] ${question.slice(0, 50)}…`;
  const body = `**Question:** ${question}\n\n**Category:** ${category}\n**Contact:** ${contact || 'N/A'}\n**Status:** Pending\n**Submitted:** via PCC389 FAQ Form`;

  const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json'
    },
    body: JSON.stringify({ title, body, labels: ['faq'] })
  });

  if (response.ok) {
    res.status(200).send('✅ 提交成功，感谢您的提问！');
  } else {
    const error = await response.text();
    console.error('GitHub API error:', error);
    res.status(500).send('❌ 提交失败，请稍后再试。');
  }
}
