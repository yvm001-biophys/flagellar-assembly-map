# Flagellar Assembly Map

**Flagellar Assembly Map** is an interactive guide to how a bacterial flagellum may develop after deletion of a flagellar gene or gene group. It displays a model of the remaining structure, compares the deletion with a wild-type reference, and suggests candidate deletions from observed phenotypes. It is intended for **exploration and teaching**: the candidate list is **not a validated genotype diagnosis**.

[English](#english) · [日本語](#日本語)

## English

### Start and navigate

Open [Flagellar Assembly Map](https://flagellar-assembly-map.yvm001.chatgpt.site) if you have access. For local use, open `dist/index.html` in a browser; for static hosting, place the **contents** of `dist/` at the site's web root. The interface starts in English and can be switched to Japanese.

1. Select **E. coli K-12**, **Salmonella enterica serovar Typhimurium**, **Vibrio alginolyticus** (polar flagellum), or **Bacillus subtilis**. Species and strain context matters when interpreting a predicted phenotype.
2. Search or filter **Protein catalog** and select a deletion. The catalog currently contains **73 entries across the four species**; some entries group several genes. It is a selected catalog, not an exhaustive genome-wide list.
3. Read **Assembly endpoint** and **Selected deletion** together. The illustration distinguishes parts modeled as built, an affected/deleted part, structures modeled as absent, and uncertain or conditional outcomes. The selected card provides function, caveats, evidence context, and links to literature. Its UniProt link performs a **gene/organism search**, rather than opening a verified strain-specific protein accession.
4. Check **Wild type / deletion** to compare the selected mutant with an idealized wild-type reference side by side. The reference is a model, not a measured control.
5. Under **Find deletion candidates from phenotypes**, enter only observations you actually have. Choices include rod, hook, filament, rotation, assembled/engaged stators, P/L rings (outer-membrane species only), assembled export gate (FliPQR), assembled export platform (FlhAB), assembled ATPase complex (FliHIJ), and flagellar placement. Hook presence alone does not establish normal length; reduced filament abundance and abnormal morphology share one broad option. Leave unmeasured features as **unobserved**; a question about a localized complex does not mean cellular protein abundance. Read the candidate lists and the **suggested next observation** together. Clear the inputs when changing the question; switching species also clears observations.
6. **Cross-species view** follows the selected deletion. Choosing a comparison group also selects its counterpart in the current species; if that group is not cataloged there, the view switches to a species with a cataloged counterpart. A missing entry in another species means *not cataloged*, rather than a demonstrated absence of the gene in that organism.

The application links to sources and distinguishes direct observations from homology-based or model-inferred claims. An article linked to a card does not automatically document the precise deletion, strain, assay, or structural outcome on that card. **Scope & evidence** in the interface and [REVIEW.md](REVIEW.md) explain this distinction.

### How to interpret the diagram and candidates

The diagram is a qualitative drawing of a flagellar motor, axial structures, membranes, stators, and export apparatus. Dashed or empty geometry marks a modeled deletion or missing structure. Animation shows a possible rotation state; **it does not predict a rotation rate or quantify motility**. A motor with a rod can retain the ability to rotate after loss of hook or filament components if the motor and stators remain functional. Removing flagellin does not by itself remove stators. For the grouped **FliH/I/J** entry, rotation is treated as possible **only in the rod-assembled case**; without a rod observation, rotation stays unknown during candidate matching. These are conditional model statements, not measurements of a specific mutant.

Organism-specific exceptions matter. For example, `Salmonella` may express an alternative flagellin depending on phase and genetic background; `Bacillus` can have an alternative stator system, so one stator-system deletion does not automatically remove all stators. The modeled appearance of FliPQR, FlhAB, FliHIJ, or stators describes **assembly/localization**; it cannot establish whether their proteins are expressed elsewhere in the cell.

Candidate matching compares supplied observations with modeled outcomes. Unknown predictions do **not** count as evidence against a candidate. Suggested observations are ranked by how much their known modeled outcomes separate remaining candidates; they are not experimental recommendations validated by measured diagnostic accuracy. Similar phenotypes, allele effects, expression, medium, and unlisted genes may change the interpretation. No sensitivity, specificity, or calibrated probability is available.

### Technical use and boundaries

This is a static HTML/CSS/JavaScript application; no account, backend, API key, external script, or data upload is required. To check the available code-level regression suite in the source checkout, run:

```sh
node tests/review.test.cjs
```

The tests check all 73 catalog entries, diagram/model consistency, representative conditional outcomes, cross-species selections, and the language switch. They do **not** validate predictions against independently labeled mutants or substitute for visual browser review. For quantitative or publication-grade claims about any particular deletion, verify the original experiment, strain, genetic background, growth conditions, assay, and figure/table.

**Source-code permissions: The author does not grant permission to redistribute or modify the source code.** Making it available for viewing does not change this policy. Contact the author for permission before redistributing or modifying it.

## 日本語

### 概要と操作

**Flagellar Assembly Map** は、べん毛関連遺伝子・遺伝子群の欠損により、べん毛のどの構造が形成されると考えられるかを可視化するツールです。野生型との並列比較、観察表現型からの欠損候補の絞り込み、次に観察すると有用な項目の提示を行います。**研究・教育用の探索モデルであり、検証済みの遺伝子型診断器ではありません。**

[Flagellar Assembly Map](https://flagellar-assembly-map.yvm001.chatgpt.site)にアクセスできる場合はそのまま利用できます。手元では `dist/index.html` を開きます。静的サイトで公開する場合は `dist/` **内のファイル**を公開ディレクトリ直下へ置きます。初期表示は英語で、日本語へ切り替えられます。

1. **E. coli K-12、Salmonella enterica serovar Typhimurium、Vibrio alginolyticus の極べん毛、Bacillus subtilis** のいずれかを選びます。菌株の違いは解釈に影響します。
2. **欠損タンパク質一覧**を検索・分類で絞り込み、遺伝子または遺伝子群を選びます。現在は4菌種合わせて**73件**です。複数遺伝子をまとめたカードがあり、全遺伝子の網羅的なデータベースではありません。
3. **構築の到達点**と**選択した欠損の説明**を確認します。模式図は構築された部位、欠損の影響点、形成されない部位、条件付き・不確実な判定を区別します。機能、注意点、文献情報を併せて読んでください。UniProtへのリンクは**遺伝子名と菌種による検索**であり、その株・遺伝子のアクセッション番号を個別に検証したリンクではありません。
4. **野生型との並列比較**では、理想化した野生型モデルと欠損モデルを比較します。野生型図は実測対照ではありません。
5. **表現型から欠損候補を絞り込む**では、実際に観察した項目だけを入力します。対象はロッド、フック、フィラメント、回転、固定子の装着、外膜を持つ菌種のP/Lリング、輸送ゲート FliPQR、FlhAB、FliHIJ の組立・局在、バクテリアべん毛の形成位置です。フックがあるだけでは正常長とは判定しません。フィラメントの減少と形態異常は幅のある選択肢として扱います。測定していない項目は**未観察**のままにします。構造の組立・局在と、細胞内でのタンパク質発現量は別の観察です。候補と**追加観察の提案**を併せて確認します。菌種を切り替えると観察条件はクリアされます。
6. **CROSS-SPECIES VIEW** は欠損遺伝子の選択に連動します。比較欄から選んだ場合も、現在の菌種の対応カードを選びます。そこに収載がない場合は、対応カードのある菌種へ切り替えます。他菌種の空欄は**未収載**を意味し、ゲノムに遺伝子が存在しないことを意味しません。

### 結果の読み方と注意点

模式図にはモーター、ロッド以降の軸構造、膜、固定子、輸送装置を描きます。点線・空白の輪郭は、欠損や形成されないとモデル化した部位を示します。回転表示は定性的で、**回転速度や遊泳能力の測定・予測ではありません**。ロッドまで構築され、モーターと固定子が働く場合、フックやフィラメントが形成されなくてもモーターは回転し得ます。フラジェリン欠損だけでは固定子を消しません。**FliH/I/J群**については**ロッドの構築を確認した場合**に限って回転可能として候補を照合し、ロッドが未観察なら回転は未判定です。個々の変異株について実測したことを意味しません。

`Salmonella` の別のフラジェリンの発現相や遺伝的背景、`Bacillus` の複数の固定子系など、菌種固有の条件にも注意が必要です。輸送装置や固定子の「あり／なし」は**組立・局在のモデル**であり、細胞内の全タンパク質発現量を表しません。

候補の照合では、結果が不明な予測を候補の除外には使いません。追加観察は、残った候補間で予測が異なる既知の項目から提示します。**確率や診断精度を校正した推定ではありません。** 同じ表現型を示す欠損、極性効果、株・培養条件、未収載遺伝子によって解釈が変わります。根拠パネルで直接観察、相同推定、モデル推定とその限界を確認してください。カードに文献があっても、各欠損の株・条件・図番号まで個別に裏付けられたとは限りません。

### 動作確認と利用条件

静的な HTML/CSS/JavaScript アプリであり、ログイン、外部ライブラリー、APIキー、データ送信は不要です。ソース一式では `node tests/review.test.cjs` で、73件のモデルと模式図の対応や主要な条件分岐を確認できます。ただし実験データに対する予測精度や、全環境での描画を保証しません。公開前の詳細な精査結果は [REVIEW.md](REVIEW.md) に記載しています。個別の欠損を論文で定量的に論じる際には、原著の株・対立遺伝子・培養条件・実験法・図表を確認してください。

**ソースコードの利用条件：ソースの再配布・改変は許諾しません。** ソースが閲覧可能な状態で公開されても、この方針は変わりません。再配布・改変を希望する場合は、事前に著作者へ許可を求めてください。
