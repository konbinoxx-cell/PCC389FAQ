const { Octokit } = require('@octokit/rest');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const [owner, repo] = (process.env.GITHUB_REPO || 'konbinoxx-cell/pcc389faq').split('/');

    const { data: file } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'data/faq.json'
    });

    const content = JSON.parse(Buffer.from(file.content, 'base64').toString());
    return res.status(200).json(content);

  } catch (error) {
    console.error('Error:', error);
    return res.status(200).json({ faqs: [] });
  }
}
