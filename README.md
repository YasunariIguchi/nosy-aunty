# nosy-aunty

もっと良い方法があるかもしれないけど、とりあえず環境の作り方  

## 初回立ち上げ

frontend用のjsパッケージ群をインストール

```shell
cd frontend
npm install
cd ../
```

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

->これでlocalhost:3000にアクセスするとReactの画面になる。

コンテナの外に出る場合は

```shell
exit
```

## コンテナの終了

コンテナの外、docker-compose.ymlがある場所で

```shell
docker compose stop
```

## 2回目以降立ち上げ

コンテナの外、docker-compose.ymlがある場所で

```shell
docker compose up -d
```

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
