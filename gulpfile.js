
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>대한민국 AI 생태계 맵 · 2025</title>
<style>
:root {
  --bg: #f4f7fb;
  --surface: rgba(255,255,255,.82);
  --surface-strong: #ffffff;
  --text: #0f172a;
  --text-sub: #475569;
  --text-muted: #7b8aa4;
  --line: #d9e1ee;
  --line-strong: #c6d2e6;
  --shadow: 0 18px 40px rgba(15,23,42,.08);
  --radius-xl: 24px;
  --hero-grad: linear-gradient(135deg, #0f172a 0%, #14213d 42%, #1d4ed8 100%);
  --chip-bg: #eef3fb;
  --chip-text: #334155;
  --card-pad: 16px;
  --container: min(1440px, calc(100vw - 32px));
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: "Noto Sans KR", "Apple SD Gothic Neo", system-ui, sans-serif;
  background:
    radial-gradient(circle at top right, rgba(59,130,246,.12), transparent 28%),
    radial-gradient(circle at left 12%, rgba(139,92,246,.08), transparent 24%),
    var(--bg);
  color: var(--text);
}
button, input { font: inherit; }
.shell { width: var(--container); margin: 0 auto; }

/* ── Hero ── */
.hero {
  margin: 18px auto 14px;
  width: var(--container);
  border-radius: 28px;
  background: var(--hero-grad);
  color: #fff;
  padding: 28px 28px 22px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(15,23,42,.18);
}
.hero::before {
  content: "";
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,.15), transparent 28%),
    radial-gradient(circle at 80% 15%, rgba(255,255,255,.12), transparent 22%),
    linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
  background-size: auto, auto, 34px 34px;
  pointer-events: none;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.4fr .95fr;
  gap: 22px;
  position: relative; z-index: 1;
}
.hero h1 { margin: 0 0 10px; font-size: clamp(26px,4vw,44px); line-height: 1.04; letter-spacing: -1.1px; }
.hero p  { margin: 0; color: rgba(255,255,255,.84); line-height: 1.65; font-size: 15px; }
.hero-note {
  display: inline-flex; align-items: center; gap: 8px;
  margin-bottom: 12px; padding: 7px 12px; border-radius: 999px;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.12);
  font-size: 12px; color: rgba(255,255,255,.9); backdrop-filter: blur(12px);
}
.hero-note .dot { width: 7px; height: 7px; border-radius: 50%; background: #60a5fa; box-shadow: 0 0 0 5px rgba(96,165,250,.14); }
.hero-right { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; align-content: start; }
.stat-card {
  background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(14px); border-radius: 18px; padding: 16px 16px 14px;
}
.stat-label { color: rgba(255,255,255,.72); font-size: 12px; margin-bottom: 8px; }
.stat-value { font-weight: 800; font-size: clamp(22px,2.6vw,34px); line-height: 1; }
.stat-sub   { margin-top: 8px; color: rgba(255,255,255,.72); font-size: 12px; }

/* ── Layer pills under hero ── */
.layer-nav {
  width: var(--container); margin: 0 auto 14px;
  display: flex; gap: 8px; flex-wrap: wrap;
}
.layer-link {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 16px; border-radius: 999px;
  background: rgba(255,255,255,.82); border: 1px solid var(--line);
  color: var(--text-sub); font-size: 13px; font-weight: 600;
  box-shadow: 0 4px 14px rgba(148,163,184,.08);
  text-decoration: none; transition: .15s;
}
.layer-link:hover { background: #fff; border-color: #94a3b8; transform: translateY(-1px); }
.layer-link .swatch { width: 10px; height: 10px; border-radius: 50%; }

/* ── Toolbar ── */
.toolbar-wrap {
  position: sticky; top: 10px; z-index: 25;
  width: var(--container); margin: 0 auto 14px;
}
.toolbar {
  background: rgba(255,255,255,.78); backdrop-filter: blur(16px);
  border: 1px solid rgba(217,225,238,.9); box-shadow: var(--shadow);
  border-radius: 22px; padding: 14px;
}
.toolbar-top {
  display: grid; grid-template-columns: 1.1fr auto auto; gap: 12px; align-items: center;
}
.searchbox {
  display: flex; align-items: center; gap: 10px;
  background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 11px 13px;
}
.searchbox svg { flex: 0 0 auto; color: #64748b; }
.searchbox input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text); font-size: 14px; }
.pill-group { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
.pill-label { font-size: 11px; color: var(--text-muted); margin-right: 2px; }
.pill {
  border: 1px solid var(--line); background: #fff; color: var(--text-sub);
  padding: 8px 12px; border-radius: 999px; cursor: pointer; font-size: 12px; line-height: 1; transition: .18s;
}
.pill:hover { border-color: #94a3b8; transform: translateY(-1px); }
.pill.active { background: #0f172a; border-color: #0f172a; color: #fff; box-shadow: 0 10px 24px rgba(15,23,42,.16); }
.pill.soft.active { background: #eff6ff; border-color: #93c5fd; color: #1d4ed8; box-shadow: none; }
.toolbar-bottom {
  margin-top: 12px; display: flex; flex-wrap: wrap;
  justify-content: space-between; gap: 10px; align-items: center;
}
.info-line { display: flex; flex-wrap: wrap; gap: 8px; }
.info-chip {
  padding: 7px 10px; border-radius: 999px; font-size: 11px;
  color: var(--text-sub); background: var(--chip-bg); border: 1px solid #dbe7f6;
}
.info-chip strong { color: var(--text); }

/* ── Layout ── */
.layout {
  width: var(--container); margin: 0 auto 36px;
  display: grid; grid-template-columns: minmax(0,1fr) 360px; gap: 18px; align-items: start;
}
.main-col { min-width: 0; }

/* ── Layer section ── */
.layer-section {
  scroll-margin-top: 110px; margin-bottom: 18px;
  background: rgba(255,255,255,.72); border: 1px solid rgba(217,225,238,.88);
  border-radius: 24px; box-shadow: var(--shadow); overflow: hidden;
}
.layer-header {
  display: grid; grid-template-columns: 8px minmax(0,1fr) auto;
  gap: 16px; align-items: center; padding: 18px 20px;
  background: linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,.72));
  border-bottom: 1px solid rgba(217,225,238,.92);
}
.layer-accent-bar { width: 8px; align-self: stretch; border-radius: 999px; }
.layer-title { display: flex; flex-direction: column; gap: 4px; }
.layer-title h2 { margin: 0; font-size: 22px; letter-spacing: -.5px; }
.layer-title p  { margin: 0; font-size: 13px; color: var(--text-sub); }
.layer-meta { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.meta-pill { padding: 8px 12px; border-radius: 999px; background: #fff; border: 1px solid var(--line); font-size: 12px; color: var(--text-sub); }
.layer-body { padding: 18px 20px 20px; }
.subgroup + .subgroup { margin-top: 18px; }
.subgroup-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 12px; }
.subgroup-title { font-size: 14px; font-weight: 700; color: var(--text-sub); }
.subgroup-count { font-size: 12px; color: var(--text-muted); }

/* ── Cards ── */
.card-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(210px,1fr)); gap: 12px;
}
.entity-card {
  position: relative; border-radius: 18px;
  background: linear-gradient(180deg, #ffffff, #f8fbff);
  border: 1px solid var(--line); padding: var(--card-pad);
  display: flex; flex-direction: column; gap: 10px; min-height: 154px;
  cursor: pointer; transition: .18s ease; overflow: hidden;
}
.entity-card:hover    { transform: translateY(-2px); border-color: #94a3b8; box-shadow: 0 16px 36px rgba(15,23,42,.10); }
.entity-card.selected { border-color: #1d4ed8; box-shadow: 0 0 0 3px rgba(29,78,216,.10), 0 16px 36px rgba(29,78,216,.12); }
.entity-card.related  { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,.08); }
.entity-card.dim      { opacity: .38; }
.entity-card::before  { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--accent, #94a3b8); }
.card-top { display: flex; justify-content: space-between; gap: 10px; align-items: start; }
.card-name { margin: 0; font-size: 16px; line-height: 1.18; letter-spacing: -.3px; }
.type-badge {
  flex: 0 0 auto; font-size: 10px; padding: 5px 8px; border-radius: 999px;
  border: 1px solid transparent; line-height: 1;
}
.type-enterprise { background: #fef3c7; border-color: #fcd34d; color: #92400e; }
.type-startup    { background: #ecfeff; border-color: #67e8f9; color: #0f766e; }
.card-focus {
  align-self: flex-start; padding: 5px 9px; border-radius: 999px;
  background: #f8fafc; border: 1px solid #e2e8f0; font-size: 11px; color: #475569;
}
.card-summary { margin: 0; font-size: 12px; line-height: 1.55; color: var(--text-sub); }
.tag-row { display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto; }
.tag { padding: 5px 8px; border-radius: 999px; background: var(--chip-bg); color: var(--chip-text); border: 1px solid #dde7f5; font-size: 10px; line-height: 1; }

/* ── Aside ── */
.aside {
  position: sticky; top: 110px;
  background: rgba(255,255,255,.82); backdrop-filter: blur(16px);
  border: 1px solid rgba(217,225,238,.9); border-radius: 24px;
  box-shadow: var(--shadow); min-height: 400px; overflow: hidden;
}
.aside-head { padding: 18px 20px 14px; border-bottom: 1px solid var(--line); background: linear-gradient(180deg, rgba(255,255,255,.95), rgba(255,255,255,.78)); }
.aside-head .eyebrow { font-size: 11px; color: var(--text-muted); letter-spacing: .08em; text-transform: uppercase; }
.aside-body { padding: 18px 20px 22px; }
.placeholder { color: var(--text-sub); line-height: 1.7; font-size: 14px; }
.detail-title { margin: 4px 0 6px; font-size: 26px; line-height: 1.06; letter-spacing: -.8px; }
.detail-sub { margin: 0 0 10px; font-size: 13px; color: var(--text-sub); }
.detail-grid { display: grid; gap: 12px; }
.detail-box { padding: 14px; border-radius: 16px; background: #f8fbff; border: 1px solid #dfebf7; }
.detail-box h4 { margin: 0 0 10px; font-size: 13px; color: #334155; }
.detail-box p  { margin: 0; font-size: 14px; line-height: 1.65; color: var(--text-sub); }
.small-list { display: grid; gap: 8px; }
.small-item { display: flex; flex-direction: column; gap: 4px; padding: 10px 11px; border-radius: 14px; border: 1px solid var(--line); background: #fff; }
.small-item-top { display: flex; justify-content: space-between; gap: 8px; }
.small-name { font-weight: 700; font-size: 14px; }
.small-meta { font-size: 11px; color: var(--text-muted); }
.shared-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.shared-tags span { font-size: 10px; padding: 5px 7px; border-radius: 999px; background: #f5f3ff; border: 1px solid #ddd6fe; color: #6d28d9; }

/* ── Footer ── */
.footer {
  width: var(--container); margin: 0 auto 28px; padding: 18px 20px;
  background: rgba(255,255,255,.72); border: 1px solid rgba(217,225,238,.88);
  border-radius: 20px; color: var(--text-sub); line-height: 1.7; font-size: 13px;
}
.muted { color: var(--text-muted); }
.hidden { display: none !important; }

@media (max-width: 1120px) {
  .hero-grid, .layout, .toolbar-top { grid-template-columns: 1fr; }
  .aside { position: static; order: -1; }
}
@media (max-width: 760px) {
  :root { --container: calc(100vw - 20px); --card-pad: 13px; }
  .hero { padding: 22px 18px 18px; border-radius: 24px; }
  .toolbar { border-radius: 18px; }
  .hero-right { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .card-grid { grid-template-columns: 1fr; }
  .layer-header { grid-template-columns: 8px minmax(0,1fr); }
  .layer-meta { grid-column: 2; justify-content: flex-start; }
}
</style>
</head>
<body>

<header class="hero">
  <div class="hero-grid">
    <div>
      <div class="hero-note"><span class="dot"></span>대표 플레이어 중심 · 2025년 기준</div>
      <h1>대한민국 AI 생태계 맵</h1>
      <p>AI 서비스 → AI 모델 → 데이터 → 클라우드·인프라 → AI 반도체 5개 레이어로 구성한 국내 AI 생태계 플레이어 지도.
         카드를 클릭하면 같은 태그로 연결된 유사 플레이어를 오른쪽 패널에서 확인할 수 있다.</p>
    </div>
    <div class="hero-right" id="hero-stats"></div>
  </div>
</header>

<div class="toolbar-wrap">
  <div class="toolbar">
    <div class="toolbar-top">
      <label class="searchbox">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
        </svg>
        <input id="searchInput" type="text" placeholder="기업명, 제품명, 태그 검색…" autocomplete="off" />
      </label>
      <div class="pill-group" id="typeFilters"></div>
      <div class="pill-group" id="tagFilters"></div>
    </div>
    <div class="toolbar-bottom">
      <div class="info-line" id="infoLine"></div>
      <div class="pill-group">
        <button class="pill soft" id="resetBtn">필터 초기화</button>
      </div>
    </div>
  </div>
</div>

<nav class="layer-nav" id="layerNav"></nav>

<div class="layout">
  <main class="main-col" id="mainCol"></main>
  <aside class="aside">
    <div class="aside-head"><div class="eyebrow">selected entity</div></div>
    <div class="aside-body" id="detailPanel">
      <div class="placeholder">
        카드를 선택하면 상세 정보와 <strong>같은 태그로 연결된 플레이어</strong>가 나온다.<br/>
        <span class="muted">태그가 겹치는 정도 기반의 유사도 계산이다. 투자·공급 계약을 의미하지 않는다.</span>
      </div>
    </div>
  </aside>
</div>

<footer class="footer">
  이 맵은 <strong>대표 기업 중심의 큐레이션</strong>이다. 한국 AI 생태계 전체 총람이 아니며,
  한 기업이 여러 레이어에 걸치는 경우 <strong>1차 배치</strong>만 두고 나머지는 태그로 표현했다.
  공공·정책 레이어는 별도 정리 권장. 소버린 AI·산업AI·의료AI·온디바이스·추론 인프라 축을 중심으로 보강했다.
</footer>

<script>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LAYER DATA
//  순서: AI서비스 → AI모델 → 데이터 → 클라우드·인프라 → AI반도체
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const LAYERS = [
  {
    id: "service",
    name: "AI 서비스",
    accent: "#f59e0b",
    desc: "생산성·교육·의료·콘텐츠·자율주행 등 버티컬 AI 서비스",
    subgroups: [
      {
        name: "생산성·에이전트·교육",
        entities: [
          { name:"라이너",           type:"startup",    focus:"AI Search",      summary:"AI 검색·리서치 에이전트 인터페이스",          tags:["검색/생산성","에이전트","LLM/모델"] },
          { name:"뤼튼테크놀로지스", type:"startup",    focus:"AI Agent App",   summary:"대중형 AI 에이전트·LLM 멀티플렉서 앱",       tags:["에이전트","검색/생산성","LLM/모델"] },
          { name:"스캐터랩",         type:"startup",    focus:"Conversational", summary:"대화형 AI 서비스·이루다",                     tags:["검색/생산성","에이전트","소비자"] },
          { name:"올거나이즈",       type:"startup",    focus:"Alli",           summary:"엔터프라이즈 AI 에이전트·문서 자동화",         tags:["에이전트","보안/엔터프라이즈","LLM/모델"] },
          { name:"뤼이드",           type:"startup",    focus:"Edu AI",         summary:"AI 튜터·개인화 학습 에듀테크",                tags:["검색/생산성","교육","서비스"] },
          { name:"매스프레소",       type:"startup",    focus:"QANDA",          summary:"QANDA 기반 학습 AI 플랫폼",                   tags:["검색/생산성","교육","모바일"] },
          { name:"클래스팅",         type:"startup",    focus:"EdTech",         summary:"학교·학습용 AI 에듀 플랫폼",                  tags:["검색/생산성","교육","공공AI"] },
          { name:"포티투마루",       type:"startup",    focus:"42Maru",         summary:"QA·도메인 특화 엔터프라이즈 LLM 서비스",      tags:["에이전트","보안/엔터프라이즈","LLM/모델"] },
          { name:"코난테크놀로지",   type:"startup",    focus:"NLP Solution",   summary:"NLP·검색 기반 기업 AI 솔루션 납품",           tags:["검색/생산성","보안/엔터프라이즈","LLM/모델"] },
          { name:"솔트룩스",         type:"startup",    focus:"Agentic AI",     summary:"LLM·에이전트·지식 서비스 플랫폼",             tags:["에이전트","LLM/모델","보안/엔터프라이즈"] }
        ]
      },
      {
        name: "의료 AI",
        entities: [
          { name:"루닛",           type:"startup", focus:"Imaging AI",    summary:"암 진단·영상 분석 AI, 글로벌 파트너십",       tags:["의료AI","비전","상장"] },
          { name:"뷰노",           type:"startup", focus:"Clinical AI",   summary:"생체신호·영상 의료 AI",                     tags:["의료AI","비전","상장"] },
          { name:"딥노이드",       type:"startup", focus:"Deep:NEURO",    summary:"의료 영상·보안 판독 AI",                    tags:["의료AI","비전","상장"] },
          { name:"JLK",            type:"startup", focus:"Stroke AI",     summary:"뇌졸중 중심 의료 영상 AI",                  tags:["의료AI","비전","상장"] },
          { name:"딥바이오",       type:"startup", focus:"Pathology",     summary:"AI 기반 병리 이미지 진단·디지털 병리",       tags:["의료AI","비전","데이터/MLOps"] },
          { name:"메디웨일",       type:"startup", focus:"Retinal AI",    summary:"안저 기반 전신 질환 예측 AI",               tags:["의료AI","예측","헬스케어"] },
          { name:"코어라인소프트", type:"startup", focus:"Thoracic AI",   summary:"흉부 영상·폐질환 AI 분석",                  tags:["의료AI","비전","상장"] },
          { name:"에이아이트릭스", type:"startup", focus:"Vitals AI",     summary:"중환자·임상 예측 AI",                       tags:["의료AI","예측","병원"] },
          { name:"메디컬아이피",   type:"startup", focus:"MEDIP",         summary:"3D 디지털트윈 기반 의료 AI",                tags:["의료AI","디지털트윈","영상"] },
          { name:"메디컬에이아이", type:"startup", focus:"AiTiA",         summary:"심전도·심장질환 의료 AI",                   tags:["의료AI","예측","헬스케어"] }
        ]
      },
      {
        name: "콘텐츠·멀티모달",
        entities: [
          { name:"트웰브랩스",  type:"startup", focus:"Video AI",      summary:"비디오 이해·멀티모달 AI, 글로벌 진출",       tags:["멀티모달/콘텐츠","비전","글로벌"] },
          { name:"딥브레인AI",  type:"startup", focus:"AI Human",      summary:"AI 휴먼·영상 생성 서비스",                  tags:["멀티모달/콘텐츠","영상","아바타"] },
          { name:"클레온",      type:"startup", focus:"Avatar",        summary:"디지털 휴먼·더빙 플랫폼",                   tags:["멀티모달/콘텐츠","아바타","음성"] },
          { name:"네오사피엔스",type:"startup", focus:"Typecast",      summary:"AI 음성·TTS·보이스 클로닝",                 tags:["멀티모달/콘텐츠","음성","글로벌"] },
          { name:"펄스나인",    type:"startup", focus:"Virtual Human", summary:"버추얼 휴먼·K팝 IP 콘텐츠",                 tags:["멀티모달/콘텐츠","아바타","엔터테인먼트"] },
          { name:"마인드로직",  type:"startup", focus:"Character AI",  summary:"AI 캐릭터·인터랙션 플랫폼",                 tags:["멀티모달/콘텐츠","에이전트","소비자"] },
          { name:"NC AI",       type:"startup", focus:"VARCO",         summary:"게임·멀티모달 콘텐츠 생성 AI",              tags:["LLM/모델","멀티모달/콘텐츠","게임"] }
        ]
      },
      {
        name: "자율주행·로보틱스",
        entities: [
          { name:"포티투닷",    type:"enterprise", focus:"42dot",       summary:"현대차 계열 SDV·모빌리티 AI 플랫폼",         tags:["자율주행/로보틱스","플랫폼","모빌리티"] },
          { name:"서울로보틱스",type:"startup",    focus:"3D Percep.",  summary:"3D 인식 AI·산업 현장 자율화",               tags:["자율주행/로보틱스","비전","모빌리티"] },
          { name:"모빌테크",    type:"startup",    focus:"HD Map",      summary:"HD맵·자율주행 공간 데이터",                 tags:["자율주행/로보틱스","데이터/MLOps","모빌리티"] },
          { name:"라이드플럭스",type:"startup",    focus:"Autonomy",    summary:"자율주행 플랫폼 소프트웨어",                tags:["자율주행/로보틱스","모빌리티","서비스"] },
          { name:"스트라드비젼",type:"startup",    focus:"Perception",  summary:"ADAS 비전 인식 소프트웨어",                 tags:["자율주행/로보틱스","비전","온디바이스"] },
          { name:"베어로보틱스",type:"startup",    focus:"Servi",       summary:"서비스 로봇·식당 배달 로봇 자율주행",       tags:["자율주행/로보틱스","로봇","서비스"] }
        ]
      },
      {
        name: "보안·엔터프라이즈",
        entities: [
          { name:"S2W",       type:"startup", focus:"Data Intel.", summary:"AI 기반 사이버 위협 인텔리전스·데이터 분석", tags:["보안/엔터프라이즈","지식그래프","데이터/MLOps"] },
          { name:"씨이랩",    type:"startup", focus:"Video AI",    summary:"비디오 분석·AI 인프라 솔루션",               tags:["보안/엔터프라이즈","비전","데이터/MLOps"] },
          { name:"마키나락스", type:"startup", focus:"Industrial", summary:"산업 특화 AI·공장 운영 최적화",              tags:["보안/엔터프라이즈","산업AI","데이터/MLOps"] }
        ]
      }
    ]
  },

  {
    id: "model",
    name: "AI 모델",
    accent: "#8b5cf6",
    desc: "파운데이션 모델·LLM·에이전트 프레임워크 개발",
    entities: [
      { name:"네이버",            type:"enterprise", focus:"HyperCLOVA X", summary:"HyperCLOVA X 계열 파운데이션 모델 및 검색 AI",  tags:["LLM/모델","검색/생산성","플랫폼"] },
      { name:"LG AI Research",   type:"enterprise", focus:"EXAONE",       summary:"EXAONE 오픈소스 LLM·멀티모달 연구",             tags:["LLM/모델","연구","플랫폼"] },
      { name:"카카오",            type:"enterprise", focus:"GenAI",        summary:"생성형 AI 연구·서비스 실험 및 Kakao Brain",      tags:["LLM/모델","플랫폼","검색/생산성"] },
      { name:"SK텔레콤",          type:"enterprise", focus:"A.X",          summary:"A.X 기반 AI 서비스 전략·통신 AI",               tags:["LLM/모델","통신","플랫폼"] },
      { name:"KT",                type:"enterprise", focus:"Mi:dm",        summary:"Mi:dm LLM·공공·금융 B2B 전개",                  tags:["LLM/모델","통신","보안/엔터프라이즈"] },
      { name:"삼성SDS",           type:"enterprise", focus:"Brity LLM",    summary:"Brity LLM·엔터프라이즈 AI 플랫폼",              tags:["LLM/모델","보안/엔터프라이즈","클라우드"] },
      { name:"업스테이지",        type:"startup",    focus:"Solar",        summary:"Solar 계열 LLM·문서 AI·Document AI API",        tags:["LLM/모델","보안/엔터프라이즈","문서AI"] },
      { name:"모레",              type:"startup",    focus:"Compute SW",   summary:"AI 컴퓨팅 최적화·LLM 추론 가속 소프트웨어",     tags:["LLM/모델","데이터/MLOps","인프라"] },
      { name:"Motif Technologies",type:"startup",    focus:"Motif",        summary:"소버린 AI 경쟁 참여·멀티에이전트 플랫폼",       tags:["LLM/모델","에이전트","플랫폼"] },
      { name:"FriendliAI",        type:"startup",    focus:"Inference",    summary:"LLM 추론·서빙 인프라 플랫폼",                   tags:["LLM/모델","데이터/MLOps","인프라"] },
      { name:"튜닙",              type:"startup",    focus:"TuNIB",        summary:"감성 대화·소형 특화 언어 모델 연구",             tags:["LLM/모델","소비자","연구"] },
      { name:"알체라",            type:"startup",    focus:"Face/Vision",  summary:"얼굴·생체인식 기반 비전 AI 모델",               tags:["LLM/모델","비전","보안/엔터프라이즈"] }
    ]
  },

  {
    id: "data",
    name: "데이터",
    accent: "#06b6d4",
    desc: "데이터 수집·가공·라벨링·MLOps·모델 평가",
    entities: [
      { name:"크라우드웍스",   type:"startup", focus:"DataOps",     summary:"데이터 라벨링·AI 데이터 운영 플랫폼",         tags:["데이터/MLOps","라벨링","데이터"] },
      { name:"슈퍼브에이아이", type:"startup", focus:"Vision AI",   summary:"비전 데이터 파이프라인·MLOps 플랫폼",          tags:["데이터/MLOps","비전","MLOps"] },
      { name:"마인즈앤컴퍼니", type:"startup", focus:"Consulting",  summary:"기업 AI 도입·MLOps 컨설팅",                   tags:["데이터/MLOps","보안/엔터프라이즈","MLOps"] },
      { name:"스케일업랩스",   type:"startup", focus:"Scale-up",    summary:"AI 데이터 구축·스케일 운영",                  tags:["데이터/MLOps","데이터","라벨링"] },
      { name:"셀렉트스타",     type:"startup", focus:"Evaluation",  summary:"데이터 검증·평가·RLHF 파이프라인",            tags:["데이터/MLOps","평가","정렬"] },
      { name:"에이모",         type:"startup", focus:"AIMMO",       summary:"자율주행·산업용 데이터 플랫폼",               tags:["데이터/MLOps","자율주행/로보틱스","데이터"] },
      { name:"테스트웍스",     type:"startup", focus:"Data QA",     summary:"AI 데이터 구축·검증·소외계층 일자리 연계",    tags:["데이터/MLOps","데이터","검증"] },
      { name:"아크릴",         type:"startup", focus:"Graph AI",    summary:"지식그래프·분석형 AI 플랫폼",                 tags:["데이터/MLOps","지식그래프","보안/엔터프라이즈"] },
      { name:"VESSL AI",       type:"startup", focus:"GPU Ops",     summary:"GPU 클라우드·MLOps 운영 플랫폼",              tags:["데이터/MLOps","클라우드","인프라"] },
      { name:"노타AI",         type:"startup", focus:"Optimization",summary:"온디바이스 AI 경량화·최적화 솔루션",          tags:["데이터/MLOps","온디바이스","비전"] }
    ]
  },

  {
    id: "cloud",
    name: "클라우드·인프라",
    accent: "#10b981",
    desc: "AI 클라우드·MSP·IT서비스·엔터프라이즈 인프라",
    entities: [
      { name:"네이버클라우드", type:"enterprise", focus:"Ncloud",      summary:"국산 AI 클라우드·HyperCLOVA API 제공",      tags:["클라우드","플랫폼","공공AI"] },
      { name:"KT클라우드",    type:"enterprise", focus:"KT Cloud",    summary:"AI·공공·금융 버티컬 클라우드",              tags:["클라우드","플랫폼","통신"] },
      { name:"NHN클라우드",   type:"enterprise", focus:"NHN Cloud",   summary:"클라우드·AI 서비스 인프라",                 tags:["클라우드","플랫폼","보안/엔터프라이즈"] },
      { name:"카카오클라우드",type:"enterprise", focus:"Kakao Cloud", summary:"카카오 계열 퍼블릭 클라우드",               tags:["클라우드","플랫폼","보안/엔터프라이즈"] },
      { name:"LG CNS",        type:"enterprise", focus:"AX",          summary:"AX 전환·기업 클라우드·SI 서비스",           tags:["클라우드","보안/엔터프라이즈","SI"] },
      { name:"SK C&C",        type:"enterprise", focus:"AIX",         summary:"AIX·클라우드·IT서비스 전환",                tags:["클라우드","보안/엔터프라이즈","SI"] },
      { name:"메가존클라우드",type:"startup",    focus:"MSP",         summary:"AWS·Azure 기반 클라우드 MSP·AI 구축",       tags:["클라우드","보안/엔터프라이즈","MSP"] },
      { name:"베스핀글로벌",  type:"startup",    focus:"Bespin",      summary:"멀티클라우드·AI 운영·FinOps",               tags:["클라우드","보안/엔터프라이즈","MSP"] },
      { name:"케이아이엔엑스", type:"startup",   focus:"KINX",        summary:"데이터센터·인터넷 교환 인프라",             tags:["클라우드","인프라","데이터/MLOps"] },
      { name:"그리드원",       type:"startup",   focus:"Edge Infra",  summary:"엣지 컴퓨팅·분산 AI 인프라",               tags:["클라우드","인프라","온디바이스"] }
    ]
  },

  {
    id: "chip",
    name: "AI 반도체",
    accent: "#ef4444",
    desc: "HBM·NPU·온디바이스 칩·칩 IP·추론 가속기",
    entities: [
      { name:"삼성전자",            type:"enterprise", focus:"Samsung",      summary:"HBM·파운드리·시스템 반도체 종합",            tags:["반도체","HBM","대기업"] },
      { name:"SK하이닉스",          type:"enterprise", focus:"SK hynix",     summary:"HBM3E·메모리 중심 AI 반도체",               tags:["반도체","HBM","대기업"] },
      { name:"리벨리온",            type:"startup",    focus:"Rebellions",   summary:"데이터센터용 ATOM·REBEL AI 칩",             tags:["반도체","NPU","데이터센터"] },
      { name:"퓨리오사AI",          type:"startup",    focus:"FuriosaAI",    summary:"AI 추론 가속기 WARBOY·RNGD",               tags:["반도체","NPU","데이터센터"] },
      { name:"딥엑스",              type:"startup",    focus:"DEEPX",        summary:"온디바이스·엣지 AI NPU 칩",                 tags:["반도체","온디바이스","엣지"] },
      { name:"HyperAccel",          type:"startup",    focus:"LPU",          summary:"LLM 추론 특화 가속 칩 LPU",                 tags:["반도체","LLM/모델","추론"] },
      { name:"사피온",              type:"startup",    focus:"SAPEON",       summary:"SK텔레콤 계열 AI 가속칩 X220",              tags:["반도체","NPU","데이터센터"] },
      { name:"오픈엣지테크놀로지",  type:"startup",    focus:"OPENEDGES",    summary:"NPU·메모리 시스템 반도체 IP",               tags:["반도체","온디바이스","IP"] },
      { name:"Mobilint",            type:"startup",    focus:"Mobilint",     summary:"온프레미스·온디바이스 추론 NPU",            tags:["반도체","온디바이스","NPU"] },
      { name:"네패스",              type:"enterprise", focus:"Packaging",    summary:"AI 반도체 패키징·후공정 전문",              tags:["반도체","패키징","대기업"] }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  CONFIG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const TYPE_META = {
  all:        { label: "전체" },
  enterprise: { label: "대기업·통신·플랫폼" },
  startup:    { label: "스타트업·스케일업" }
};

const TAG_ORDER = [
  "LLM/모델","에이전트","검색/생산성","의료AI","멀티모달/콘텐츠",
  "자율주행/로보틱스","보안/엔터프라이즈","데이터/MLOps","클라우드",
  "반도체","온디바이스","비전"
];

const state = { query:"", type:"all", tag:"all", selected:null };

// ━━━ Flatten ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function flattenLayers(layers) {
  const out = [];
  layers.forEach(layer => {
    const addEntity = (entity, subgroup) => {
      out.push({ ...entity, layerId:layer.id, layerName:layer.name, accent:layer.accent, subgroup: subgroup || null });
    };
    (layer.entities || []).forEach(e => addEntity(e, null));
    (layer.subgroups || []).forEach(sub => sub.entities.forEach(e => addEntity(e, sub.name)));
  });
  return out;
}
const ENTITIES = flattenLayers(LAYERS);

// ━━━ Helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const esc = str => String(str).replace(/[&<>"']/g, s => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[s]);
const typeLabel = t => TYPE_META[t]?.label || t;

function matches(e) {
  const q = state.query.trim().toLowerCase();
  const hay = [e.name, e.summary, e.focus||"", e.layerName, e.subgroup||"", ...(e.tags||[])].join(" ").toLowerCase();
  return (!q || hay.includes(q))
    && (state.type === "all" || e.type === state.type)
    && (state.tag  === "all" || (e.tags||[]).includes(state.tag));
}

function countLayerEntities(layer) {
  return (layer.entities||[]).length + (layer.subgroups||[]).reduce((n,s) => n + s.entities.length, 0);
}

function relatedEntities(name) {
  const base = ENTITIES.find(e => e.name === name);
  if (!base) return [];
  return ENTITIES
    .filter(e => e.name !== name)
    .map(e => {
      const a = new Set(base.tags||[]), b = new Set(e.tags||[]);
      const shared = [...a].filter(t => b.has(t));
      const score = shared.length * 10 + (base.layerId === e.layerId ? 3 : 0) + (base.subgroup && base.subgroup === e.subgroup ? 2 : 0);
      return { ...e, shared, score };
    })
    .filter(e => e.shared.length > 0)
    .sort((a,b) => b.score - a.score || a.name.localeCompare(b.name,"ko"))
    .slice(0, 9);
}

// ━━━ Build stats ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildStats() {
  const total = ENTITIES.length;
  const ent   = ENTITIES.filter(e => e.type === "enterprise").length;
  const sta   = ENTITIES.filter(e => e.type === "startup").length;
  const tags  = new Set(ENTITIES.flatMap(e => e.tags||[])).size;
  document.getElementById("hero-stats").innerHTML = [
    { label:"총 기업 수",  value: total, sub: `${LAYERS.length}개 레이어` },
    { label:"대기업·통신", value: ent,   sub: "플랫폼 / 클라우드 / 계열" },
    { label:"스타트업",    value: sta,   sub: "모델 / 서비스 / 칩" },
    { label:"분류 태그",   value: tags,  sub: "테마 기준 필터 가능" }
  ].map(c => `<div class="stat-card"><div class="stat-label">${c.label}</div><div class="stat-value">${c.value}</div><div class="stat-sub">${c.sub}</div></div>`).join("");

  document.getElementById("infoLine").innerHTML = [
    `보이는 카드 <strong id="visibleCount">-</strong>`,
    `레이어 <strong>${LAYERS.length}</strong>개`,
    `태그 <strong>${tags}</strong>종`
  ].map(t => `<span class="info-chip">${t}</span>`).join("");
}

// ━━━ Filters ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildFilterChips() {
  document.getElementById("typeFilters").innerHTML = `
    <span class="pill-label">유형</span>
    ${Object.entries(TYPE_META).map(([k,m]) =>
      `<button class="pill ${state.type===k?"active":""}" data-type-key="${k}">${m.label}</button>`
    ).join("")}`;
  document.getElementById("tagFilters").innerHTML = `
    <span class="pill-label">테마</span>
    <button class="pill soft ${state.tag==="all"?"active":""}" data-tag-key="all">전체</button>
    ${TAG_ORDER.map(tag =>
      `<button class="pill soft ${state.tag===tag?"active":""}" data-tag-key="${tag}">${tag}</button>`
    ).join("")}`;
  document.querySelectorAll("[data-type-key]").forEach(b => b.onclick = () => { state.type = b.dataset.typeKey; renderAll(); });
  document.querySelectorAll("[data-tag-key]").forEach(b => b.onclick  = () => { state.tag  = b.dataset.tagKey;  renderAll(); });
}

// ━━━ Nav ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildLayerNav() {
  document.getElementById("layerNav").innerHTML = LAYERS.map(layer => `
    <a class="layer-link" href="#layer-${layer.id}">
      <span class="swatch" style="background:${layer.accent}"></span>
      <span>${layer.name}</span>
      <span class="muted">· ${countLayerEntities(layer)}</span>
    </a>`).join("");
}

// ━━━ Cards ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderCard(entity) {
  const sel = state.selected === entity.name;
  const relNames = state.selected ? relatedEntities(state.selected).map(e => e.name) : [];
  const isRel = state.selected && relNames.includes(entity.name);
  const dim   = state.selected && !sel && !isRel;
  return `<article class="entity-card ${sel?"selected":""} ${isRel?"related":""} ${dim?"dim":""}"
    data-entity-name="${esc(entity.name)}" style="--accent:${entity.accent}">
    <div class="card-top">
      <h3 class="card-name">${entity.name}</h3>
      <span class="type-badge type-${entity.type}">${typeLabel(entity.type)}</span>
    </div>
    <div class="card-focus">${entity.focus||entity.layerName}</div>
    <p class="card-summary">${entity.summary}</p>
    <div class="tag-row">${(entity.tags||[]).slice(0,4).map(t=>`<span class="tag">${t}</span>`).join("")}</div>
  </article>`;
}

// ━━━ Main render ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderMain() {
  const main = document.getElementById("mainCol");
  let html = "";

  LAYERS.forEach(layer => {
    let visible = [];
    let bodyHtml = "";

    if (layer.entities) {
      const items = layer.entities.map(e => ENTITIES.find(x => x.name === e.name)).filter(e => e && matches(e));
      visible.push(...items);
      if (items.length) bodyHtml += `<div class="card-grid">${items.map(renderCard).join("")}</div>`;
    }

    (layer.subgroups||[]).forEach(sub => {
      const items = sub.entities.map(e => ENTITIES.find(x => x.name === e.name)).filter(e => e && matches(e));
      visible.push(...items);
      if (items.length) {
        bodyHtml += `<div class="subgroup">
          <div class="subgroup-head">
            <div class="subgroup-title">${sub.name}</div>
            <div class="subgroup-count">${items.length}개</div>
          </div>
          <div class="card-grid">${items.map(renderCard).join("")}</div>
        </div>`;
      }
    });

    if (!visible.length) return;
    html += `<section class="layer-section" id="layer-${layer.id}">
      <div class="layer-header">
        <div class="layer-accent-bar" style="background:${layer.accent}"></div>
        <div class="layer-title"><h2>${layer.name}</h2><p>${layer.desc}</p></div>
        <div class="layer-meta">
          <span class="meta-pill">표시 ${visible.length}개</span>
          <span class="meta-pill">전체 ${countLayerEntities(layer)}개</span>
        </div>
      </div>
      <div class="layer-body">${bodyHtml}</div>
    </section>`;
  });

  main.innerHTML = html;
  main.querySelectorAll("[data-entity-name]").forEach(card => {
    card.onclick = () => {
      const name = card.dataset.entityName;
      state.selected = state.selected === name ? null : name;
      renderAll(false);
    };
  });

  const vc = document.getElementById("visibleCount");
  if (vc) vc.textContent = ENTITIES.filter(matches).length;
}

// ━━━ Detail panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderDetail() {
  const panel = document.getElementById("detailPanel");
  if (!state.selected) {
    panel.innerHTML = `<div class="placeholder">카드를 선택하면 상세 정보와 <strong>같은 태그로 연결된 플레이어</strong>가 나온다.<br/><span class="muted">태그가 겹치는 정도 기반의 유사도다. 투자·공급 관계를 의미하지 않는다.</span></div>`;
    return;
  }
  const e = ENTITIES.find(x => x.name === state.selected);
  const related = relatedEntities(state.selected);
  panel.innerHTML = `<div class="detail-grid">
    <div>
      <span class="type-badge type-${e.type}" style="display:inline-flex;margin-bottom:8px">${typeLabel(e.type)}</span>
      <h3 class="detail-title">${e.name}</h3>
      <p class="detail-sub">${e.layerName}${e.subgroup?` · ${e.subgroup}`:""} · ${e.focus||""}</p>
    </div>
    <div class="detail-box"><h4>설명</h4><p>${e.summary}</p></div>
    <div class="detail-box"><h4>태그</h4><div class="tag-row">${(e.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}</div></div>
    <div class="detail-box">
      <h4>비슷한 축의 플레이어</h4>
      <div class="small-list">
        ${related.length ? related.map(r => `<div class="small-item">
          <div class="small-item-top"><div class="small-name">${r.name}</div><div class="small-meta">${r.layerName}</div></div>
          <div class="shared-tags">${r.shared.map(t=>`<span>${t}</span>`).join("")}</div>
        </div>`).join("") : `<div class="muted">겹치는 태그 기반 연결이 없습니다.</div>`}
      </div>
    </div>
  </div>`;
}

// ━━━ Orchestrate ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderAll(rebuildFilters = true) {
  if (state.selected && !ENTITIES.filter(matches).find(e => e.name === state.selected)) state.selected = null;
  if (rebuildFilters) buildFilterChips();
  renderMain();
  renderDetail();
}

document.getElementById("searchInput").addEventListener("input", e => { state.query = e.target.value; renderAll(false); });
document.getElementById("resetBtn").addEventListener("click", () => {
  state.query = ""; state.type = "all"; state.tag = "all"; state.selected = null;
  document.getElementById("searchInput").value = "";
  renderAll();
});

buildStats();
buildLayerNav();
renderAll();
</script>
</body>
</html>
