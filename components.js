// Structural occupancy is independent of motor rotation and axial completion.
function statorState(item,system){
 if(item.mode==='wildtype')return 'built';
 if(item.key===system||item.key==='doubleStator')return 'deleted';
 if(item.key==='motXY')return 'absent';
 if(['flhDC','fliF','fliG','fliM','fliN','fliMN','fliMY'].includes(item.key))return 'absent';
 if(item.key==='flhF'||item.key==='sigD')return 'warn';
 return 'built';
}
// The phenotype finder reads the same occupancy states as the SVG. Here
// "present" means modeled recruitment/assembly, not cellular protein level.
function componentPhenotypes(item,observed={}){
 const systems=item.speciesId==='bacillus'?['motAB','motPS']:[item.speciesId==='vibrio'?'pomAB':'motAB'];
 const stators=systems.map(system=>statorState(item,system));
 const occupancy={built:'present',absent:'absent',deleted:'absent'};
 const f={};
 for(const [field,part] of [['exportGate','export'],['exportPlatform','flhAB'],['exportAtpase','fliHIJ']]){
  const value=occupancy[exportState(item,part)];if(value)f[field]=value;
 }
 if(item.rotationConditional&&!observed.rod) return f;
 if(stators.every(s=>s==='built'))f.statorEngagement='present';
 else if(stators.every(s=>s==='absent'||s==='deleted'))f.statorEngagement='absent';
 else if(stators.some(s=>s==='built')&&stators.some(s=>s==='deleted'))f.statorEngagement='partial';
 return f;
}
function statorDrawing(item,isBacillus,isVibrio){
 const systems=isBacillus?['motAB','motPS']:[isVibrio?'pomAB':'motAB',isVibrio?'pomAB':'motAB'];
 return systems.map((system,i)=>{
  const x=i?405:281,status=statorState(item,system),label={motAB:'MotAB',motPS:'MotPS',pomAB:'PomAB'}[system];
  return `<g data-component="stator-${system}" class="component ${status}"><path d="M${x} 388Q${x+17} 379 ${x+34} 388V424Q${x+17} 435 ${x} 424Z" fill="#c77f46" stroke="#ffbf73" stroke-width="3"/><path d="M${x+9} 390V352H${x+25}V390" fill="none" stroke="#ffbf73" stroke-width="5"/></g><text x="${i?445:228}" y="416" class="svg-label">${label}</text>`;
 }).join('');
}
function exportState(item,part){
 if(item.key===part)return 'deleted';
 if(['flhDC','fliF'].includes(item.key))return 'absent';
 if(['fliG','fliM','fliN','fliMN','fliMY','flhF'].includes(item.key))return 'warn';
 return 'built';
}
function exportDrawing(item){
 return `<g data-component="export-gate" class="component ${exportState(item,'export')}"><path d="M350 384H370L375 411H345Z" fill="#718cf0" stroke="#bbc9ff" stroke-width="2"/><path d="M359 385V409" stroke="#192843" stroke-width="4"/></g>
 <g data-component="export-platform" class="component ${exportState(item,'flhAB')}"><path d="M338 402V425Q360 439 382 425V402" fill="none" stroke="#92aaff" stroke-width="6"/></g>
 <g data-component="export-atpase" class="component ${exportState(item,'fliHIJ')}"><path d="M360 432V478" stroke="#bcadff" stroke-width="4"/><ellipse cx="360" cy="483" rx="23" ry="9" fill="#7763b8" stroke="#d3c5ff" stroke-width="2"/><ellipse cx="360" cy="480" rx="12" ry="4" fill="#152232"/></g>
 <path d="M377 398H505V485H520M384 427H498M386 483H505" fill="none" stroke="#8493c6" stroke-width="1"/>
 <text x="525" y="489" class="svg-label">${tr('輸送装置','Export apparatus')}</text>
 <text x="525" y="505" class="svg-label">FliPQR · FlhAB · FliHIJ</text>`;
}
