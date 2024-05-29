

## オセロゲーム

### 機能一覧

* COMと対戦を行うユースケース
  * 対戦開始する
  * 先手後手選択
  * 一時中断する（盤面をスナップショット）
  * 中断した盤面から開始する
  * 最初から開始する
  * 石を打つ
  * 勝敗を確認する
  
## 石を打つ機能

* 選択した位置に石を打てるかチェック
* 石を打つ
* ひっくり返す
* ターン終了
* 勝敗確認

## API設計メモ

### 対戦を開始する

* 対戦を登録する
* POST /api/othello

### 盤面を取得する

* GET /api/othello/board/[id]

レスポンス

```json
{
  "turnCount": 1,
  "board": [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  "nextTurn": 2,
  "winner": null
}
```


### 石を打つ

ターンを登録する

* POST /api/othello/board

リクエスト
```json
{
  gameId: number,
  nowTurn: number,
  turnCount: number,
  x: number,
  y: number,
}
```

レスポンス
```json
{ 
  nextBoard:number[][],
  nextTurn: number,
  winner: string,
}
```

### 状態管理

page.tsx 
  gameId: number
  gameState: string
  turnCount: number



* classNameに複数クラスを指定する方法

```
<div className={`${styles.container} ${styles.container_bg}`}></div>
```

### mainブランチ以外はvercel deployさせない方法

https://zenn.dev/bisque/scraps/50a51a28d6eb85

https://vercel.com/yr260625s-projects/vercel-postgres-trial/settings/git

`test $(git symbolic-ref --short HEAD) != "main"`

* 定数オブジェクトのキーのみが入ることを想定した型の宣言

```javascript
export const GAME_STATUS = {
  STARTING: '対戦中',
  PAUSE: '一時停止',
  BEFORE_STARTING: '開始前',
  END: '終了',
} as const;
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

```

FormDescriptionの中にdiv要素を入れるとvalidateDOMNestingエラーが発生するため使用しない


* 画面修正
* レスポンスコード修正
* Jest