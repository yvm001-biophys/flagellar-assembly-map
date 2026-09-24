// Publication review, 2026-09-23. Inference rules are not experimental records.
// Explicit phenotype overrides are intentionally conservative. Missing = unknown.
function applyCatalogAudit(){
 const sources={
  rod:{label:'Burrage et al., J Bacteriol (2018) — B. subtilis rod',url:'https://journals.asm.org/doi/10.1128/jb.00425-18'},
  hook:{label:'Molecular Characterization of the Flagellar Hook in B. subtilis (2012)',url:'https://journals.asm.org/doi/10.1128/jb.00444-12'},
  phase:{label:'Kutsukake et al., J Bacteriol (2006) — Salmonella phase variation',url:'https://journals.asm.org/doi/10.1128/jb.188.3.950-957.2006'},
  cap:{label:'Flagellar growth in a filament-less Salmonella fliD mutant (1993)',url:'https://pubmed.ncbi.nlm.nih.gov/8407873/'},
  polar:{label:'Kusumoto et al., Microbiology (2008) — FlhF / FlhG',url:'https://doi.org/10.1099/mic.0.2007/012641-0'},
  flagellin:{label:'V. alginolyticus filament structure, Nat Commun (2026), Fig. 2',url:'https://www.nature.com/articles/s41467-026-71203-7'},
  fliW:{label:'Mukherjee et al., Mol Microbiol (2011) — FliW / CsrA',url:'https://doi.org/10.1111/j.1365-2958.2011.07822.x'},
  switch:{label:'Organization of the Flagellar Switch Complex of B. subtilis (2019)',url:'https://journals.asm.org/doi/10.1128/jb.00626-18'}
 };
 const get=(s,k)=>species[s].proteins.find(p=>p.key===k);
 const update=(s,k,patch,ja,en)=>{
  const x=get(s,k);Object.assign(x,patch);
  if(ja)Object.assign(x,ja);
  if(en)x.en={...x.en,...en};return x;
 };
 for(const [id,s] of Object.entries(species))for(const x of s.proteins){
  x.speciesId=id;x.evidence='model';
  if(x.key==='fliD'){
   Object.assign(x,{mode:'stop',stage:7,impact:8});
   x.endpoint='フック・継ぎ手まで；フィラメントなし';
   x.caution='典型的な完全欠損モデルではフィラメントを形成しません。短いフィラメントを既定の表現型とはしません。菌種・変異条件への適用は別途確認が必要です。';
   x.en={caution:'The default null-deletion model has no filament, rather than a short filament. Applicability depends on species and mutation conditions.'};
   x.refs=id==='salmonella'?[sources.cap]:id==='ecoli'?[sources.cap,REF.pathway]:[];
  }
  if(x.key==='fliHIJ'){x.mode='conditional';x.impact=2;x.diagramStates={1:'built'};x.refs=[]}
  if(['export','flhAB'].includes(x.key))x.diagramStates={2:'warn'}; // C ring and export gate cannot share a binary loss state.
 }
 update('salmonella','fliC',{mode:'conditional',impact:8,phenotypes:{rod:'present',hook:'present'},refs:[sources.phase]},
  {endpoint:'フィラメントの有無はFljB発現相に依存',caution:'TyphimuriumではfliCとfljBを交互に発現します。fliC単独欠損を無フィラメントと断定できません。相固定株・fljB欠損背景を確認してください。'},
  {endpoint:'Filament outcome depends on the FljB expression phase',caution:'Typhimurium alternates fliC and fljB expression. A single fliC deletion does not establish filament absence. Check phase locking and the fljB background.'});
 update('bacillus','rod',{gene:'flgB/flgC/flhO/flhP',refs:[sources.rod]});
 update('bacillus','fliMY',{refs:[sources.switch]});
 for(const k of ['flgD','flgE','fliK','sigD'])get('bacillus',k).refs=[sources.hook];
 // Do not present an E. coli regulatory paper as evidence for Bacillus SigD.
 update('bacillus','sigD',{diagramStates:{6:'warn',7:'warn'},phenotypes:{rod:'present',filament:'absent'}},
  {caution:'フック形成は報告されていますが、通常長を保証しません。継ぎ手・固定子など後期遺伝子への影響も含むため、単一段階での停止ではありません。'},
  {caution:'Hook assembly has been reported, but normal hook length is not established here. Effects extend to other late genes; this is not arrest at a single structural step.'});
 update('bacillus','flgD',{diagramStates:{5:'warn'},phenotypes:{rod:'present',filament:'absent'}},
  {endpoint:'フック完成不全；フィラメントなし',caution:'原著ではFlgE染色に少数の点状像もあり、フック材料が完全にゼロとは断定しません。'},
  {endpoint:'Defective hook completion; no filament',caution:'Occasional FlgE-staining puncta were reported. Complete absence of hook material is not assumed.'});
 get('bacillus','fliW').refs=[sources.fliW];
 for(const k of ['motAB','motPS']){
  const x=get('bacillus',k);x.caution='残存固定子の寄与はNa⁺、粘度、負荷、発現量に依存します。単独欠損から回転速度低下を一意に予測しません。';
  x.en={caution:'Compensation depends on sodium, viscosity, load and expression. A single stator-system deletion does not uniquely predict reduced rotation.'};
 }
 update('vibrio','flhF',{mode:'conditional',impact:0,diagramStates:{8:'absent'},phenotypes:{filament:'absent',placement:'abnormal'},refs:[sources.polar]},
  {endpoint:'極べん毛形成を喪失；残存基部は未判定',caution:'V. alginolyticusのflhF欠損では無極べん毛が報告されています。異所性べん毛の知見をflhF単独欠損へ一律に当てはめません。側べん毛は対象外です。'},
  {endpoint:'Loss of polar flagellation; residual basal structures unknown',caution:'Loss of polar flagella is reported for V. alginolyticus flhF deletion. Ectopic flagellation is not assumed for this single deletion. Lateral flagella are outside this model.'});
 get('vibrio','flhG').refs=[sources.polar];
 get('vibrio','flhG').phenotypes={placement:'abnormal'};
 get('vibrio','motXY').refs=[REF.vibrio];
 update('vibrio','fliC',{gene:'flaD2',mode:'conditional',impact:8,phenotypes:{},refs:[sources.flagellin]},
  {endpoint:'極べん毛依存の運動性を喪失；形態は未判定',caution:'2026年原著のΔlafK背景でΔflaD2の運動性喪失を報告。運動性喪失だけからフィラメント消失やモーター停止を推定しません。旧名称・株差を確認してください。'},
  {endpoint:'Loss of polar-flagellum-dependent motility; morphology unknown',caution:'The 2026 study reports loss of motility for ΔflaD2 in a ΔlafK background. Motility loss alone does not establish filament absence or motor arrest. Check strain-specific nomenclature.'});
 orthologMap.rod.bacillus='flgB/flgC/flhO/flhP';
 orthologMap.flgG={ecoli:'flgG',salmonella:'flgG',vibrio:'flgG',bacillus:'flhP'};
 orthologMap.fliC.vibrio='flaD2 (2026 study)';
 orthologMap.fliC.salmonella='fliC / fljB (phase variation)';
 compareGroups.find(g=>g.id==='fliC').label='FliC / FlaD2 / Hag｜フラジェリン';
 compareGroups.find(g=>g.id==='rodProx').label='FlgB/C/F · FlhO/P｜ロッド群';
 // Remove misleading, unrelated default references; empty is better than false support.
 for(const x of species.bacillus.proteins)if(x.refs.length===1&&x.refs[0]===REF.pathway)x.refs=[];
 get('salmonella','flhDC').refs=[REF.pathway];
 for(const x of species.vibrio.proteins)if(['fliD','flgDE','fliK','flgKL','export','flhAB'].includes(x.key))x.refs=[];
 get('bacillus','rod').auditNote={ja:'原著はFlgB→FlgC→FlhO→FlhPの順序を解析しています。群内の各欠損を同一のロッド残存状態とはみなしません。',en:'The study resolves the rod order FlgB → FlgC → FlhO → FlhP. Deletions within this group need not leave identical rod intermediates.'};
 get('bacillus','sigD').auditNote={ja:'2012年原著 Fig. 2–3：sigD変異株のフィラメント欠如とフック染色を記載。正常長の定量を意味しません。',en:'2012 paper, Figs. 2–3: filament loss and hook staining in sigD mutants. This does not establish a normal hook-length distribution.'};
 get('vibrio','fliC').auditNote={ja:'2026年原著 Fig. 2e–f：ΔlafK背景の単独フラジェリン欠損を運動性で比較。図から基部回転は判定できません。',en:'2026 paper, Fig. 2e–f: motility of individual flagellin deletions in a ΔlafK background. Basal motor rotation cannot be inferred from this assay.'};
 // Rod-complete axial mutants retain rotation capability when the motor and
 // ion supply are intact. Export ATPase loss is a conditional assembly case.
 for(const s of Object.values(species))for(const x of s.proteins){
  if(['flgD','flgE','flgDE','fliK','flgKL','fliD'].includes(x.key)){
   x.phenotypes={...expectedPhenotypes(x),rotation:'present'};
   x.caution+=' ロッドまで構築され、固定子と駆動力が保たれれば、フック・後期構造の欠損でも基部モーターは回転可能です。';
   x.en={...x.en,caution:(x.en?.caution||'')+' With an assembled rod and intact stators and ion motive force, the basal motor remains rotation-capable despite loss of hook or later axial structures.'};
  }
  if(x.key==='fliHIJ'){
   x.rotationConditional=true;x.diagramStates={1:'built',2:'built',3:'built'};
   x.caution='FliH/Iの欠損は輸送・構築効率に影響しますが、ロッドまで構築されたモーターの回転を直接禁止しません。図はロッド構築済みの場合です。FliH/I/J群の各単独欠損の構築効率は同一とは限りません。';
   x.en={...x.en,caution:'FliH/I loss affects export and assembly efficiency but does not itself prevent rotation of a rod-complete motor. The diagram shows the rod-assembled case. Individual FliH/I/J deletions need not have identical assembly efficiencies.'};
  }
 }
 // Filament assembly and torque generation are distinct: model an intact,
 // energized basal motor as rotation-capable after flagellin deletion.
 for(const s of Object.values(species)){
  const x=s.proteins.find(p=>p.key==='fliC');
  x.phenotypes={...expectedPhenotypes(x),rotation:'present'};
  x.caution+=' フラジェリン欠損でも固定子と基部モーターは残存し、駆動イオン条件が満たされれば回転可能です。遊泳の有無とは区別します。';
  x.en={...x.en,caution:(x.en?.caution||'')+' Flagellin deletion preserves the stator and basal motor in this model. Rotation remains possible with an intact, energized motor; swimming is a separate outcome.'};
 }
}
