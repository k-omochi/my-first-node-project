# 03 API練習

## テストコマンド

### 全ユーザー取得
curl http://localhost:3000/api/users

### 特定のユーザー取得
curl http://localhost:3000/api/users/1

### ユーザー追加
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"次郎"}'

### ユーザー削除
curl -X DELETE http://localhost:3000/api/users/1