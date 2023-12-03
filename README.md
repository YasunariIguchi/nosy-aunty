# nosy-aunty

もっと良い方法があるかもしれないけど、とりあえず環境の作り方  

## 初回立ち上げ


コンテナ立ち上げ

```shell
docker compose up -d  
```

バックエンドコンテナの中に入る

```shell
docker compose exec backend bash  
```

コンテナの中に入ってから
```shell
cd backend  
composer install  
npm install  
```

コンテナから一旦出る
```shell
exit
```

frontend用のjsパッケージ群をインストールするためにフロントエンドのコンテナの中に入る

```shell
docker compose exec frontend bash
```

frontend用のjsパッケージ群をインストール

```shell
npm install
```

Reactの開発サーバーを開始する

```shell
npm start
```

->これでlocalhost:3000にアクセスするとReactの画面になる。
開発サーバーの終了はWindowsでは Ctrl + c、Macでは・・・
開発サーバーを終了させるとlocalhost:3000にアクセスしても反応が無くなるので、復活させたい場合は `npm start` を打つこと。

コンテナの外に出る

```shell
exit
```

## コンテナの終了

Reactの開発サーバーが終了していることを確認してから
コンテナの外、docker-compose.ymlがある場所で

```shell
docker compose stop
```

## 2回目以降立ち上げ

コンテナの外、docker-compose.ymlがある場所で

```shell
docker compose up -d
```

その後、フロントエンドコンテナの中に入ってReactの開発サーバーをスタート

```shell
docker compose exec frontend bash
npm start
```

※React開発サーバーをスタートさせたらそのターミナルは終了まで閉じてはいけない。別の作業をするならもう一枚ターミナルを立ち上げること。

## バックエンド(Laravel)のマイグレーション

まず、backendフォルダの中にある.env.exampleをコピーして.envにリネームする

その後、backendコンテナの中に入る

```shell
docker compose exec backend bash
```

コンテナ内でマイグレーションをする

```shell
cd backend
php artisan migrate
```

## デバッグ機能(vscode)
vscodeのサイドバーのデバッグのボタンを押す
↓
RUN AND DEBUGのところで”Listen for Xdebug”を選択して実行ボタンを押す。
↓
デバッグしたい行の行数字の左をクリックして赤丸(ブレークポイント)をつける
↓
そこで止まって変数の値など見れます。
