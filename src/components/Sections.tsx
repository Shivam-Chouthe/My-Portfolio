import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, AudioLines, ExternalLink, Moon, MousePointer2, Radio, Sun, X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

type Theme = 'dark' | 'light';
type Project = { id: string; name: string; type: string; title: string; copy: string; tags: string[]; art: string; status: string; dossier?: string; link?: string };
type Door = { id: string; label: string; sub: string; target: number; glyph?: string; name?: string; title?: string; copy?: string; detail?: string; stack?: string[]; link?: string };
type Setter<T> = Dispatch<SetStateAction<T>>;

export function NavigationSection({ clock, theme, setTheme }: { clock: string; theme: Theme; setTheme: Setter<Theme> }) {
  return <>
    <header className="topbar">
      <a className="wordmark" href="#home" aria-label="Shivam Chouthe home">SC<span>—</span></a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#home">Index</a><a href="#doors">Domains</a><a href="#systems">Systems</a><a href="#story">Trajectory</a><a href="#contact">Contact</a>
      </nav>
      <div className="nav-utility"><span className="top-meta"><i className="live-dot"/> PUNE, INDIA <b>/</b> {clock} IST</span>
        <button className="theme-btn" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label={"Switch to "+(theme==='dark'?'light':'dark')+" theme"} title={"Switch to "+(theme==='dark'?'light':'dark')+" theme"}>{theme==='dark'?<Sun size={15}/>:<Moon size={15}/>}<span>{theme==='dark'?'LIGHT':'DARK'}</span></button>
        <a className="nav-social" href="https://github.com/Shivam-Chouthe" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
        <a className="nav-social" href="https://www.linkedin.com/in/shivam-chouthe/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
      </div>
    </header>
    <aside className="rail"><span>SHIVAM CHOUTHE</span><span className="rail-line"/><span>18.5204° N&nbsp; 73.8567° E</span></aside>
  </>;
}

export function HeroSection({ reduce, jump, hover, setHover }: { reduce: boolean | null; jump: (id: string) => void; hover: boolean; setHover: Setter<boolean> }) { return (
      <section className="hero" id="home">
        <div className="boot"><span className="mono">SYS / 01—INIT</span><span className="boot-center"><AudioLines size={13}/> MOTION {reduce?'REDUCED':'READY'}</span><span className="mono">PUNE 18.5204° N</span></div>
        <div className="hero-copy"><p className="eyebrow">COMPUTER ENGINEERING · SYSTEMS BUILDER</p><h1>Hi, I’m<br/><em>Shivam.</em></h1><p className="hero-deck">I engineer <span>spatial intelligence,</span><br/>native runtimes &amp; resilient systems.</p><p className="hero-description">Computer Engineering student at Sinhgad College of Engineering, Pune. Working across polar navigation, edge Android intelligence, and interfaces that keep a human in the loop.</p><div className="hero-actions"><button className="button-fill" onClick={()=>jump('systems')}>EXPLORE THE SYSTEMS <ArrowDownRight size={15}/></button><button className="button-text" onClick={()=>jump('contact')}>ESTABLISH COMM <ArrowUpRight size={15}/></button></div><div className="availability"><span className="live-dot"/> AVAILABLE FOR AMBITIOUS ENGINEERING ROLES &amp; RESEARCH</div></div>
        <div className="portrait-frame" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}><motion.div className="portrait-image" animate={{scale:hover?1.025:1, y:hover?-3:0}} transition={{duration:.8}}><img src="/shivam-portrait.jpg" alt="Shivam Chouthe in a denim shirt"/></motion.div><div className="portrait-wash"/><span className="portrait-label">FIELD NOTE&nbsp; / &nbsp;PUNE, MH</span><span className="portrait-corner">01—SC</span><div className="portrait-cross">+</div></div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE <ArrowDown size={13}/></span><span className="mono">18.5204° N&nbsp; 73.8567° E</span><span className="hero-index">01 <i>/</i> 07</span></div><div className="hero-stamp">INDEPENDENT<br/>SYSTEMS<br/>ENGINEERING</div>
      </section>
); }

export function DoorsSection({ doors, projects, setActive }: { doors: Door[]; projects: Project[]; setActive: Setter<number> }) {
  const [hovered,setHovered]=useState<number|null>(null);
  const [opened,setOpened]=useState<number|null>(null);
  useEffect(()=>{if(opened===null)return;const closeOnEscape=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpened(null)};window.addEventListener('keydown',closeOnEscape);return()=>window.removeEventListener('keydown',closeOnEscape)},[opened]);
  const previewIndex=hovered ?? 0;
  const previewDoor=doors[previewIndex];
  const previewProject=projects[previewDoor.target];
  const openedDoor=opened===null ? null : doors[opened];
  const openedProject=openedDoor===null ? null : projects[openedDoor.target];
  const openDoor=(i:number)=>{setOpened(i);setActive(doors[i].target)};
  return <section className="doors-section section-pad" id="doors" onMouseLeave={()=>setHovered(null)}>
    <div className="section-heading"><div><p className="eyebrow">02 — WORK DOMAINS / THE PORTAL ROOM</p><h2>Magic happens<br/>behind the <em>doors.</em></h2></div><p className="section-note">Hover to read the field note.<br/>Open a door for the full project dossier.</p></div>
    <div className="portal-room">
      <div className="portal-room-top"><span>SHIVAM CHOUTHE / SYSTEMS ARCHIVE</span><span>6 PORTALS · 4 FLAGSHIP SYSTEMS</span><span>ROOM 02 — PUNE, MH</span></div>
      <div className="portal-preview" aria-live="polite" key={previewDoor.id}>
        <div><span className="eyebrow">{previewDoor.id} / {previewDoor.sub}</span><h3>{previewDoor.name ?? previewProject.name}</h3></div>
        <p>{previewDoor.copy ?? previewProject.copy}</p><span className="preview-cue">HOVER / INSPECT ↗</span>
      </div>
      <div className="portal-wall">
        {doors.map((door,i)=><button key={door.id} className={'portal '+(hovered===i?'portal-hover':'')} onMouseEnter={()=>setHovered(i)} onFocus={()=>setHovered(i)} onClick={()=>openDoor(i)} aria-haspopup="dialog">
          <span className="portal-number">{door.id}</span><span className="portal-arch"><span className="portal-leaf"><i className="portal-ribs"/><span className="portal-plaque">{door.name ?? projects[door.target].name}</span><span className="portal-handle"/></span></span>
          <span className="portal-label">{door.label}</span><span className="portal-sub">{door.sub}</span><span className="portal-open-hint">CLICK TO ENTER&nbsp; ↗</span>
        </button>)}
      </div>
      <div className="portal-floor"><span>SELECT A THRESHOLD TO INSPECT THE SYSTEM</span><span>BUILT FROM FIELD NOTES / 2026</span></div>
    </div>
    <AnimatePresence>
      {openedDoor&&openedProject&&<motion.div className="dossier-backdrop" role="presentation" tabIndex={-1} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onKeyDown={e=>{if(e.key==='Escape')setOpened(null)}} onMouseDown={e=>{if(e.currentTarget===e.target)setOpened(null)}}>
        <motion.section className="portal-dossier" role="dialog" aria-modal="true" aria-labelledby="portal-dossier-title" initial={{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:14,scale:.99}} transition={{duration:.28}}>
          <div className="dossier-kicker"><span>PROJECT DOSSIER / {openedDoor.id}</span><button className="dossier-close" onClick={()=>setOpened(null)} aria-label="Close dossier"><X/></button></div>
          <p className="eyebrow">{openedDoor.sub}</p><h2 id="portal-dossier-title">{openedDoor.name ?? openedProject.name}</h2><h3>{openedDoor.title ?? openedProject.title}</h3>
          <p className="dossier-lead">{openedDoor.copy ?? openedProject.copy}</p><p className="dossier-detail">{openedDoor.detail ?? openedProject.dossier ?? openedProject.copy}</p>
          <div className="dossier-stack"><span>TECHNICAL MATERIALS</span><div>{(openedDoor.stack ?? openedProject.tags).map(tag=><i key={tag}>{tag}</i>)}</div></div>
          <div className="dossier-footer"><span>SHIVAM CHOUTHE / ENGINEERING LOG</span>{(openedDoor.link ?? openedProject.link)&&<a className="button-fill" href={openedDoor.link ?? openedProject.link} target="_blank" rel="noreferrer">OPEN LIVE PROJECT <ExternalLink size={15}/></a>}</div>
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  </section>;
}

export function ShowcaseSection({ projects, active, setActive }: { projects: Project[]; active: number; setActive: Setter<number> }) { return (
      <section className="systems-section section-pad" id="systems"><div className="section-heading"><div><p className="eyebrow">03 — FLAGSHIP SYSTEMS</p><h2>Built for the<br/><em>actual conditions.</em></h2></div><div className="system-nav">{projects.map((p,i)=><button key={p.id} className={active===i?'active':''} onClick={()=>setActive(i)}>{p.id}</button>)}</div></div><div className="project-layout"><div className="project-info"><p className="eyebrow">{projects[active].id} / {projects[active].type}</p><motion.div key={active} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.4}}><h3>{projects[active].name}</h3><h4>{projects[active].title}</h4><p>{projects[active].copy}</p><div className="tag-row">{projects[active].tags.map(t=><span key={t}>{t}</span>)}</div></motion.div><div className="project-status"><span className="live-dot"/>{projects[active].status}</div><div className="project-controls"><button onClick={()=>setActive((active+projects.length-1)%projects.length)} aria-label="Previous project">←</button><span>{String(active+1).padStart(2,'0')} <i>/</i> {String(projects.length).padStart(2,'0')}</span><button onClick={()=>setActive((active+1)%projects.length)} aria-label="Next project">→</button></div></div><motion.div className={`project-art ${projects[active].art}`} key={projects[active].art} initial={{opacity:0,scale:.98}} animate={{opacity:1,scale:1}} transition={{duration:.5}}><div className="art-top"><span>FIG. {projects[active].id} — SYSTEM VIEW</span><span>LIVE MODEL / ADVISORY</span></div>{active===0?<><div className="polar-grid"/><div className="polar-rings"><i/><i/><i/><b/></div><span className="art-label polar-label">ANTARCTIC<br/>PENINSULA</span><span className="art-coord">64° 14′ S<br/>61° 18′ W</span><div className="art-readout">ICE VELOCITY&nbsp; 0.42 KN<br/>ROUTE STATE&nbsp;&nbsp;&nbsp; REVIEW</div></>:active===1?<><div className="phone"><div className="phone-island"/><span className="phone-time">09:41</span><div className="phone-app">ECHO<span>▮</span></div><div className="phone-search">⌕ &nbsp; Recall something…</div><div className="memory-card"><i>WATCH LATER · 2D AGO</i><b>Designing for the edge</b><small>saved from YouTube</small><span>capture&nbsp; · &nbsp;context&nbsp; · &nbsp;recall</span></div><div className="phone-bottom">⌂ &nbsp;&nbsp;&nbsp;&nbsp; ◉ &nbsp;&nbsp;&nbsp;&nbsp; ◎</div></div><span className="art-label">ECHO LIBRARY<br/>02 / 04</span></>:active===2?<><div className="map-grid"/><div className="map-shape shape-one"/><div className="map-shape shape-two"/><div className="map-shape shape-three"/><div className="heat-point hp1"/><div className="heat-point hp2"/><div className="heat-point hp3"/><div className="heat-point hp4"/><span className="art-label">DELHI NCR / WARD GRID<br/>28.6139° N&nbsp; 77.2090° E</span><div className="map-legend"><span>PM₂.₅ MODEL</span><i/><small>LOW&nbsp; → &nbsp;ELEVATED</small></div></>:<><div className="terminal-window"><div className="terminal-head"><span>VOICE AGENT / SESSION 08</span><span>● READY</span></div><p><i>&gt;</i> navigate to the project overview</p><div className="terminal-action"><b>01</b><span>DOM TARGET RESOLVED</span><small>button[aria-label="Projects"]</small></div><div className="terminal-action"><b>02</b><span>SCROLL INTO VIEW</span><small>awaiting execution</small></div><div className="terminal-approval">◉ &nbsp; HUMAN APPROVAL REQUIRED</div></div><span className="art-label">LOCAL PLAN → AGENT ROUTE</span></>}<div className="art-bottom"><span>SHIVAM CHOUTHE / ENGINEERING LOG</span><span>{projects[active].id} — 04</span></div></motion.div></div><div className="secondary-labs"><div className="eyebrow">ALSO IN THE LAB</div><span>P2P BLE ATTENDANCE MESH</span><span>ULTRASONIC AUTOMATION</span><span>AMBIENT LUX CONTROL</span><span>VEHICLE PROXIMITY GATE</span></div></section>
); }

export function TimelineSection({ timeline, reduce }: { timeline: [string, string, string, string][]; reduce: boolean | null }) { return (
      <section className="story-section section-pad" id="story"><div className="story-title"><p className="eyebrow">04 — TRAJECTORY / FIELD NOTES</p><h2>Engineering from<br/>first principles.<br/><em>Testing against reality.</em></h2><p>A path through hardware, native systems, and increasingly unforgiving environments.</p><div className="story-index">PUNE → BHARAT MANDAPAM → SOUTHERN OCEAN</div></div><div className="timeline">{timeline.map(([n,tag,title,copy],i)=><motion.article className="timeline-item" key={n} initial={reduce?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'0px 0px -50px'}} transition={{duration:.5,delay:i*.04}}><span className="timeline-number">{n}</span><div><p className="eyebrow">{tag}</p><h3>{title}</h3><p>{copy}</p></div><span className="timeline-dot"/></motion.article>)}</div></section>
); }

export function AbilityCardSection({ flip, setFlip }: { flip: boolean; setFlip: Setter<boolean> }) { return (
      <section className="identity-section section-pad" id="identity"><div className="identity-intro"><p className="eyebrow">05 — IDENTITY CORE</p><h2>One system.<br/><em>Two sides.</em></h2><p>An engineer’s credential, built with the same attention as the work. Tap to turn it over.</p></div><div className="card-wrap" onDoubleClick={()=>setFlip(!flip)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setFlip(!flip)}}} role="button" tabIndex={0} aria-label="Flip digital identity card"><motion.div className="id-card" animate={{rotateY:flip?180:0}} transition={{duration:.7,ease:[.22,1,.36,1]}} style={{transformStyle:'preserve-3d'}}><div className="id-face id-front"><div className="card-grid"/><div className="card-brand"><span>SC / SYSTEMS DIVISION</span><span>ACTIVE CREDENTIAL / 2026</span></div><div className="card-person"><img src="/shivam-portrait.jpg" alt=""/><div><p>COMPUTER ENGINEERING</p><h3>Shivam<br/><em>Chouthe.</em></h3><span>SINHGAD COLLEGE OF ENGINEERING</span></div></div><div className="card-bottom"><span>18.5204° N<br/>73.8567° E</span><span>SYSTEMS · SPATIAL<br/>NATIVE RUNTIMES</span><span className="nfc">⌁</span></div></div><div className="id-face id-back"><div className="card-brand"><span>FIELD CREDENTIAL / 002</span><span>REVERSE SIDE</span></div><blockquote>“Building verified systems over speculative presentations.”</blockquote><div className="card-stack">KOTLIN&nbsp; · &nbsp;PYTHON&nbsp; · &nbsp;TYPESCRIPT<br/>WEBGIS&nbsp; · &nbsp;ANDROID&nbsp; · &nbsp;EDGE ML</div><div className="hash">PUB / SC-18-52-73<br/>4F2A—88D1—C03B—E917</div><div className="card-bottom"><span>VERIFY IN FIELD</span><span>BUILT WITH RIGOR</span><span className="nfc">⌁</span></div></div></motion.div><span className="card-hint"><MousePointer2 size={13}/> {flip?'DOUBLE CLICK TO RETURN':'DOUBLE CLICK OR PRESS ENTER TO FLIP'}</span></div></section>
); }

export function TelemetrySection({ skillGroups }: { skillGroups: [string, string, string][] }) { return (
      <section className="telemetry-section section-pad" id="telemetry"><div className="section-heading"><div><p className="eyebrow">06 — TELEMETRY</p><h2>Tools for the<br/><em>whole stack.</em></h2></div><p className="section-note">From the sensor at the edge<br/>to the map on the wall.</p></div><div className="skills-list">{skillGroups.map(([n,title,content])=><div className="skill-row" key={n}><span className="skill-num">{n}</span><h3>{title}</h3><p>{content}</p><ArrowUpRight size={14}/></div>)}</div></section>
); }

export function ContactSection({ clock, sent, setSent }: { clock: string; sent: boolean; setSent: Setter<boolean> }) { return (
      <section className="contact-section section-pad" id="contact"><div className="contact-top"><p className="eyebrow">07 — DISPATCH / OPEN CHANNEL</p><span><i className="live-dot"/> PUNE · {clock} IST</span></div><div className="contact-main"><div><h2>Have a hard<br/>engineering problem?<br/><em>Let’s build the solution.</em></h2><p>Open for systems engineering, native Android development, WebGIS platforms, and high-impact technical collaborations.</p><a href="mailto:shivamchouthe22@gmail.com" className="email-link">SHIVAMCHOUTHE22@GMAIL.COM <ArrowUpRight size={18}/></a></div><form className="dispatch" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);const subject=encodeURIComponent(String(f.get('subject')));const body=encodeURIComponent(`From: ${f.get('name')} (${f.get('email')})\n\n${f.get('message')}`);setSent(true);window.location.href=`mailto:shivamchouthe22@gmail.com?subject=${subject}&body=${body}`}}><div className="form-title"><Radio size={14}/> TERMINAL DISPATCH <span>CLIENT VALIDATION / READY</span></div><label>IDENTIFIER<input name="name" placeholder="Your name" required minLength={2}/></label><label>RETURN ADDRESS<input name="email" type="email" placeholder="you@domain.com" required/></label><label>SUBJECT<input name="subject" placeholder="System / collaboration / other" required/></label><label>MESSAGE<textarea name="message" placeholder="Give me the shape of the problem…" rows={3} required minLength={10}/></label><button className="button-fill" type="submit">{sent?'OPENING MAIL CLIENT':'TRANSMIT MESSAGE'} <ArrowRight size={15}/></button><small>YOUR MAIL APP WILL OPEN WITH THE MESSAGE READY TO SEND.</small></form></div><footer><span>ENGINEERED WITH RIGOR. RENDERED WITH PRECISION.</span><div className="social-links"><a href="https://github.com/Shivam-Chouthe" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a><a href="https://www.linkedin.com/in/shivam-chouthe/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="https://shivamchouthe.in" target="_blank" rel="noreferrer">PERSONAL WEB <ArrowUpRight size={12}/></a></div><span>© 2026 SHIVAM UMAKANT CHOUTHE</span></footer></section>
); }

