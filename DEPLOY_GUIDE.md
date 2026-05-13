# デプロイ手順

## 1. GitHub Personal Access Token (PAT) の発行

1. GitHubにログイン → 右上アイコン → **Settings**
2. 左メニュー最下部 → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)** をクリック
5. Note: `RequestQuestionSystem` など任意の名前
6. Expiration: **No expiration**（または適切な期間）
7. Scopes: **repo** にチェック（`contents:write` が含まれる）
8. **Generate token** → 表示されたトークンをコピー（再表示不可）

## 2. GitHubリポジトリの準備

```bash
git add .
git commit -m "initial commit"
git remote add origin https://github.com/<あなたのユーザー名>/RequestQuestionSystem.git
git push -u origin main
```

## 3. Vercelへのデプロイ

1. [vercel.com](https://vercel.com) にGitHubアカウントでログイン
2. **Add New... → Project**
3. GitHubリポジトリ `RequestQuestionSystem` を選択 → **Import**
4. **Environment Variables** セクションで以下を追加：

| Name | Value |
|------|-------|
| `GITHUB_TOKEN` | 手順1で発行したトークン |
| `GITHUB_OWNER` | あなたのGitHubユーザー名 |
| `GITHUB_REPO` | `RequestQuestionSystem` |

5. **Deploy** をクリック → 完了後にURLが発行される

## 4. 動作確認

- 発行されたVercel URL（`https://xxxx.vercel.app`）をスマホで開く
- 質問を追加して GitHub の `data/questions.json` に反映されることを確認
- いいね！ボタンをタップして件数が増えることを確認

## ローカル開発

```bash
# .env.local に本物のGITHUB_TOKENを設定してから:
npm run dev
# → http://localhost:3000
```
