<!-- File: README.md -->
# AlgorithM Blog

株式会社AlgorithMの公式ブログサイト。コーポレートサイトとは独立して運用しています。

## 構成

- `index.html` — ブログトップ（記事一覧）
- `posts/` — 個別記事HTML
- `tags/` — カテゴリ別一覧
- `assets/` — CSS / JS / 画像

## 新しい記事を追加する方法

1. `posts/` 配下に新しいHTMLファイルを作成（既存記事をコピーするのが早い）
2. `index.html` の `<div class="article-grid">` 内に新しい `<article class="article-card">` を追加
3. `data-category` と `data-tags` を適切に設定
4. 画像は `assets/images/posts/` に配置し、`background-image:url('../assets/images/posts/xxx.jpg')` で参照

## カテゴリ一覧

- `product` — Product Update
- `member` — Member
- `event` — Event
- `tech` — Tech
- `culture` — Culture

## デプロイ

### GitHub Pagesの場合

1. このリポジトリを `algorithm-blog` という名前で作成
2. Settings → Pages → Source を `main / root` に設定
3. URL: `https://<username>.github.io/algorithm-blog/`

### カスタムドメイン（推奨: blog.algorithm.co.jp）

1. リポジトリのルートに `CNAME` ファイルを作成し、`blog.algorithm.co.jp` と記載
2. お名前.com等のDNS設定で、`blog` のCNAMEを `<username>.github.io` に向ける
