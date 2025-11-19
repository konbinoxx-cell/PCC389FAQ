# FAQ Lite

一个极轻量的静态 FAQ（常见问题）页面：
- 纯前端，无后端依赖
- 支持搜索（Fuse.js）与分类/对象筛选
- 静态 JSON 数据，可直接改 `data/faq.json`
- 可直接部署到 GitHub Pages

## 目录结构

faq-lite/
  index.html          （页面入口）
  assets/
    styles.css       （样式）
    script.js        （搜索/渲染逻辑）
  data/
    faq.json         （FAQ 数据）

## 使用方式

- 本地打开：直接双击 `index.html`（如浏览器限制本地文件，推荐起一个简单静态服务器）
- 修改仓库链接：访问时 URL 追加 `?repo=https://github.com/your/repo`
- 编辑 FAQ：在 `data/faq.json` 添加或修改条目
  - id: 数字主键
  - slug: 链接锚点（可选）
  - question: 问题
  - answer: 回答（支持基础 HTML）
  - category: 分类
  - audience: 目标对象数组（例如：新客户/在服客户/内部）
  - tags: 标签数组

## 部署到 GitHub Pages（推荐）

1) 新建空仓库或使用现有仓库，将本目录内容放在仓库根目录
2) 推送：
   git init
   git add .
   git commit -m "init: faq-lite"
   git branch -M main
   git remote add origin https://github.com/<your>/<repo>.git
   git push -u origin main
3) 打开 GitHub 仓库 Settings → Pages：
   - Source 选择 Deploy from a branch
   - Branch 选择 main，目录选 /(root)
   - 保存，等待几分钟后访问提示的 Pages 域名

如需自定义域名，在仓库中添加 CNAME 文件并配置 DNS。

## 自定义

- 主题与配色：修改 `assets/styles.css` 顶部 CSS 变量
- 搜索灵敏度：在 `assets/script.js` 的 Fuse 配置中调整 `threshold`
- 分类与对象枚举：分类自动从数据中汇总，对象枚举在页面下拉中维护

## 许可

可在公司内部自由复制与修改。
