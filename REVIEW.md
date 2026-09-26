# Flagellar Assembly Map — publication review

## 2026-09-26 selection and phenotype alignment

Selecting a deletion now selects its comparison group; selecting a comparison group selects a cataloged counterpart in the active species, or switches to the first species with a counterpart. Ambiguous grouped counterparts preserve the explicit comparison selection during language changes. P and L ring observations for outer-membrane species use the same ring states as the diagram; B. subtilis does not offer those controls. Hook presence no longer asserts normal length, and the broad abnormal-filament choice includes reduced abundance. Clearing all observations refreshes the selected deletion's evidence table. The site header links to a readable README and identifies the subject as bacterial flagellar assembly. Code-level regression checks cover these interactions and 73 diagram/phenotype cards; they are not independent experimental validation.

## 2026-09-24 phenotype/diagram reconciliation

The phenotype finder now uses the same modeled stator and export-component occupancy states as the SVG for stator engagement, FliPQR gate, FlhAB platform, and FliHIJ complex. The observations mean assembled/localized structures, not total cellular protein expression. FliH/I/J deletion is assessed as rotation-capable only if the user records a present/assembled rod; otherwise motor rotation remains unknown in candidate matching. Suggestions and the selected deletion evidence panel use this same conditional rule. Hook and late axial deletion entries retain their rotation-capable phenotype while stator-null entries match absent motor rotation. Automated checks compare all 73 rendered diagrams to these derived phenotype fields, as well as relevant outcomes across four species and both interface languages. These checks establish internal rule consistency, not experimental predictive validity.

## 2026-09-24 diagram correction

Stator occupancy is now independent of the rotation outcome. Deleted stator systems lose their solid geometry and use dashed outlines; the alternative Bacillus system remains visible. Axial affected/absent structures use unfilled dashed traces. Export gate (FliPQR), platform (FlhAB), and cytoplasmic ATPase complex (FliHIJ) have separate drawings and deletion states. Flagellin deletion is modeled as retaining stators and rotation capability when the basal motor is intact and energized; this is not a swimming phenotype or a measured speed. The 2026-09-23 unknown-rotation default for these flagellin entries is superseded. Targeted regression checks pass; actual browser visual QA remains unavailable.

Review date: 2026-09-23. Scope: this application only, not FlagellaScope.

## Assessment

The application is an exploratory research/teaching model. It is not a validated genotype predictor or a complete, experimentally curated deletion database. This review found and corrected substantive scientific and software errors. Publication as a validated research prediction resource is not supported by the current evidence coverage. Independent subject-matter review and a benchmark dataset are still needed for that claim.

## Scientific corrections

| Area | Finding | Correction / boundary |
|---|---|---|
| Bacillus rod | Enteric names flgF/flgG had been copied into the Bacillus deletion group. | Use flgB/flgC/flhO/flhP. Partial rods are not treated as total rod absence. |
| Salmonella fliC | A single deletion was treated as universally filament-less. | Filament outcome unknown without phase / fljB background; flagellin phase variation explained. |
| Vibrio flagellin | flaA was presented as the V. alginolyticus polar flagellin. | Use flaD2 in the context of Qin et al. (2026). Their ΔlafK-background motility phenotype is not converted to motor arrest or filament absence. |
| Vibrio flhF | Ectopic flagellation was attributed to the single deletion. | Separate the reported loss of flagellation in ΔflhF from lateral-position flagella in a subset of ΔflhFG cells. |
| fliD | Short/unstable filaments were the default for null deletion. | Model no filament; Salmonella primary evidence linked. Application to other species remains model inference. |
| Bacillus sigD / flgD | Normal hook length / complete absence of hook material were asserted from broad stage logic. | Preserve uncertainty about hook morphology; cite the 2012 hook paper. |
| Bacillus stators | Each single stator-system deletion implied reduced rotation. | Do not infer speed from the genotype alone; ion/load/expression context matters. |
| Export and rotation | Early axial assembly arrest implied a nonrotating motor. | Export defects and motor rotation are separate. Missing measurements remain unknown. |
| ATPase export group | Residual export caveat contradicted a strict-stop diagram. | Conditional downstream structures; no forced phenotype matches. |
| P/L rings | The grouped drawing marked both rings identically for ΔflgH. | P retained / L absent for ΔflgH; both absent for ΔflgI in the model. |

## Source corrections and reviewed scope

- [Burrage et al. (2018)](https://journals.asm.org/doi/10.1128/jb.00425-18): B. subtilis rod order and mutant hook/filament imaging. Grouped deletions do not imply identical residual rods.
- [Kutsukake et al. (2006)](https://journals.asm.org/doi/10.1128/jb.188.3.950-957.2006): alternate fliC/fljB expression in Typhimurium LT2. No claim of identical behavior in every Salmonella background.
- [Qin et al. (2026)](https://www.nature.com/articles/s41467-026-71203-7): Fig. 2e–f compares single flagellin deletions in ΔlafK. Motility loss is not direct evidence of motor arrest.
- [Kusumoto et al. (2008)](https://doi.org/10.1099/mic.0.2007/012641-0): abstract distinguishes ΔflhF and ΔflhFG flagellation phenotypes.
- [Salmonella fliD study (1993)](https://pubmed.ncbi.nlm.nih.gov/8407873/): indexed abstract describes filament-less structures and secreted flagellin.
- [B. subtilis hook study (2012)](https://journals.asm.org/doi/10.1128/jb.00444-12): Figs. 2–3 and discussion distinguish sigD hook formation, flgD defective hook completion, and fliK polyhooks.
- [Terahara et al. (2017)](https://doi.org/10.1038/srep46081): corrected the previous unrelated/unverified DOI to the MotPS load/polysaccharide activation paper. Detailed conditions have not been transcribed into a structured evidence dataset.
- [Mukherjee et al. (2011)](https://doi.org/10.1111/j.1365-2958.2011.07822.x): FliW/CsrA regulation; replaces an inappropriate default Salmonella assembly reference for this Bacillus entry.
- [Bacillus switch complex study (2019)](https://journals.asm.org/doi/10.1128/jb.00626-18): replaces the stator paper on the FliM/Y entry.
- [Kubori et al. (1992)](https://pubmed.ncbi.nlm.nih.gov/1640458/): verified bibliographic record used instead of an unconfirmed DOI.
- [Fitzgerald et al. (2014)](https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1004649): E. coli transcriptional regulation; removed as support for Bacillus sigD. Structural deletion outcomes are not established by this paper alone.
- [Yamaguchi et al. (2021)](https://www.nature.com/articles/s41467-021-24715-3): Salmonella LP-ring structure / assembly background, not a four-species deletion atlas.
- [Zhu et al. (2017)](https://pubmed.ncbi.nlm.nih.gov/28973904/) and [Carroll et al. (2020)](https://elifesciences.org/articles/61446): retained as scoped Vibrio structural background. Not all cataloged deletions are tested in these papers.

## Software corrections

- Cross-species FlgG comparison now prefers the exact FlgG entry over the earlier rod-group entry.
- Removed the apparent percentage-complete bars: counting categorical stages is not a validated quantitative assembly metric.
- Unknown phenotypes remain eligible for all observation outcomes and never count as matches.
- Species changes clear prior phenotype observations to avoid silently reusing another organism's measurements.
- Corrected Salmonella UniProt organism query to Salmonella enterica. Links remain searches, not verified strain-specific accession pages.
- Added explicit phenotype overrides with English/Japanese wording and uncertainty legends.
- Separated P and L ring appearance; preserved unique SVG identifiers across three diagrams.
- Stopped repeated animation frames when reduced motion is requested.
- Replaced an incomplete listbox/option interaction with native buttons and pressed state.

## Validation performed

Run `node tests/review.test.cjs`.

The browserless regression suite checks all 73 catalog entries across four species, every cross-species selection, phenotype option validity and single-observation rendering, specific scientific-rule regressions, unknown-candidate partition behavior, unique SVG IDs, English/Japanese state preservation, and reduced-motion scheduling. JavaScript syntax and Git whitespace checks also pass.

These are code/DOM-mock tests. They do not measure biological predictive accuracy. This static project has no supported managed browser preview in this environment; actual browser layout, keyboard interaction and download/network navigation were not visually verified.

## Remaining publication limitations

1. Full per-gene, per-strain evidence curation (allele, complementation, polar effects, medium, temperature, assay, figure/table) is incomplete. Empty source mappings are explicitly disclosed.
2. Groups remain groups. The catalog is not exhaustive: several structural, chaperone, regulatory and species-specific genes are absent. A missing cross-species entry means not cataloged, not absent from the genome.
3. Candidate ordering and next-observation suggestions need independent validation against experimentally labeled mutants; sensitivity/specificity and probability calibration are unavailable.
4. WT is an ideal reference, not a measured control. The illustration omits full geometry, stoichiometry, LPS asymmetry, number/distribution and strain-specific structures. CCW is a viewing convention for illustration, not a species-specific switching model. Static uncertain motors must not be read as confirmed nonrotation.
5. All four species need expert review of the remaining generalized assembly assumptions before a publication claims a comprehensive research reference.

Access: this review does not authorize changing the current owner-only audience.
