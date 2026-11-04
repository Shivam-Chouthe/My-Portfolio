import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useReducedMotion } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { NavigationSection, HeroSection, DoorsSection, ShowcaseSection, TimelineSection, AbilityCardSection, TelemetrySection, ContactSection } from './components/Sections';
import { ArrowDown } from 'lucide-react';
import './style.css';

const projects = [
  { id:'01', name:'KURMESH', type:'POLAR DECISION SUPPORT', title:'A safer line through the ice.', copy:'An advisory navigation system for the Southern Ocean. Polar stereographic routing, bounded iceberg movement baselines, and an explicit human sign-off at every consequential decision.', tags:['React / TypeScript','EPSG:3412','PostGIS','Celery'], art:'polar', status:'ADVISORY SYSTEM' },
  { id:'02', name:'SIGNAL', type:'NATIVE ANDROID · OFFLINE FIRST', title:'Remember what the feed forgets.', copy:'A native capture and recall system for the links, reels, and videos worth keeping. Local-first storage meets asynchronous multimodal enrichment.', tags:['Kotlin','Jetpack Compose','Room','Gemini'], art:'signal', status:'LOCAL-FIRST MEMORY' },
  { id:'03', name:'VayuVigyan', type:'ENVIRONMENTAL INTELLIGENCE', title:'Air quality, down to the ward.', copy:'A spatial intelligence platform modeling hyper-local air quality across Delhi NCR’s 272 wards, combining ground observations, earth data, and spatial interpolation.', tags:['WebGIS','IDW / Kriging','FastAPI','TimescaleDB'], art:'vayu', status:'INDIA INNOVATES 2026 · NATIONAL FINALIST' },
  { id:'04', name:'VOICE BROWSER AGENT', type:'AUTONOMOUS INTERFACES', title:'A browser that listens. And checks.', copy:'A voice-first Chrome extension that pairs fast local actions with agent-led research, while pausing for human approval before consequential actions.', tags:['Manifest V3','React','Node.js','Web Speech API'], art:'voice', status:'HUMAN-IN-THE-LOOP' },
];
const doors = [
  { id:'01', label:'Spatial telemetry', sub:'WebGIS / polar routing', target:0, glyph:'◎' },
  { id:'02', label:'Native runtimes', sub:'Android / edge intelligence', target:1, glyph:'⌘' },
  { id:'03', label:'Autonomous interfaces', sub:'Agents / browser systems', target:3, glyph:'↗' },
  { id:'04', label:'Environmental data', sub:'Earth observation / urban air', target:2, glyph:'⌁' },
  { id:'05', label:'Physical computing', sub:'Sensors / embedded systems', target:2, glyph:'⌖' },
  { id:'06', label:'Experimental R&D', sub:'Prototypes / hackathon labs', target:2, glyph:'✳' },
];
const timeline: [string,string,string,string][] = [
  ['01','FOUNDATIONS','Computer Engineering','Building computational foundations at Sinhgad College of Engineering, Pune.'],
  ['02','HARDWARE','Learning from the physical world','Interfacing sensors, microcontrollers, and servo mechanics.'],
  ['03','NATIVE SYSTEMS','The offline-first instinct','Going deep on Kotlin, Jetpack Compose, and resilient local state.'],
  ['04','MEMORY','The birth of Signal','Turning fleeting links into structured, searchable knowledge.'],
  ['05','FIELD TEST','Bharat Mandapam · 2026','National finalist at India Innovates, building ward-level spatial intelligence for Delhi NCR.'],
  ['06','EXTREME ENVIRONMENTS','Routing through the Southern Ocean','Engineering KURMESH for polar hydrography and accountable decision support.'],
];
const skillGroups: [string,string,string][] = [
  ['01','LANGUAGES & RUNTIMES','Kotlin · Python · TypeScript · JavaScript · C · C++ · SQL'],
  ['02','NATIVE & CLIENT','Android SDK · Jetpack Compose · Room · Coroutines · React · Vite'],
  ['03','SPATIAL & EARTH OBSERVATION','MapLibre · Mapbox GL · Leaflet · GeoJSON · PostGIS · EPSG:3412 · Sentinel-5P · NASA FIRMS'],
  ['04','BACKEND & PERSISTENCE','FastAPI · Node.js · Express · Flask · PostgreSQL · TimescaleDB · Redis · Docker'],
  ['05','INTELLIGENCE & MODELING','Gemini · Scikit-learn · XGBoost · LSTM · Random Forest · Kriging / IDW'],
  ['06','HARDWARE & EMBEDDED','Arduino · BLE · Ultrasonic sensing · LDR feedback loops'],
];
function App(){
  const reduce=useReducedMotion(); const [active,setActive]=useState(0); const [doorOpen,setDoorOpen]=useState<number|null>(null); const [flip,setFlip]=useState(false); const [menu,setMenu]=useState(false); const [clock,setClock]=useState(''); const [hover,setHover]=useState(false); const [sent,setSent]=useState(false); const [time,setTime]=useState(0); const [theme,setTheme]=useState<'dark'|'light'>(()=>{try{return localStorage.getItem('portfolio-theme')==='dark'?'dark':'light'}catch{return 'light'}});
  useEffect(()=>{const tick=()=>setClock(new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date()));tick();const t=setInterval(tick,1000);const s=()=>setTime(window.scrollY);window.addEventListener('scroll',s,{passive:true});return()=>{clearInterval(t);window.removeEventListener('scroll',s)}},[]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('portfolio-theme',theme)}catch{}},[theme]);
  const jump=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:reduce?'auto':'smooth'});setMenu(false)};
  return <>
    <div className="grain" aria-hidden="true"/><CustomCursor/>
    <NavigationSection clock={clock} theme={theme} setTheme={setTheme} menu={menu} setMenu={setMenu} jump={jump} />
    <main>
      <HeroSection reduce={reduce} jump={jump} hover={hover} setHover={setHover} />
      <DoorsSection doors={doors} doorOpen={doorOpen} setDoorOpen={setDoorOpen} setActive={setActive} projects={projects} reduce={reduce} />
      <ShowcaseSection projects={projects} active={active} setActive={setActive} />
      <TimelineSection timeline={timeline} reduce={reduce} />
      <AbilityCardSection flip={flip} setFlip={setFlip} />
      <TelemetrySection skillGroups={skillGroups} />
      <ContactSection clock={clock} sent={sent} setSent={setSent} />
    </main><button className="to-top" onClick={()=>jump('home')} style={{opacity:time>800?1:0,pointerEvents:time>800?'auto':'none'}} aria-label="Back to top"><ArrowDown className="up-arrow" size={15}/></button>
  </>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
