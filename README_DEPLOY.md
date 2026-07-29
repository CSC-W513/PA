# 部署說明

## 目標
- `index.html` 可上傳到 GitHub 倉庫
- 前端不暴露 Supabase URL、anon key、service role key
- 所有敏感資訊只放在後端環境變數

## 推薦做法
使用 GitHub 存放原始碼，並由 Vercel 部署整個專案。

前端會呼叫同網域的 `/api/*`：
- `/api/group-projects`
- `/api/project-file`
- `/api/verify-group-password`

這些 API 由 Vercel Serverless Functions 執行，Supabase 設定請放在 Vercel 環境變數：

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 本機開發
可使用以下任一方式提供後端設定：

1. 設定環境變數：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
2. 建立本機檔案 `backend_config.local.json`

可參考：
- `backend_config.local.example.json`

啟動方式：

```bat
start_server.bat
```

或：

```powershell
py server.py
```

## 安全注意
- 不要把 `backend_config.local.json`、`.env`、`.env.local` 提交到 GitHub
- 不要把 `SUPABASE_SERVICE_ROLE_KEY` 寫進 `index.html`
- 若使用 GitHub Pages 單獨託管靜態頁面，前端實際呼叫的後端網址仍然會被瀏覽器看到；能隱藏的是 Supabase 真正的 URL 與金鑰
