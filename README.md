# Tạo Ảnh AI 2026

Ứng dụng React/Vite tạo ảnh từ prompt, thông số phong cách và ảnh tham chiếu.

## Chạy local

```powershell
npm install
```

Tạo file `.env.local` ở thư mục gốc:

```text
GEMINI_API_KEY=your_gemini_api_key
```

Chạy cả frontend và API route bằng Vercel CLI:

```powershell
npx vercel dev
```

## Triển khai Vercel

1. Đưa thư mục này lên GitHub hoặc chạy `npx vercel`.
2. Trong Project Settings > Environment Variables, thêm `GEMINI_API_KEY` cho môi trường Preview/Production.
3. Deploy lại project.

Khóa API chỉ nằm ở serverless function `api/generate.js`, không được nhúng vào bundle trình duyệt.
