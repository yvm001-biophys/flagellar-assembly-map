// Browserless regression checks. Does not establish scientific predictive accuracy.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path');
const elements=new Map();let reduced=false,frames=0;
class Element{
 constructor(){this.nodeType=1;this.tagName='DIV';this.childNodes=[];this.attrs={};this.value='';this.textContent='';this.innerHTML='';this.dataset={}}
 setAttribute(k,v){this.attrs[k]=String(v)}getAttribute(k){return this.attrs[k]}hasAttribute(k){return k in this.attrs}removeAttribute(k){delete this.attrs[k]}
 appendChild(x){this.childNodes.push(x);return x}addEventListener(){}scrollIntoView(){}
 querySelector(s){return new Element()}querySelectorAll(){return []}
}
const el=s=>{if(!elements.has(s))elements.set(s,new Element());return elements.get(s)};
const document={body:new Element(),documentElement:{},querySelector:el,querySelectorAll:()=>[],createElement:()=>new Element(),createElementNS:()=>new Element()};
const c=vm.createContext({document,window:{matchMedia:()=>({matches:reduced})},MutationObserver:class{observe(){}},requestAnimationFrame:()=>++frames,cancelAnimationFrame(){},console,assert});
for(const f of ['locale','research','audit','components','app'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f+'.js'),'utf8'),c,{filename:f+'.js'});
vm.runInContext(`
const get=(s,k)=>species[s].proteins.find(p=>p.key===k);
assert.equal(AssemblyI18n.language,'en');
assert.equal(compareItemFor('ecoli','flgG').gene,'flgG');
assert.equal(compareItemFor('salmonella','flgG').gene,'flgG');
assert.equal(get('vibrio','fliC').gene,'flaD2');
assert.deepEqual(Array.from(geneNames(get('bacillus','rod'))),['flgB','flgC','flhO','flhP']);
assert.equal(expectedPhenotypes(get('salmonella','fliC')).filament,undefined);
assert.equal(expectedPhenotypes(get('vibrio','fliC')).rotation,'present');
for(const sid of Object.keys(species)){
 assert.equal(expectedPhenotypes(get(sid,'fliC')).rotation,'present');
 assert.equal(statorState(get(sid,'fliC'),sid==='vibrio'?'pomAB':'motAB'),'built');
}
assert.equal(statorState(get('ecoli','motAB'),'motAB'),'deleted');
assert.equal(statorState(get('vibrio','pomAB'),'pomAB'),'deleted');
assert.equal(statorState(get('bacillus','motAB'),'motPS'),'built');
assert.equal(statorState(get('bacillus','motPS'),'motAB'),'built');
assert.equal(statorState(get('bacillus','doubleStator'),'motPS'),'deleted');
assert.equal(exportState(get('ecoli','export'),'export'),'deleted');
assert.equal(exportState(get('ecoli','flhAB'),'flhAB'),'deleted');
assert.equal(exportState(get('ecoli','fliHIJ'),'fliHIJ'),'deleted');
assert.equal(exportState(get('ecoli','export'),'fliHIJ'),'built');
assert.ok(exportDrawing(get('ecoli','export')).includes('data-component="export-gate" class="component deleted"'));
assert.equal(expectedPhenotypes(get('vibrio','flhF')).filament,'absent');
assert.equal(expectedPhenotypes(get('ecoli','fliD')).filament,'absent');
assert.equal(expectedPhenotypes(get('salmonella','fliD')).filament,'absent');
assert.equal(expectedPhenotypes(get('ecoli','export')).rotation,undefined);
assert.equal(expectedPhenotypes(get('ecoli','rod')).rod,undefined);
assert.equal(expectedPhenotypes(get('bacillus','motAB')).rotation,undefined);
assert.equal(expectedPhenotypes(get('bacillus','motPS')).rotation,undefined);
assert.equal(expectedPhenotypes(get('bacillus','doubleStator')).rotation,'absent');
assert.equal(expectedPhenotypes(get('ecoli','motAB')).rotation,'absent');
assert.equal(expectedPhenotypes(get('bacillus','sigD')).hook,undefined);
assert.equal(expectedPhenotypes(get('ecoli','fliHIJ')).rotation,undefined);
assert.equal(expectedPhenotypes(get('ecoli','fliHIJ')).exportAtpase,'absent');
assert.equal(expectedPhenotypes(get('ecoli','fliHIJ')).exportGate,'present');
assert.equal(expectedPhenotypes(get('bacillus','motAB')).statorEngagement,'partial');
assert.equal(expectedPhenotypes(get('bacillus','motPS')).statorEngagement,'partial');
assert.equal(expectedPhenotypes(get('bacillus','doubleStator')).statorEngagement,'absent');
assert.equal(expectedPhenotypes(get('ecoli','motAB')).statorEngagement,'absent');
assert.equal(expectedPhenotypes(get('ecoli','fliC')).statorEngagement,'present');
assert.equal(expectedPhenotypes(get('ecoli','export')).exportGate,'absent');
assert.equal(expectedPhenotypes(get('ecoli','flhAB')).exportPlatform,'absent');
assert.equal(candidatePartition([get('ecoli','fliHIJ'),get('ecoli','motAB')],'rotation',{rod:'present'}).groups.present[0].key,'fliHIJ');
assert.equal(get('ecoli','fliHIJ').rotationConditional,true);
assert.equal(expectedPhenotypes(get('ecoli','flgH')).pRing,'present');
assert.equal(expectedPhenotypes(get('ecoli','flgH')).lRing,'absent');
assert.equal(expectedPhenotypes(get('ecoli','flgI')).pRing,'absent');
assert.equal(expectedPhenotypes(get('ecoli','flgI')).lRing,'absent');
assert.equal(expectedPhenotypes(get('bacillus','flgD')).pRing,undefined);
assert.equal(phenotypeFields.find(f=>f[0]==='hook')[2].present,'Present (length unknown)');
assert.equal(phenotypeFields.find(f=>f[0]==='filament')[2].abnormal,'Reduced / abnormal');
assert.equal(stateFor(3,get('ecoli','fliHIJ')),'built');
for(const sid of Object.keys(species)){
 const item=get(sid,'fliHIJ');if(!item)continue;
 assert.equal(expectedPhenotypes(item).rotation,undefined);
 assert.equal(expectedPhenotypes(item,{rod:'absent'}).rotation,undefined);
 assert.equal(expectedPhenotypes(item,{rod:'present'}).rotation,'present');
 state.species=sid;selectProtein(item.key);
 assert.ok($('#flagellumDiagram').innerHTML.includes('Rod-assembled case: rotation possible'));
 $('#phenotype-rod').value='present';$('#phenotype-rotation').value='present';renderPredictions();
 const card=$('#phenotypeResults').innerHTML.split('data-candidate="fliHIJ"')[1]?.split('</button>')[0];
 assert.ok(/一致 [12]/.test(card||''),sid+' missing conditional match');
 assert.ok(card.includes('矛盾 0'),sid+' inconsistent conditional match');
 assert.ok($('#detailPanel').innerHTML.includes('FliH/I/J group: rotation is matched'));
 $('#phenotype-rod').value='';$('#phenotype-rotation').value='';
}
for(const sid of Object.keys(species))for(const k of ['flgD','flgE','flgDE','fliK','flgKL','fliD']){
 const item=get(sid,k);if(item)assert.equal(expectedPhenotypes(item).rotation,'present');
}
const part=candidatePartition([{phenotypes:{hook:'present'}},{phenotypes:{hook:'absent'}},{phenotypes:{}}],'hook');
assert.equal(part.separated,1);assert.equal(part.unknown.length,1);
let total=0;
for(const [sid,s] of Object.entries(species)){
 state.species=sid;
 assert.equal(new Set(s.proteins.map(p=>p.key)).size,s.proteins.length);
 for(const item of s.proteins){
  total++;selectProtein(item.key);
  for(const f of ['name','func','endpoint']){assert.equal(typeof item[f],'string',sid+item.key+f);assert.ok(item[f].length);assert.ok(!/[ぁ-んァ-ヶ一-龠]/.test(item[f]),sid+item.key+f)}
  const phenotype=expectedPhenotypes(item);
  const withRod=expectedPhenotypes(item,{rod:'present'});
  const components={exportGate:'export-gate',exportPlatform:'export-platform',exportAtpase:'export-atpase'};
  for(const [field,component] of Object.entries(components)){
   const klass=$('#flagellumDiagram').innerHTML.match(new RegExp('data-component="'+component+'" class="component ([a-z]+)"'))?.[1];
   assert.equal(withRod[field],klass==='built'?'present':['deleted','absent'].includes(klass)?'absent':undefined,sid+item.key+' '+field+' visual mismatch');
  }
  if(sid!=='bacillus'){
   const rings=[...$('#flagellumDiagram').innerHTML.matchAll(/<g class="component ([a-z]+)"[^>]*><ellipse cx="360" cy="(303|348)"/g)].map(m=>m[1]);
   assert.equal(withRod.lRing,rings[0]==='built'?'present':rings[0]==='absent'?'absent':undefined,sid+item.key+' L ring visual mismatch');
   assert.equal(withRod.pRing,rings[1]==='built'?'present':rings[1]==='absent'?'absent':undefined,sid+item.key+' P ring visual mismatch');
  }
  const systems=sid==='bacillus'?['motAB','motPS']:[sid==='vibrio'?'pomAB':'motAB'];
  const statuses=systems.map(system=>$('#flagellumDiagram').innerHTML.match(new RegExp('data-component="stator-'+system+'" class="component ([a-z]+)"'))?.[1]);
  const occupancy=statuses.every(s=>s==='built')?'present':statuses.every(s=>['absent','deleted'].includes(s))?'absent':statuses.includes('built')&&statuses.includes('deleted')?'partial':undefined;
  assert.equal(withRod.statorEngagement,occupancy,sid+item.key+' stator visual mismatch');
  for(const [key,value] of Object.entries(phenotype))assert.ok(phenotypeFields.find(f=>f[0]===key)?.[2]?.[value],sid+' '+item.key+' '+key+'='+value);
  if(phenotype.rotation==='present')assert.equal(stateFor(9,item),'built',sid+item.key+' rotation mismatch');
  if(phenotype.rotation==='absent')assert.equal(stateFor(9,item),'affected',sid+item.key+' motor mismatch');
  if(phenotype.hook==='absent')assert.notEqual(stateFor(5,item),'built',sid+item.key+' hook mismatch');
  if(phenotype.filament==='absent')assert.notEqual(stateFor(8,item),'built',sid+item.key+' filament mismatch');
  for(let i=0;i<10;i++)assert.ok(['built','affected','absent','warn'].includes(stateFor(i,item)));
  for(const selector of ['#flagellumDiagram','#detailPanel','#wildtypeDifferences'])assert.ok(!$(selector).innerHTML.includes('undefined'),sid+item.key+selector);
  const ids=['#flagellumDiagram','#wildtypeDiagram','#mutantDiagram'].flatMap(s=>[...$(s).innerHTML.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
  assert.equal(new Set(ids).size,ids.length);
 }
 for(const item of s.proteins){selectProtein(item.key);assert.equal($('#compareGene').value,compareGroupFor(item).id,sid+item.key+' comparison not synced')}
 for(const group of compareGroups){$('#compareGene').value=group.id;selectComparedGene();assert.equal($('#compareGene').value,group.id,group.id+' comparison lost');assert.ok(group.keys.includes(state.selected),group.id+' selected deletion not synced');assert.ok(!$('#compareGrid').innerHTML.includes('undefined'));state.species=sid;renderSpecies();initPhenotypes()}
 // Each possible single observation must render without stale / invalid states.
 for(const [key,,options] of phenotypeFields)for(const value of Object.keys(options)){
  phenotypeFields.forEach(([k])=>$('#phenotype-'+k).value='');$('#phenotype-'+key).value=value;renderPredictions();
  assert.ok(!$('#phenotypeResults').innerHTML.includes('undefined'));
 }
}
state.species='salmonella';state.selected='fliC';$('#phenotype-hook').value='present';
state.species='bacillus';initPhenotypes();assert.ok(!$('#phenotypeControls').innerHTML.includes('phenotype-pRing'));assert.ok(!$('#phenotypeControls').innerHTML.includes('phenotype-lRing'));
state.species='ecoli';initPhenotypes();assert.ok($('#phenotypeControls').innerHTML.includes('phenotype-pRing'));
$('#phenotype-rod').value='present';renderPredictions();$('#resetPhenotype').onclick();assert.ok($('#detailPanel').innerHTML.includes('Evidence by phenotype'));
state.species='salmonella';state.selected='fliC';$('#phenotype-hook').value='present';
AssemblyI18n.setLanguage('ja');assert.equal($('#phenotype-hook').value,'present');assert.ok(get('salmonella','fliC').endpoint.includes('FljB'));
AssemblyI18n.setLanguage('en');assert.equal($('#phenotype-hook').value,'present');assert.ok(get('salmonella','fliC').endpoint.includes('FljB'));
assert.ok(!get('bacillus','rod').refs.some(r=>r===REF.pathway));
console.log('PASS: '+total+' catalog entries; four-species rendering; phenotype states; source corrections; English/Japanese roundtrip; unique SVG IDs.');
`,c);
reduced=true;const before=frames;vm.runInContext(`animateRotor(true,document.createElement('svg'),'test')`,c);assert.equal(frames,before);
console.log('PASS: reduced-motion preference prevents repeated animation frames.');
