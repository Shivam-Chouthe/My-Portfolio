import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useReducedMotion } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { NavigationSection, HeroSection, DoorsSection, ShowcaseSection, TimelineSection, AbilityCardSection, TelemetrySection, ContactSection } from './components/Sections';
import { ArrowDown } from 'lucide-react';
import './style.css';

const projects = [
  { id:'01', name:'KURMESH', type:'POLAR DECISION SUPPORT', title:'A safer line through the ice.', copy:'An advisory navigation system for the Southern Ocean. Polar stereographic routing, bounded iceberg movement baselines, and an explicit human sign-off at every consequential decision.', dossier:'Polar radar and bathymetry support Antarctic route planning in EPSG:3412. Frozen Ridge regression provides a bounded drift baseline; human-in-the-loop audit logs keep consequential decisions reviewable.', tags:['React / TypeScript','MapLibre GL','Flask','PostgreSQL / PostGIS','Redis','Celery','Docker'], art:'polar', status:'ADVISORY SYSTEM' },
  { id:'02', name:'ECHO', type:'ANDROID / CONTENT INTELLIGENCE', title:'Keep the things worth remembering.', copy:'An Android app for capturing links, reels, and videos, then turning them into a searchable content memory with multimodal synthesis.', dossier:'ACTION_SEND capture flows into a native Jetpack Compose experience. An asynchronous FastAPI service uses Gemini multimodal synthesis to organize saved media into useful context.', tags:['Kotlin','Jetpack Compose','Room','Coroutines / Flow','FastAPI','Gemini API','OkHttp3'], art:'echo', status:'CONTENT INTELLIGENCE', link:'https://echo-with-ss.netlify.app' },
  { id:'03', name:'VayuVigyan', type:'ENVIRONMENTAL INTELLIGENCE', title:'Air quality, down to the ward.', copy:'A spatial intelligence platform modeling hyper-local air quality across Delhi NCR’s 272 wards, combining ground observations, earth data, and spatial interpolation.', dossier:'A ward-scale platform combining IDW / Kriging interpolation with Random Forest and PMF source detection. Inputs include Sentinel-5P and NASA FIRMS alongside ground observations. National finalist at India Innovates 2026.', tags:['React','FastAPI','Mapbox GL JS','TimescaleDB','Python','Scikit-learn'], art:'vayu', status:'INDIA INNOVATES 2026 · NATIONAL FINALIST' },
  { id:'04', name:'VOICE BROWSER AGENT', type:'AUTONOMOUS INTERFACES', title:'A browser that listens. And checks.', copy:'A voice-first Chrome extension that pairs fast local actions with agent-led research, while pausing for human approval before consequential actions.', dossier:'A Manifest V3 extension pairs a deterministic local planner with the Agent 37 cloud planner. DOM execution pauses for human review before sensitive form submissions.', tags:['React','Vite','Chrome Manifest V3','Node.js','Express'], art:'voice', status:'HUMAN-IN-THE-LOOP' },
];
const doors = [
  { id:'01', label:'Polar telemetry', sub:'WEBGIS / POLAR ROUTING', target:0, glyph:'◎' },
  { id:'02', label:'Native Android', sub:'ECHO / CONTENT MEMORY', target:1, glyph:'⌘' },
  { id:'03', label:'Autonomous interfaces', sub:'VOICE BROWSER AGENT', target:3, glyph:'↗' },
  { id:'04', label:'Environmental data', sub:'VAYUVIGYAN / 272 WARDS', target:2, glyph:'⌁' },
  { id:'05', label:'Physical computing', sub:'HARDWARE LAB / FIELD SYSTEMS', target:0, glyph:'⌖', name:'HARDWARE LABS', title:'Code that touches the physical world.', copy:'Sensor-driven prototypes spanning BLE attendance, ultrasonic automation, ambient light control, and vehicle proximity sensing.', detail:'Embedded experiments turn real-world signals into measurable decisions. Each project pairs a modest sensor surface with a clear control loop and field-oriented testing.', stack:['Arduino','BLE','Ultrasonic sensing','LDR feedback loops','Servo control'] },
  { id:'06', label:'Experimental R&D', sub:'PROTOTYPES / HACKATHON LABS', target:2, glyph:'✳', name:'FIELD EXPERIMENTS', title:'Research that leaves the page.', copy:'A working notebook for tests across spatial data, model behavior, and small prototypes.', detail:'Exploratory work connects geospatial methods, earth observation feeds, and practical systems questions into testable prototypes.', stack:['Spatial analysis','Earth observation','Rapid prototyping','Model evaluation'] },
];
const timeline: [string,string,string,string][] = [
  ['01','FOUNDATIONS','Computer Engineering','Building computational foundations at Sinhgad College of Engineering, Pune.'],
  ['02','HARDWARE','Learning from the physical world','Interfacing sensors, microcontrollers, and servo mechanics.'],
  ['03','NATIVE SYSTEMS','Android & modern app architecture','Jetpack Compose, structured data, and maintainable client systems.'],
  ['04','MEMORY','The birth of ECHO','Turning fleeting links into structured, searchable knowledge.'],
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
  const reduce=useReducedMotion(); const [active,setActive]=useState(0); const [flip,setFlip]=useState(false); const [clock,setClock]=useState(''); const [hover,setHover]=useState(false); const [sent,setSent]=useState(false); const [time,setTime]=useState(0); const [theme,setTheme]=useState<'dark'|'light'>(()=>{try{return localStorage.getItem('portfolio-theme')==='dark'?'dark':'light'}catch{return 'light'}});
  useEffect(()=>{const tick=()=>setClock(new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date()));tick();const t=setInterval(tick,1000);const s=()=>setTime(window.scrollY);window.addEventListener('scroll',s,{passive:true});return()=>{clearInterval(t);window.removeEventListener('scroll',s)}},[]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('portfolio-theme',theme)}catch{}},[theme]);
  const jump=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:reduce?'auto':'smooth'});
  return <>
    <div className="grain" aria-hidden="true"/><CustomCursor/>
    <NavigationSection clock={clock} theme={theme} setTheme={setTheme} />
    <main>
      <HeroSection reduce={reduce} jump={jump} hover={hover} setHover={setHover} />
      <DoorsSection doors={doors} projects={projects} setActive={setActive} />
      <ShowcaseSection projects={projects} active={active} setActive={setActive} />
      <TimelineSection timeline={timeline} reduce={reduce} />
      <AbilityCardSection flip={flip} setFlip={setFlip} />
      <TelemetrySection skillGroups={skillGroups} />
      <ContactSection clock={clock} sent={sent} setSent={setSent} />
    </main><button className="to-top" onClick={()=>jump('home')} style={{opacity:time>800?1:0,pointerEvents:time>800?'auto':'none'}} aria-label="Back to top"><ArrowDown className="up-arrow" size={15}/></button>
  </>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
