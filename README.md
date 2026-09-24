# Flagellar Assembly Map — GitHub Pages 公開手順

このパッケージは静的サイトです。ビルドやAPIキーは不要です。英語が初期表示で、日本語に切り替えられます。

## GitHubへ初めて公開する場合

1. https://github.com/ にログインし、右上の `+` → **New repository** を選びます。
2. Repository name に `flagellar-assembly-map` を入力し、**Public** を選んで **Create repository** を押します。この時点でアップロードしたソースコードは公開されます。公開前に内容を確認してから作業してください。
3. このZIPをパソコンで**展開**します。GitHubのリポジトリ画面で **Add file → Upload files** を選び、ZIPそのものではなく、展開した `index.html`, `app.js`, `audit.js`, `components.js`, `research.js`, `locale.js`, `styles.css`, `README.md`, `.nojekyll` を**リポジトリの最上位**へアップロードします。ドラッグ時にフォルダー階層ごと入らないよう確認してください。
4. 画面下部の **Commit changes** を押します。
5. リポジトリの **Settings → Pages** で、**Build and deployment → Source: Deploy from a branch**、**Branch: main**、フォルダー **/(root)** を選び、**Save** を押します。
6. Pages画面に表示されるURL（通常は `https://<GitHubユーザー名>.github.io/flagellar-assembly-map/`）を開きます。反映まで数分かかる場合があります。

## 公開後の確認

- 図と4菌種の切替、英語・日本語の切替が動く。
- `ΔmotA/B` 等では固定子が点線の輪郭になり、`ΔflgE`・`ΔfliC` ではロッドと固定子が残ってモーターが回る。
- `ΔfliH/I/J` はロッド構築済みの場合の回転として表示され、輸送装置の該当部分が点線になる。
- 「Find deletion candidates from phenotypes」でロッド「あり」＋モーター回転「あり」を選ぶと、FliH/I/J群を回転「あり」で照合する。ロッドが未観察なら回転判定は「未判定」のままにする。
- 固定子装着、FliPQRゲート、FlhAB構造、FliHIJ複合体を選ぶと、欠損部の点線表示と候補照合結果が対応する。Bacillusの固定子単独欠損は「一方のみ」になる。
- WTと欠損の並列比較、表現型からの候補表示、文献・UniProt検索リンクが開く。
- スマートフォンでも絵と選択欄がはみ出さず操作できる。

このツールは研究・教育用の探索モデルです。全遺伝子の欠損表現型を網羅した実験データベースや、精度が検証された診断器ではありません。図中の回転は定性的な表示で、実測速度や回転方向切替を再現していません。

READMEに載せる研究室名、著者、連絡先、利用条件や引用方法は、ご自身で公開内容を確認してから追記してください。第三者の図版・写真は同梱していません。

## 更新方法

変更したファイルを同じリポジトリの最上位に再アップロードし、コミットするとPagesへ反映されます。GitHub Pagesは公開URLとなるため、論文掲載前に公開範囲を確認してください。
