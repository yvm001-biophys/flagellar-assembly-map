const REF = {
  pathway:{label:"Kubori et al., J Mol Biol (1992) — Salmonella assembly",url:"https://pubmed.ncbi.nlm.nih.gov/1640458/"},
  flgd:{label:"Ohnishi et al., J Bacteriol (1994)",url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC205349/"},
  lp:{label:"Yamaguchi et al., Nat Commun (2021)",url:"https://doi.org/10.1038/s41467-021-24715-3"},
  vibrio:{label:"Zhu et al., PNAS (2017)",url:"https://doi.org/10.1073/pnas.1712489114"},
  vibrioMotor:{label:"Carroll et al., eLife (2020)",url:"https://doi.org/10.7554/eLife.61446"},
  bacillus:{label:"Terahara et al., Sci Rep (2017) — MotPS activation",url:"https://doi.org/10.1038/srep46081"},
  hierarchy:{label:"Fitzgerald et al., PLoS Genet (2014)",url:"https://doi.org/10.1371/journal.pgen.1004649"}
};

const categoryNames={control:"制御・配置",motor:"モーター",export:"輸送装置",rod:"ロッド",rings:"リング",hook:"フック",filament:"フィラメント"};
const stageNames=["発現・配置","MSリング","Cリング・輸送","ロッド","P/L・外周リング","フック","長さ制御","継ぎ手","フィラメント","回転機能"];
const coreRefs=[REF.pathway];

function p(key,gene,name,category,stage,endpoint,func,opts={}){
  return {key,gene,name,category,stage,endpoint,func,mode:opts.mode||"stop",impact:opts.impact??Math.min(stage+1,9),evidence:opts.evidence||"相同推定",refs:opts.refs||coreRefs,caution:opts.caution||"",orthologs:opts.orthologs||{}};
}

const entericCore = () => [
  p("flhDC","flhDC","マスター転写制御複合体","control",-1,"べん毛構造を形成しない","Class 2 遺伝子群の発現を開始する。",{evidence:"直接",refs:[REF.hierarchy],impact:0}),
  p("fliF","fliF","MSリングタンパク質","motor",0,"MSリング以前で停止","内膜中で基部形成の足場となる。",{evidence:"直接",impact:1}),
  p("fliG","fliG","ローター／スイッチタンパク質","motor",1,"初期基部で停止・不安定化","FliFに結合し、Cリング形成とトルク伝達を担う。",{evidence:"直接",impact:2}),
  p("fliM","fliM","スイッチ複合体タンパク質","motor",1,"Cリング形成不全","FliG/FliNとCリングを作り、回転方向を切り替える。",{evidence:"直接",impact:2}),
  p("fliN","fliN","Cリングタンパク質","motor",1,"Cリング形成不全","輸送装置との連結とスイッチ複合体形成に関与する。",{evidence:"直接",impact:2}),
  p("export","fliP/Q/R","膜内輸送ゲート","export",1,"MS/Cリング段階で停止","軸構成タンパク質を中心チャネルへ送り込む。",{evidence:"直接",impact:2}),
  p("flhAB","flhA/B","輸送装置・基質切替","export",1,"MS/Cリング段階で停止","III型輸送装置の膜成分として分泌と基質特異性切替を担う。",{evidence:"直接",impact:2}),
  p("fliHIJ","fliH/I/J","ATPase輸送複合体","export",1,"輸送効率が大幅低下","輸送基質をゲートへ供給する。欠損により少数のべん毛が残る場合がある。",{impact:2,caution:"FliH/I/J は条件により完全停止ではなく、低効率の輸送が残ることがあります。"}),
  p("rod","flgB/C/F","近位ロッドタンパク質","rod",2,"ロッド形成途中で停止","MSリングから遠位ロッドへ伸びる近位軸を作る。",{evidence:"直接",impact:3}),
  p("flgG","flgG","遠位ロッドタンパク質","rod",2,"遠位ロッドを形成できない","LPリングを貫く剛直な遠位ロッドを作る。",{evidence:"直接",impact:3,refs:[REF.pathway,REF.lp]}),
  p("flgI","flgI","Pリングタンパク質","rings",3,"ロッドまで；Pリングなし","ペプチドグリカン層の軸受を形成する。",{evidence:"直接",impact:4,refs:[REF.pathway,REF.lp]}),
  p("flgH","flgH","Lリングタンパク質","rings",4,"Pリングまで；Lリングなし","外膜側の軸受を形成する。",{evidence:"直接",impact:4,refs:[REF.pathway,REF.lp]}),
  p("flgD","flgD","フックキャップ／足場","hook",4,"ロッドまで；フックなし","FlgE重合の先端足場となる。",{evidence:"直接",impact:5,refs:[REF.flgd,REF.pathway]}),
  p("flgE","flgE","フックタンパク質","hook",4,"ロッドまで；フックなし","ロッドとフィラメントをつなぐ柔軟なフックを構成する。",{evidence:"直接",impact:5}),
  p("fliK","fliK","フック長制御・基質切替","hook",5,"polyhookを形成","フック長を測り、輸送基質を後期型へ切り替える。",{mode:"polyhook",evidence:"直接",impact:6,caution:"単純な停止ではなく、過長フックが伸長します。"}),
  p("flgKL","flgK/L","フック–フィラメント継ぎ手","filament",6,"フックまで；フィラメントなし","フック先端とフィラメント基部を接続する。",{evidence:"直接",impact:7}),
  p("fliD","fliD","フィラメントキャップ","filament",7,"無キャップの短い／不安定なフィラメント","先端でフラジェリンの重合を促進する。",{mode:"uncapped",evidence:"直接",impact:8,caution:"フラジェリンは分泌されますが、効率よく長いフィラメントになりません。"}),
  p("fliC","fliC","フラジェリン","filament",7,"フック・継ぎ手まで；フィラメントなし","らせん状フィラメントの主要構成単位。",{evidence:"直接",impact:8}),
  p("motAB","motA/B","H⁺駆動固定子","motor",8,"完成するが回転しない","イオン流をトルクへ変換し、ローターを駆動する。",{mode:"immotile",evidence:"直接",impact:9})
];

const species = {
  ecoli:{short:"E. coli",name:"Escherichia coli K-12",strain:"K-12型・周毛性・H⁺駆動",gram:"negative",distribution:"周毛性",proteins:entericCore()},
  salmonella:{short:"Salmonella",name:"Salmonella enterica",strain:"serovar Typhimurium・周毛性・H⁺駆動",gram:"negative",distribution:"周毛性",proteins:entericCore().map(x=>({...x,refs:x.refs.includes(REF.pathway)?x.refs:[REF.pathway,...x.refs]}))},
  vibrio:{short:"Vibrio",name:"Vibrio alginolyticus",strain:"極べん毛・膜鞘あり・Na⁺駆動",gram:"vibrio",distribution:"単極性",proteins:[
    p("flhF","flhF","極局在GTPase","control",8,"べん毛数減少・異所性形成","極でのべん毛形成位置と効率を決める。",{mode:"placement",evidence:"直接",impact:0,refs:[REF.vibrio],caution:"構築順序の停止ではなく、形成位置と本数の異常です。"}),
    p("flhG","flhG","べん毛数制御ATPase","control",8,"極べん毛が過剰化","FlhFを抑制して極べん毛数を制限する。",{mode:"placement",evidence:"直接",impact:0,refs:[REF.vibrio],caution:"欠損で構造が消えるのではなく、極での本数が増える典型的表現型です。"}),
    p("fliF","fliF","MSリングタンパク質","motor",0,"MSリング以前で停止","極モーターの内膜足場を形成する。",{evidence:"相同推定",impact:1,refs:[REF.vibrio]}),
    p("fliG","fliG","ロータータンパク質","motor",1,"初期基部で停止・不安定化","Cリング上部でNa⁺固定子からトルクを受ける。",{evidence:"直接",impact:2,refs:[REF.vibrioMotor]}),
    p("fliMN","fliM/N","スイッチ・Cリング","motor",1,"Cリング形成不全","回転方向切替と輸送装置連結を担う。",{evidence:"相同推定",impact:2,refs:[REF.vibrioMotor]}),
    p("export","fliP/Q/R","膜内輸送ゲート","export",1,"MS/Cリング段階で停止","軸構成タンパク質を中心チャネルへ輸送する。",{impact:2,refs:[REF.vibrio]}),
    p("flhAB","flhA/B","輸送装置・基質切替","export",1,"MS/Cリング段階で停止","べん毛III型輸送装置の膜成分。",{impact:2,refs:[REF.vibrio]}),
    p("rod","flgB/C/F/G","ロッドタンパク質群","rod",2,"ロッド形成途中で停止","基部から外膜方向へ伸びる駆動軸を形成する。",{impact:3,refs:[REF.vibrio]}),
    p("flgI","flgI","Pリングタンパク質","rings",3,"ロッドまで；Pリングなし","ペプチドグリカン層の軸受。",{impact:4,refs:[REF.vibrio,REF.lp]}),
    p("flgH","flgH","Lリングタンパク質","rings",4,"Pリングまで；Lリングなし","外膜側の軸受。",{impact:4,refs:[REF.vibrio,REF.lp]}),
    p("flgT","flgT","Hリング足場タンパク質","rings",4,"基部外周リングが不安定","Hリング形成と高トルク極モーターの安定化に必要。",{mode:"compromised",evidence:"直接",impact:4,refs:[REF.vibrio,REF.vibrioMotor],caution:"後期構造の完全な直線停止ではなく、外周リング欠損とべん毛形成効率低下として現れます。"}),
    p("motXY","motX/Y","Tリング・固定子組立因子","rings",8,"完成構造はあり得るが固定子装着不全","Tリングを形成し、PomA/PomB固定子を極モーターへ配置する。",{mode:"immotile",evidence:"直接",impact:9,refs:[REF.vibrioMotor]}),
    p("flgDE","flgD/E","フック足場／フック","hook",4,"ロッドまで；フックなし","フックの形成と重合を担う。",{impact:5,refs:[REF.vibrio]}),
    p("fliK","fliK","フック長制御・基質切替","hook",5,"polyhookを形成","フック長と後期基質輸送への切替を制御する。",{mode:"polyhook",impact:6,refs:[REF.vibrio]}),
    p("flgKL","flgK/L","フック–フィラメント継ぎ手","filament",6,"フックまで；フィラメントなし","フックと極フィラメントを接続する。",{impact:7,refs:[REF.vibrio]}),
    p("fliD","fliD","フィラメントキャップ","filament",7,"無キャップの短い／不安定なフィラメント","フィラメント先端でフラジェリンを組み込む。",{mode:"uncapped",impact:8,refs:[REF.vibrio]}),
    p("fliC","flaA","主要極フラジェリン","filament",7,"フィラメントが減少・形態異常","極べん毛フィラメントの主要フラジェリン。",{mode:"compromised",evidence:"直接",impact:8,refs:[REF.vibrio],caution:"Vibrioには複数の極フラジェリンがあるため、flaA単独欠損は必ずしも完全な無フィラメントになりません。"}),
    p("pomAB","pomA/B","Na⁺駆動固定子","motor",8,"完成するが回転しない","Na⁺流をトルクへ変換する極モーター固定子。",{mode:"immotile",evidence:"直接",impact:9,refs:[REF.vibrioMotor]})
  ]},
  bacillus:{short:"Bacillus",name:"Bacillus subtilis",strain:"subtilis 168/3610型・周毛性・Gram陽性",gram:"positive",distribution:"周毛性",proteins:[
    p("sigD","sigD","後期べん毛σ因子","control",7,"主にフィラメント形成前で停止","hagなど後期べん毛・運動遺伝子の転写を駆動する。",{evidence:"直接",impact:8,refs:[REF.hierarchy],caution:"初期基部構造は形成し得ますが、SigDレギュロン全体の影響を受けます。"}),
    p("fliF","fliF","MSリングタンパク質","motor",0,"MSリング以前で停止","Gram陽性型基部の内膜足場。",{impact:1}),
    p("fliG","fliG","ロータータンパク質","motor",1,"初期基部で停止・不安定化","固定子からトルクを受ける。",{impact:2}),
    p("fliMY","fliM/Y","スイッチ・Cリング","motor",1,"Cリング形成不全","B. subtilisではFliYがFliN相当の役割を分担する。",{evidence:"直接",impact:2,refs:[REF.bacillus]}),
    p("export","fliP/Q/R","膜内輸送ゲート","export",1,"MS/Cリング段階で停止","軸構成タンパク質を輸送する。",{impact:2}),
    p("flhAB","flhA/B","輸送装置・基質切替","export",1,"MS/Cリング段階で停止","輸送ゲート形成と基質切替を担う。",{impact:2}),
    p("rod","flgB/C/F/G","ロッドタンパク質群","rod",2,"ロッド形成途中で停止","厚いペプチドグリカン層を横切る軸を形成する。",{impact:3}),
    p("flgD","flgD","フックキャップ／足場","hook",3,"ロッドまで；フックなし","FlgE重合の先端足場。",{impact:5,refs:[REF.flgd]}),
    p("flgE","flgE","フックタンパク質","hook",3,"ロッドまで；フックなし","柔軟なフックを構成する。",{impact:5}),
    p("fliK","fliK","フック長制御・基質切替","hook",5,"polyhookを形成","フック長と輸送基質切替を制御する。",{mode:"polyhook",evidence:"相同推定",impact:6}),
    p("flgKL","flgK/L","フック–フィラメント継ぎ手","filament",6,"フックまで；フィラメントなし","フックとHagフィラメントを接続する。",{impact:7}),
    p("fliD","fliD","フィラメントキャップ","filament",7,"無キャップの短い／不安定なフィラメント","先端でHag重合を促進する。",{mode:"uncapped",impact:8}),
    p("fliC","hag","フラジェリン","filament",7,"フック・継ぎ手まで；フィラメントなし","フィラメントの主要構成単位。",{evidence:"直接",impact:8}),
    p("fliW","fliW","Hag翻訳制御因子","control",7,"フィラメント量・運動性が低下","CsrAを介してhag翻訳を調節する。",{mode:"compromised",evidence:"直接",impact:8,caution:"構造部品ではなく翻訳制御因子のため、培養条件で影響量が変わります。"}),
    p("motAB","motA/B","H⁺型固定子","motor",8,"構築は完成；MotPSが部分代替","主に低粘度条件でH⁺駆動トルクを生む。",{mode:"partial-motor",evidence:"直接",impact:9,refs:[REF.bacillus]}),
    p("motPS","motP/S","Na⁺型固定子","motor",8,"構築は完成；MotABが代替","高負荷・多糖条件などでNa⁺駆動に寄与する。",{mode:"partial-motor",evidence:"直接",impact:9,refs:[REF.bacillus]}),
    p("doubleStator","motAB + motPS","二固定子欠損","motor",8,"完成するが回転しない","両固定子を除くと構造は残るがトルクを発生できない。",{mode:"immotile",evidence:"直接",impact:9,refs:[REF.bacillus]})
  ]}
};

const orthologMap={
  fliF:{ecoli:"fliF",salmonella:"fliF",vibrio:"fliF",bacillus:"fliF"},
  fliG:{ecoli:"fliG",salmonella:"fliG",vibrio:"fliG",bacillus:"fliG"},
  fliMN:{ecoli:"fliM/N",salmonella:"fliM/N",vibrio:"fliM/N",bacillus:"fliM/Y"},
  export:{ecoli:"fliP/Q/R",salmonella:"fliP/Q/R",vibrio:"fliP/Q/R",bacillus:"fliP/Q/R"},
  flhAB:{ecoli:"flhA/B",salmonella:"flhA/B",vibrio:"flhA/B",bacillus:"flhA/B"},
  rod:{ecoli:"flgB/C/F/G",salmonella:"flgB/C/F/G",vibrio:"flgB/C/F/G",bacillus:"flgB/C/F/G"},
  flgE:{ecoli:"flgE",salmonella:"flgE",vibrio:"flgE",bacillus:"flgE"},
  fliK:{ecoli:"fliK",salmonella:"fliK",vibrio:"fliK",bacillus:"fliK"},
  flgKL:{ecoli:"flgK/L",salmonella:"flgK/L",vibrio:"flgK/L",bacillus:"flgK/L"},
  fliD:{ecoli:"fliD",salmonella:"fliD",vibrio:"fliD",bacillus:"fliD"},
  fliC:{ecoli:"fliC",salmonella:"fliC",vibrio:"flaA*",bacillus:"hag"},
  stator:{ecoli:"motA/B",salmonella:"motA/B",vibrio:"pomA/B",bacillus:"motA/B・motP/S"}
};

const compareGroups=[
  {id:"flhDC",label:"FlhD/FlhC｜マスター制御",category:"control",keys:["flhDC"]},
  {id:"sigD",label:"SigD｜後期σ因子",category:"control",keys:["sigD"]},
  {id:"flhF",label:"FlhF｜極局在",category:"control",keys:["flhF"]},
  {id:"flhG",label:"FlhG｜べん毛数制御",category:"control",keys:["flhG"]},
  {id:"fliW",label:"FliW｜フラジェリン翻訳制御",category:"control",keys:["fliW"]},
  {id:"fliF",label:"FliF｜MSリング",category:"motor",keys:["fliF"]},
  {id:"fliG",label:"FliG｜ローター",category:"motor",keys:["fliG"]},
  {id:"switchM",label:"FliM｜スイッチ・Cリング",category:"motor",keys:["fliM","fliMN","fliMY"]},
  {id:"switchN",label:"FliN / FliY｜Cリング",category:"motor",keys:["fliN","fliMN","fliMY"]},
  {id:"export",label:"FliP/Q/R｜膜内輸送ゲート",category:"export",keys:["export"]},
  {id:"flhAB",label:"FlhA/B｜輸送・基質切替",category:"export",keys:["flhAB"]},
  {id:"fliHIJ",label:"FliH/I/J｜ATPase輸送複合体",category:"export",keys:["fliHIJ"]},
  {id:"rodProx",label:"FlgB/C/F｜近位ロッド",category:"rod",keys:["rod"]},
  {id:"flgG",label:"FlgG｜遠位ロッド",category:"rod",keys:["flgG","rod"]},
  {id:"flgI",label:"FlgI｜Pリング",category:"rings",keys:["flgI"]},
  {id:"flgH",label:"FlgH｜Lリング",category:"rings",keys:["flgH"]},
  {id:"flgT",label:"FlgT｜Vibrio Hリング",category:"rings",keys:["flgT"]},
  {id:"motXY",label:"MotX/MotY｜Vibrio Tリング",category:"rings",keys:["motXY"]},
  {id:"flgD",label:"FlgD｜フックキャップ",category:"hook",keys:["flgD","flgDE"]},
  {id:"flgE",label:"FlgE｜フック",category:"hook",keys:["flgE","flgDE"]},
  {id:"fliK",label:"FliK｜フック長制御",category:"hook",keys:["fliK"]},
  {id:"flgKL",label:"FlgK/FlgL｜継ぎ手",category:"filament",keys:["flgKL"]},
  {id:"fliD",label:"FliD｜フィラメントキャップ",category:"filament",keys:["fliD"]},
  {id:"fliC",label:"FliC / FlaA / Hag｜フラジェリン",category:"filament",keys:["fliC"]},
  {id:"primaryStator",label:"MotA/B / PomA/B｜主要固定子",category:"motor",keys:["motAB","pomAB"]},
  {id:"altStator",label:"MotP/S｜Na⁺型固定子",category:"motor",keys:["motPS"]},
  {id:"doubleStator",label:"MotAB + MotPS｜二固定子欠損",category:"motor",keys:["doubleStator"]}
];

let state={species:"ecoli",selected:"flgE",filter:"all",query:""};
const $=s=>document.querySelector(s);

function init(){
  renderSpecies();renderFilters();renderCatalog();renderCompareOptions();selectProtein(state.selected);initPhenotypes();
  $("#proteinSearch").addEventListener("input",e=>{state.query=e.target.value.toLowerCase();renderCatalog()});
  $("#methodButton").addEventListener("click",()=>$("#methodDialog").showModal());
  $("#compareGene").addEventListener("change",renderCompare);
}

function renderSpecies(){
  $("#speciesTabs").innerHTML=Object.entries(species).map(([id,s])=>`<button class="species-tab ${id===state.species?'active':''}" data-species="${id}"><strong><i>${s.short}</i></strong><small>${s.distribution}</small></button>`).join("");
  document.querySelectorAll(".species-tab").forEach(b=>b.onclick=()=>{
    state.species=b.dataset.species;state.query="";$("#proteinSearch").value="";
    const keys=species[state.species].proteins.map(x=>x.key);if(!keys.includes(state.selected))state.selected=species[state.species].proteins[0].key;
    renderSpecies();renderCatalog();selectProtein(state.selected);renderCompare();initPhenotypes();
  });
  $("#strainNote").innerHTML=`<strong>${species[state.species].name}</strong><br>${species[state.species].strain}`;
}

function renderFilters(){
  const items=[["all","すべて"],...Object.entries(categoryNames)];
  $("#filterRow").innerHTML=items.map(([id,n])=>`<button class="filter-chip ${id===state.filter?'active':''}" data-filter="${id}">${n}</button>`).join("");
  document.querySelectorAll(".filter-chip").forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;renderFilters();renderCatalog()});
}

function renderCatalog(){
  const all=species[state.species].proteins;
  const q=state.query;
  const list=all.filter(x=>(state.filter==="all"||x.category===state.filter)&&(!q||`${x.gene} ${x.name} ${x.func}`.toLowerCase().includes(q)));
  $("#resultCount").textContent=`${list.length} / ${all.length}`;
  $("#proteinList").innerHTML=list.length?list.map(x=>`<button class="protein-card ${x.key===state.selected?'active':''}" aria-pressed="${x.key===state.selected}" data-key="${x.key}" title="${x.gene}"><span class="gene-badge">${x.gene.length>7?x.gene.slice(0,6)+"…":x.gene}</span><span><span class="protein-name">${x.name}</span><span class="protein-stage">${categoryNames[x.category]}</span></span><span class="protein-arrow">›</span></button>`).join(""):`<p style="color:var(--muted);padding:20px 8px;font-size:13px">該当するタンパク質がありません。</p>`;
  document.querySelectorAll(".protein-card").forEach(b=>b.onclick=()=>selectProtein(b.dataset.key));
}

function selectProtein(key){
  const item=species[state.species].proteins.find(x=>x.key===key)||species[state.species].proteins[0];
  state.selected=item.key;renderCatalog();renderDiagram(item);renderDetail(item);renderWildtypeComparison(item);
  renderReviewNotice();
  $("#endpointTitle").textContent=item.endpoint;
}

function stateFor(stage,item){
  if(item.mode==="wildtype")return "built";
  if(item.diagramStates?.[stage])return item.diagramStates[stage];
  // Rotation is a functional observation, not the final step of axial assembly.
  if(stage===9){const r=expectedPhenotypes(item).rotation;return r==='absent'?'affected':r==='present'?'built':'warn'}
  if(item.mode==='conditional')return stage>=item.impact?'warn':'built';
  if(item.mode==="immotile")return stage===9?"affected":"built";
  if(item.mode==="partial-motor")return stage===9?"warn":"built";
  if(item.mode==="placement")return stage===0?"warn":"built";
  if(item.mode==="compromised")return stage===item.impact?"warn":"built";
  if(item.mode==="polyhook"){if(stage<=5)return stage===5?"warn":"built";return "absent"}
  if(item.mode==="uncapped"){if(stage<=8)return stage===8?"warn":"built";return "absent"}
  if(stage<=item.stage)return "built";
  if(stage===item.impact)return "affected";
  return "absent";
}

function renderDiagram(item,target="#flagellumDiagram",rail="#stageRail"){
  cancelAnimationFrame(rotorFrames[target]);
  const s=species[state.species], gram=s.gram;
  const cls=n=>`component ${stateFor(n,item)}`;
  const outer=gram!=="positive";
  const vibrio=gram==="vibrio";
  const poly=item.mode==="polyhook";
  const canRotate=item.mode==="wildtype"||item.rotationConditional||expectedPhenotypes(item).rotation==='present';
  const filamentPath=item.mode==="uncapped"?"M360 176 C324 151 402 126 356 96 C331 80 383 63 360 47":"M360 176 C316 149 409 119 354 86 C309 59 407 34 360 4";
  const lipidHeads=(y,direction=1,start=70,end=650)=>Array.from({length:Math.floor((end-start)/18)},(_,i)=>{
    const x=start+i*18,neck=y+direction*5,tip=y+direction*12;
    return `<circle cx="${x}" cy="${y}" r="3.2" class="lipid-head"/><line x1="${x-2}" y1="${neck}" x2="${x-3}" y2="${tip}" class="lipid-tail"/><line x1="${x+2}" y1="${neck}" x2="${x+3}" y2="${tip}" class="lipid-tail"/>`;
  }).join("");
  const spokes=Array.from({length:12},(_,i)=>`<line x1="360" y1="445" x2="360" y2="420" stroke="#8cf1e5" stroke-width="4" transform="rotate(${i*30} 360 445)"/>`).join("");
  const root=$(target);
  root.removeAttribute("aria-labelledby");root.setAttribute("aria-label",item.mode==="wildtype"?"WT":"Δ"+item.gene);
  root.innerHTML=`
    <defs>
      <linearGradient id="cell" x1="0" x2="1"><stop stop-color="#0b2632"/><stop offset=".5" stop-color="#173d49"/><stop offset="1" stop-color="#0b2632"/></linearGradient>
      <linearGradient id="metal" x1="0" x2="1"><stop stop-color="#187f79"/><stop offset=".45" stop-color="#9bf3e7"/><stop offset=".58" stop-color="#47cbbd"/><stop offset="1" stop-color="#126660"/></linearGradient>
      <radialGradient id="ring" cx="48%" cy="35%"><stop stop-color="#b5fff6"/><stop offset=".38" stop-color="#49d6c7"/><stop offset="1" stop-color="#126e69"/></radialGradient>
      <linearGradient id="hook" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#126e69"/><stop offset=".48" stop-color="#9af0e5"/><stop offset="1" stop-color="#258e87"/></linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity=".55"/></filter>
      <filter id="softGlow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect x="45" y="385" width="640" height="130" rx="48" fill="url(#cell)" stroke="#315661" stroke-width="1.5"/>
    <path d="M70 474 Q180 455 280 478 T500 474 T650 475" fill="none" stroke="#4c8591" stroke-opacity=".15" stroke-width="25"/>
    ${outer?`<g><rect x="45" y="286" width="640" height="34" rx="15" fill="#12313c" stroke="#42616b"/>${lipidHeads(291,1)}${lipidHeads(315,-1)}</g><text x="62" y="281" class="membrane-label">OUTER MEMBRANE</text><rect x="45" y="340" width="640" height="13" rx="6" fill="#a7966e" fill-opacity=".42" stroke="#cbbf95" stroke-opacity=".45"/><path d="M55 346H675" stroke="#ead9a0" stroke-opacity=".28" stroke-dasharray="4 5"/><text x="62" y="337" class="membrane-label">PEPTIDOGLYCAN</text>`:`<g><rect x="45" y="313" width="640" height="48" rx="15" fill="#8f8264" fill-opacity=".34" stroke="#b8ab82" stroke-opacity=".55"/><path d="M55 323H675M55 335H675M55 347H675" stroke="#d4c693" stroke-opacity=".16" stroke-dasharray="7 5"/></g><text x="62" y="307" class="membrane-label">THICK PEPTIDOGLYCAN</text>`}
    <g><rect x="45" y="384" width="640" height="28" rx="13" fill="#17424d" stroke="#47717b"/>${lipidHeads(389,1)}${lipidHeads(407,-1)}</g><text x="62" y="380" class="membrane-label">CYTOPLASMIC MEMBRANE</text>
    ${vibrio?`<g class="${cls(4)}" filter="url(#shadow)"><path d="M326 291 Q360 260 394 291 L390 348 Q360 369 330 348Z" fill="#365f7e" fill-opacity=".25" stroke="#72a7ff" stroke-width="6"/><ellipse cx="360" cy="299" rx="61" ry="15" fill="none" stroke="#ffb766" stroke-width="8" class="${item.key==='flgT'?'warn':''}"/><ellipse cx="360" cy="324" rx="49" ry="12" fill="none" stroke="#72a7ff" stroke-width="7" class="${item.key==='motXY'?'affected':''}"/><ellipse cx="360" cy="299" rx="48" ry="8" class="protein-highlight"/></g>`:""}
    ${outer?`<g class="component ${item.key==='flgH'||item.key==='flgI'?'absent':stateFor(4,item)}" filter="url(#shadow)"><ellipse cx="360" cy="303" rx="39" ry="12" fill="url(#ring)"/><ellipse cx="360" cy="303" rx="24" ry="6" fill="#0b2029"/></g><g class="component ${item.key==='flgH'?'built':item.key==='flgI'?'absent':stateFor(4,item)}" filter="url(#shadow)"><ellipse cx="360" cy="348" rx="34" ry="11" fill="url(#ring)"/><ellipse cx="360" cy="348" rx="20" ry="5" fill="#0b2029"/></g>`:""}
    <g class="${cls(3)}" filter="url(#shadow)"><path d="M352 394V252H368V394Z" fill="url(#metal)"/><path d="M356 386V259" stroke="#d7fff9" stroke-opacity=".46" stroke-width="2"/><path d="M350 276H370M350 294H370M350 312H370M350 330H370M350 366H370" stroke="#0d6a65" stroke-width="2"/></g>
    <g class="${cls(1)}" filter="url(#shadow)"><ellipse cx="360" cy="397" rx="61" ry="20" fill="url(#ring)"/><ellipse cx="360" cy="397" rx="38" ry="10" fill="#0a2029"/><ellipse cx="360" cy="392" rx="48" ry="11" class="protein-highlight"/></g>
    <g class="${cls(2)}"><ellipse cx="360" cy="450" rx="49" ry="18" fill="#103b40" stroke="#238e87" stroke-width="8"/><g id="rotorBack"></g><ellipse cx="360" cy="441" rx="36" ry="12" fill="#091e28" stroke="#77dcd2" stroke-width="2"/><path d="M354 410V453H366V410Z" fill="url(#metal)"/><g id="rotorFront"></g></g>
    ${exportDrawing(item)}
    ${statorDrawing(item,gram==='positive',vibrio)}
    <g class="${cls(5)}" filter="url(#shadow)"><path d="M360 254 C${poly?'300 220 410 183 344 137':'318 236 319 199 360 180'}" fill="none" stroke="url(#hook)" stroke-width="16" stroke-linecap="round"/><path d="M360 254 C${poly?'300 220 410 183 344 137':'318 236 319 199 360 180'}" fill="none" stroke="#d8fffa" stroke-opacity=".45" stroke-width="3" stroke-linecap="round" stroke-dasharray="5 8"/></g>
    <g class="${cls(7)}" filter="url(#shadow)"><path d="M350 184L360 169L370 184L366 196H354Z" fill="#73a8ff"/><ellipse cx="360" cy="181" rx="13" ry="5" fill="none" stroke="#c5daff" stroke-width="2"/></g>
    ${vibrio?`<path d="${filamentPath}" fill="none" stroke="#72a7ff" stroke-width="22" stroke-opacity=".22" class="${cls(8)}"/>`:""}
    <g class="${cls(8)}" filter="url(#softGlow)"><path d="${filamentPath}" fill="none" stroke="#2a8f88" stroke-width="12" stroke-linecap="round"/><path d="${filamentPath}" fill="none" stroke="#a7fff4" stroke-width="5" stroke-linecap="round" stroke-dasharray="5 9"/></g>
    <g data-component="filament-cap" class="component ${item.key==='fliD'?'deleted':stateFor(8,item)}"><ellipse cx="360" cy="8" rx="12" ry="6" fill="#bf9ce7" stroke="#e2c9ff" stroke-width="2"/></g>
    ${['flgD','flgDE'].includes(item.key)?'<g data-component="hook-cap" class="component deleted"><ellipse cx="360" cy="180" rx="12" ry="6" fill="none" stroke="#ff9a92"/></g>':''}
    ${item.rotationConditional?`<text x="60" y="35" class="svg-label">${tr('ロッド構築済みの場合：回転可能','Rod-assembled case: rotation possible')}</text>`:''}
    <text x="455" y="82" class="svg-label">フィラメント</text><line x1="442" y1="86" x2="387" y2="86" stroke="#47616a"/>
    <text x="455" y="210" class="svg-label">フック</text><line x1="442" y1="214" x2="383" y2="229" stroke="#47616a"/>
    <text x="455" y="272" class="svg-label">ロッド</text><line x1="442" y1="276" x2="370" y2="276" stroke="#47616a"/>
    <text x="455" y="374" class="svg-label">MSリング</text><line x1="442" y1="378" x2="393" y2="391" stroke="#47616a"/>
    <text x="455" y="455" class="svg-label">Cリング</text><line x1="442" y1="459" x2="399" y2="459" stroke="#47616a"/>
    <text x="225" y="452" class="svg-label">固定子</text><line x1="282" y1="445" x2="296" y2="431" stroke="#47616a"/>
  `;
  root.innerHTML=root.innerHTML.replace(/id="([^"]+)"/g,(_,id)=>`id="${target.slice(1)}-${id}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${target.slice(1)}-${id})`);
  $(rail).innerHTML=stageNames.map((n,i)=>gram==="positive"&&i===4?"":`<div class="stage-item ${stateFor(i,item)}">${String(i+1).padStart(2,'0')} ${n}</div>`).join("");
  animateRotor(canRotate,root,target);
}

function renderDetail(item){
  const group=compareGroups.find(g=>g.keys.includes(item.key));
  const ortho=orthologMap[item.key]||Object.fromEntries(Object.keys(species).map(k=>[k,(group?compareItemFor(k,group.id):species[k].proteins.find(x=>x.key===item.key))?.gene||"—"]));
  $("#detailPanel").innerHTML=`
    <div class="detail-main"><span class="eyebrow">SELECTED DELETION</span><div class="detail-gene">Δ${item.gene}</div><div class="detail-name">${item.name}</div><span class="evidence"><i></i>${tr("モデル推定・原著照合待ち","Model inference · source audit pending")}</span><div class="endpoint-badge">${item.endpoint}</div></div>
    <div><h3>UniProt</h3><div class="uniprot-links">${geneNames(item).map(g=>`<a class="detail-source" href="https://www.uniprot.org/uniprotkb?query=${encodeURIComponent('(gene_exact:'+g+') AND (organism_name:"'+organismNames[state.species]+'")')}" target="_blank" rel="noopener noreferrer">${g} · UniProt検索 ↗</a>`).join('')}</div><p>菌種・遺伝子名で絞った対応候補。株と配列を確認してエントリーを選んでください。</p></div>
    <div><h3>通常の役割</h3><p>${item.func}</p></div>
    ${item.caution?`<div><h3>解釈上の注意</h3><p class="caution">${item.caution}</p></div>`:""}
    <div><h3>菌種間の対応</h3><div class="orthologs">${Object.entries(ortho).map(([k,v])=>`<span class="ortholog">${species[k].short}: ${v}</span>`).join("")}</div></div>
    ${renderEvidence(item)}`;
}

function renderCompareOptions(){
  $("#compareGene").innerHTML=Object.entries(categoryNames).map(([category,label])=>`<optgroup label="${label}">${compareGroups.filter(g=>g.category===category).map(g=>`<option value="${g.id}">${g.label}</option>`).join("")}</optgroup>`).join("");
  $("#compareGene").value="fliC";renderCompare();
}

function compareItemFor(speciesId,key){
  const group=compareGroups.find(g=>g.id===key);
  return group?group.keys.map(k=>species[speciesId].proteins.find(x=>x.key===k)).find(Boolean):null;
}

function renderCompare(){
  const key=$("#compareGene").value;
  $("#compareGrid").innerHTML=Object.entries(species).map(([id,s])=>{
    const x=compareItemFor(id,key);
    return `<article class="compare-card ${id===state.species?'active-species':''}"><h3><i>${s.short}</i> <small>· ${s.gram==='positive'?'Gram +':'Gram −'}</small></h3><div class="compare-gene">${x?.gene||'—'}</div><p class="${x?'':'compare-missing'}">${x?x.endpoint:'対応タンパク質を収載していません'}</p></article>`;
  }).join("");
}

const rotorFrames={};
function animateRotor(running,root,target){
  const back=root.querySelector('[id$="-rotorBack"]'),front=root.querySelector('[id$="-rotorFront"]');
  const units=Array.from({length:28},()=>{const el=document.createElementNS('http://www.w3.org/2000/svg','ellipse');return el});
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  function draw(t){
    // Fixed orthographic projection of rotation about the vertical shaft.
    // Negative angular velocity: CCW viewed from the extracellular side.
    const phase=running&&!reduced.matches?-t*.0015:0;
    units.map((el,i)=>{const a=i*Math.PI*2/units.length+phase,z=Math.sin(a);return {el,z,x:360+47*Math.cos(a),y:445+17*z}}).sort((a,b)=>a.z-b.z).forEach(({el,z,x,y})=>{
      el.setAttribute('cx',x);el.setAttribute('cy',y);el.setAttribute('rx',3.2+.6*z);el.setAttribute('ry',7+.8*z);el.setAttribute('fill',`hsl(173 58% ${48+18*z}%)`);el.setAttribute('stroke','#0f5755');el.setAttribute('stroke-width','.7');(z<0?back:front).appendChild(el);
    });
    if(running&&!reduced.matches)rotorFrames[target]=requestAnimationFrame(draw);
  }
  draw(0);
}
const organismNames={ecoli:'Escherichia coli',salmonella:'Salmonella enterica',vibrio:'Vibrio alginolyticus',bacillus:'Bacillus subtilis'};
function geneNames(item){
  if(item.key==='doubleStator')return ['motA','motB','motP','motS'];
  if(item.gene==='flhDC')return ['flhD','flhC'];
  const parts=item.gene.split('/');return parts.map((g,i)=>i&&g.length===1?parts[0].slice(0,-1)+g:g);
}
const phenotypeFields=[['rod','ロッド',{'present':'あり','absent':'なし'}],['hook','フック',{'present':'通常長','absent':'なし','long':'異常に長い'}],['filament','フィラメント',{'present':'あり','absent':'なし','abnormal':'短い／不安定'}],['rotation','モーター回転',{'present':'あり','absent':'なし','reduced':'条件依存／低下'}],['statorEngagement','固定子装着',{'present':'あり','partial':'一方のみ','absent':'なし'}],['exportGate','FliPQRゲート',{'present':'あり','absent':'なし'}],['exportPlatform','FlhAB構造',{'present':'あり','absent':'なし'}],['exportAtpase','FliHIJ複合体',{'present':'あり','absent':'なし'}],['placement','数・配置',{'abnormal':'異常'}]];
function initPhenotypes(){
  $('#phenotypeControls').innerHTML=phenotypeFields.map(([key,label,options])=>`<label>${label}<select id="phenotype-${key}"><option value="">未観察／不明</option>${Object.entries(options).map(([v,n])=>`<option value="${v}">${n}</option>`).join('')}</select></label>`).join('');
  phenotypeFields.forEach(([key])=>$('#phenotype-'+key).addEventListener('change',renderPredictions));
  $('#resetPhenotype').onclick=()=>{phenotypeFields.forEach(([key])=>$('#phenotype-'+key).value='');renderPredictions()};renderPredictions();
}
function expectedPhenotypes(item,observed={}){
  if(item.phenotypes){
    const f={...item.phenotypes};
    if(item.rotationConditional&&observed.rod==='present')f.rotation='present';
    return {...f,...componentPhenotypes(item,observed)};
  }
  const f={};
  if(item.mode==='stop'){
    f.rod=item.stage>=3?'present':'absent';f.hook=item.stage>=5?'present':'absent';f.filament=item.stage>=8?'present':'absent';
    // An absent filament does not establish whether the basal motor rotates.
    if(['flhDC','fliF','fliG','fliM','fliN','fliMN','fliMY'].includes(item.key))f.rotation='absent';
  }
  if(['immotile','partial-motor','placement'].includes(item.mode))Object.assign(f,{rod:'present',hook:'present',filament:'present'});
  if(item.mode==='immotile')f.rotation='absent';
  // An alternative stator may fully compensate; do not assert reduced speed.
  if(item.mode==='placement')f.placement='abnormal';
  if(item.mode==='polyhook')Object.assign(f,{rod:'present',hook:'long',filament:'absent'});
  if(item.mode==='uncapped')Object.assign(f,{rod:'present',hook:'present',filament:'abnormal'});
  if(item.mode==='compromised'&&item.impact===8)f.filament='abnormal';
  if(item.key==='fliHIJ')return {...(observed.rod==='present'?{rotation:'present'}:{}),...componentPhenotypes(item,observed)}; // A completed rod is a required condition here.
  if(item.category==='rod')delete f.rod; // A partial rod is not equivalent to no rod.
  return {...f,...componentPhenotypes(item,observed)};
}
function renderPredictions(){
  const observations=phenotypeFields.filter(([key])=>$('#phenotype-'+key)?.value).map(([key,label,options])=>({key,label,value:$('#phenotype-'+key).value,options}));
  if(!observations.length){renderNextObservations(null);$('#phenotypeResults').innerHTML='<p>表現型を選ぶと候補と照合根拠が表示されます。</p>';return}
  const observed=Object.fromEntries(observations.map(o=>[o.key,o.value]));
  const ranked=species[state.species].proteins.map(item=>{const f=expectedPhenotypes(item,observed),match=[],conflict=[],unknown=[];observations.forEach(o=>{if(!f[o.key])unknown.push(o.label);else if(f[o.key]===o.value)match.push(o.label);else conflict.push(o.label+'：モデルでは'+o.options[f[o.key]])});return {item,match,conflict,unknown}}).sort((a,b)=>a.conflict.length-b.conflict.length||b.match.length-a.match.length);
  renderNextObservations(ranked);
  $('#phenotypeResults').innerHTML=`<p>${species[state.species].short} · ${observations.length}項目で照合。矛盾が少ない順、次に一致が多い順（同点は同順位）。「未判定」は一致に数えません。</p>`+ranked.map((r,i)=>`<button type="button" class="prediction-card" data-candidate="${r.item.key}"><strong>Δ${r.item.gene}</strong><span>一致 ${r.match.length} ／ 矛盾 ${r.conflict.length} ／ 未判定 ${r.unknown.length}</span><small>${r.item.endpoint}</small><small>${r.match.length?'一致：'+r.match.join('・')+'。 ':''}${r.conflict.length?'矛盾：'+r.conflict.join('、')+'。 ':''}${r.unknown.length?'未判定：'+r.unknown.join('・'):''}</small></button>`).join('');
  document.querySelectorAll('[data-candidate]').forEach(b=>b.onclick=()=>{selectProtein(b.dataset.candidate);$('#detailPanel').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'})});
  const selected=species[state.species].proteins.find(x=>x.key===state.selected);
  if(selected)renderDetail(selected);
}
applyCatalogAudit();
AssemblyI18n.start();
init();
