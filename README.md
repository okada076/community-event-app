# 地域イベント管理アプリ（React + Vite）

## 🎯 目的

地域のつながりを促進するためのイベントカレンダーアプリです。
カレンダーUIでイベントが探しやすく、参加・詳細閲覧もシンプルにしています。

---


## 🧱 コンポーネント構成図

```
App
├── Header
│   └── タイトル（地域イベントカレンダー）
├── SearchBar
│   └── キーワード・カテゴリ・エリア検索
├── CalendarView
│   └── カレンダーUI（react-calendar）
│       └── 日付セルクリック → onDateSelect()
├── EventModal
    └── 選択された日付のイベント詳細を表示
```


## 🚀 セットアップ手順
 1. リポジトリをクローン
    git clone https://github.com/your-username/community-event-app.git
    cd community-event-app
 2. パッケージをインストール
    npm install
 3. 開発サーバーを起動
     npm run dev
 4. ブラウザで表示
    http://localhost:5173


## 💻 使用技術

- React（Vite + JSX）
- react-calendar
- JavaScript（ES6）
- localStorage（簡易保存）


## ⚙️ 実装機能

- カレンダーUIによる月表示
- イベント登録（＋イベント登録ボタンから）
- イベント詳細モーダルの表示
- イベント削除
- キーワード検索（イベントタイトルや場所でフィルタ）


## 🧪 動作確認方法

1. アプリ起動後、任意の日付をクリック  
2. 「＋イベント登録」からイベント情報を入力して保存  
3. カレンダーにドットが表示される（イベントあり）  
4. イベント日を再度クリック → モーダルで詳細確認  
5. 「削除」ボタンでイベントを削除
