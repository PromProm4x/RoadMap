import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, Clock3, Code2, Compass, ExternalLink, FileCode2, FolderKanban, GraduationCap, Layers3, ListChecks, Menu, Target, X, Zap } from 'lucide-react';
import { lessons, projects, resources, stages } from '@/lib/curriculum';

const paths = [
  { title:'Web foundations', label:'START HERE', description:'Build a sturdy base in browser fundamentals, HTML, CSS, and JavaScript.', stages:[1,2,3,4], icon:Code2, accent:'blue' },
  { title:'Frontend builder', label:'INTERFACES & SYSTEMS', description:'Move from responsive UI into components, frameworks, and thoughtful design systems.', stages:[3,4,6,7], icon:Layers3, accent:'violet' },
  { title:'Full-stack developer', label:'FROM UI TO SERVER', description:'Connect frontend skills to APIs, databases, deployment, and modern application patterns.', stages:[6,8,9,10,11,12], icon:Zap, accent:'green' },
  { title:'Career ready', label:'MAKE YOUR WORK VISIBLE', description:'Practice quality, problem solving, interviews, portfolio work, and complete projects.', stages:[13,14,15], icon:Target, accent:'amber' },
];
const faqs = [
  { q:'Do I need experience to start?', a:'No. The roadmap begins with how the web works, then introduces HTML, CSS, and JavaScript in small, understandable steps.' },
  { q:'How is the curriculum organized?', a:`The curriculum has ${stages.length} stages and ${lessons.length} lessons. Each stage groups related topics so you can see what comes next without having to plan the whole career path first.` },
  { q:'Can I learn at my own pace?', a:'Yes. Lessons, practice checks, and project briefs are available whenever you are ready. Set a daily focus goal that fits your schedule and change it as needed.' },
  { q:'How do I keep track of progress?', a:'Mark lessons complete, save useful references, finish project checklists, and review quiz scores. Progress stays in this browser or syncs with your account when signed in.' },
  { q:'What will I build?', a:`The project library includes ${projects.length} briefs from beginner through advanced, including portfolios, responsive pages, a weather app, dashboards, and full-stack products.` },
];

function Brand() {
  return <Link href="/" className="brand-lockup public-brand" aria-label="DevRoadmap home"><span className="brand-mark"><Code2 size={18}/></span><span className="brand-name">dev<span>roadmap</span><small>LEARN BY BUILDING</small></span></Link>;
}

export default function MarketingLanding() {
  const [stageId,setStageId]=useState(1);
  const [faqOpen,setFaqOpen]=useState<number|null>(0);
  const [mobileNav,setMobileNav]=useState(false);
  const stage=stages.find(s=>s.id===stageId)||stages[0];
  const stageLessons=lessons.filter(l=>l.stage.id===stage.id);
  const sampleResources=resources.slice(0,4);
  const examples=['Beginner','Intermediate','Advanced'].map(level=>projects.find(p=>p.level===level)).filter((p):p is NonNullable<typeof p>=>Boolean(p));
  return <div className="public-site">
    <header className="public-header">
      <Brand/>
      <nav className={`public-nav ${mobileNav?'nav-open':''}`} aria-label="Main navigation">
        <a href="#roadmap" onClick={()=>setMobileNav(false)}>Roadmap</a>
        <a href="#learning-paths" onClick={()=>setMobileNav(false)}>Learning paths</a>
        <a href="#projects" onClick={()=>setMobileNav(false)}>Projects</a>
        <a href="#resources" onClick={()=>setMobileNav(false)}>Resources</a>
      </nav>
      <div className="public-actions"><Link href="/sign-in" className="public-signin">Sign in</Link><Link href="/sign-up" className="button btn-primary public-join">Get started <ArrowRight size={14}/></Link></div>
      <button className="public-mobile-toggle" aria-label={mobileNav?'Close navigation':'Open navigation'} aria-expanded={mobileNav} onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X size={19}/>:<Menu size={19}/>}</button>
    </header>

    <main>
      <section className="public-hero">
        <div className="public-hero-copy">
          <span className="hero-overline"><span/> A PRACTICAL ROADMAP FOR THE OPEN WEB</span>
          <h1>From Zero to<br/><em>Professional Developer.</em></h1>
          <p className="public-lede">A focused learning companion for your first steps in code and the projects that turn new skills into real experience.</p>
          <div className="public-hero-actions"><Link href="/sign-up" className="button btn-primary">Start Learning <ArrowRight size={16}/></Link><Link href="/roadmap" className="button btn-quiet">Explore Roadmap <ArrowUpRight size={15}/></Link></div>
          <div className="public-proof"><span><Check size={13}/> Start with the fundamentals</span><i/><span><Check size={13}/> Learn by building</span></div>
        </div>
        <div className="hero-visual" aria-label="Interactive curriculum preview">
          <div className="visual-topline"><span><span className="live-pulse"/> YOUR LEARNING MAP</span><span>01 — 15</span></div>
          <div className="visual-map">
            <div className="map-path map-path-a"/>
            <div className="map-path map-path-b"/>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((id)=>{
              const x=13+(id-1)*5.25;
              const y=id===1?67:id===2?38:id===3?26:id===4?45:id===5?69:id===6?43:id===7?22:id===8?35:id===9?64:id===10?77:id===11?51:id===12?28:id===13?46:id===14?69:39;
              const completed=id<stageId;
              return <button key={id} type="button" className={`map-stop ${id===stageId?'selected':''} ${completed?'passed':''}`} style={{left:`${x}%`,top:`${y}%`}} onClick={()=>setStageId(id)} aria-label={`Select stage ${id}: ${stages[id-1].title}`} aria-pressed={id===stageId} title={stages[id-1].title}>{completed?<Check size={11}/>:String(id).padStart(2,'0')}</button>;
            })}
            <span className="map-axis axis-one">FOUNDATIONS</span><span className="map-axis axis-two">BUILD</span><span className="map-axis axis-three">CAREER</span>
          </div>
          <div className="visual-selected"><span className="selected-index">{String(stage.id).padStart(2,'0')}</span><div><span className="eyebrow">SELECTED STAGE</span><strong>{stage.title}</strong><small>{stage.lessons.length} lessons · Explore each stage</small></div><Link href={`/lesson/${stageLessons[0]?.id||'s1-1'}`} aria-label={`Open ${stageLessons[0]?.title||'first lesson'}`}><ArrowUpRight size={17}/></Link></div>
          <div className="visual-stats"><span><strong>{stages.length}</strong> stages</span><i/><span><strong>{lessons.length}</strong> lessons</span><i/><span><strong>{projects.length}</strong> projects</span></div>
        </div>
        <div className="hero-index"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={14}/></div>
      </section>

      <section id="roadmap" className="public-section roadmap-preview-section">
        <div className="section-intro"><span className="eyebrow">01 / A ROUTE, NOT A GUESS</span><h2>Know what to learn.<br/><em>See how it connects.</em></h2><p>Fifteen stages make a big field feel navigable. Select a stage and preview its lessons, then open the full curriculum when you're ready.</p><Link href="/roadmap" className="section-link">Explore all {stages.length} stages <ArrowRight size={14}/></Link></div>
        <div className="roadmap-preview panel">
          <div className="preview-heading"><span className="preview-dot"/><span>THE WEB DEVELOPMENT ROADMAP</span><span className="preview-count">{lessons.length} topics</span></div>
          <div className="preview-body">
            <div className="preview-stage-list" role="tablist" aria-label="Curriculum stages">{stages.map(s=><button role="tab" aria-selected={s.id===stage.id} className={`preview-stage ${s.id===stage.id?'active':''}`} key={s.id} onClick={()=>setStageId(s.id)}><span>{String(s.id).padStart(2,'0')}</span><strong>{s.title}</strong><small>{s.lessons.length} topics</small></button>)}</div>
            <div className="preview-stage-detail" role="tabpanel"><span className="eyebrow">STAGE {String(stage.id).padStart(2,'0')} · {stage.lessons.length} LESSONS</span><h3>{stage.title}</h3><p>{stage.description}</p><div className="preview-lesson-list">{stageLessons.slice(0,5).map((lesson,i)=><Link href={`/lesson/${lesson.id}`} key={lesson.id} className="preview-lesson"><span>{String(i+1).padStart(2,'0')}</span>{lesson.title}<ArrowUpRight size={13}/></Link>)}</div><Link href="/roadmap" className="preview-all">Open the complete curriculum <ArrowRight size={14}/></Link></div>
          </div>
          <div className="preview-foot"><span><span className="preview-foot-dot"/> SELECT A STAGE TO EXPLORE</span><span>Progress stays yours</span></div>
        </div>
      </section>

      <section id="learning-paths" className="public-section paths-section">
        <div className="section-title-row"><div><span className="eyebrow">02 / FOLLOW YOUR DIRECTION</span><h2>One curriculum.<br/><em>Several ways forward.</em></h2></div><p>Choose a place to focus. The stages stay connected, so you can widen your skills when the time is right.</p></div>
        <div className="path-list">{paths.map((path,i)=>{const Icon=path.icon;return <article className={`path-item path-${path.accent}`} key={path.title}><span className="path-sequence">0{i+1}</span><span className="path-icon"><Icon size={19}/></span><div className="path-content"><span className="eyebrow">{path.label}</span><h3>{path.title}</h3><p>{path.description}</p></div><div className="path-stages">{path.stages.map(id=><span key={id} title={stages[id-1].title}>{String(id).padStart(2,'0')}</span>)}</div><Link href="/roadmap" aria-label={`Explore the ${path.title} path`}><ArrowUpRight size={17}/></Link></article>})}</div>
      </section>

      <section className="public-section why-section">
        <div className="why-mark"><span className="eyebrow">03 / HOW THIS HELPS</span><div className="why-symbol"><Compass size={24}/><span/></div><p>Clarity is a tool.<br/>Use it to build.</p></div>
        <div className="why-copy"><h2>Learn the idea.<br/><em>Then make it useful.</em></h2><p className="why-lede">A roadmap can tell you what exists. DevRoadmap helps you work through it — with practical explanations, knowledge checks, and projects built around real skills.</p><div className="why-points"><article><span><BookOpen size={16}/></span><div><h3>Understand in context</h3><p>Beginner-friendly lesson structure, examples, common mistakes, and recommended reading put each topic to work.</p></div></article><article><span><Target size={16}/></span><div><h3>Keep your momentum</h3><p>Track completed lessons, pick up in-progress work, set a daily focus, and keep useful topics close.</p></div></article><article><span><FolderKanban size={16}/></span><div><h3>Build evidence of skill</h3><p>Project briefs break larger builds into checkable steps, from a first portfolio to advanced full-stack work.</p></div></article></div></div>
        <div className="why-aside"><span className="eyebrow">YOUR WORKSPACE INCLUDES</span><div><GraduationCap size={16}/><span>Structured learning</span></div><div><ListChecks size={16}/><span>Progress that persists</span></div><div><Zap size={16}/><span>Working knowledge checks</span></div><div><FileCode2 size={16}/><span>Practical project briefs</span></div></div>
      </section>

      <section id="projects" className="public-section project-feature-section">
        <div className="section-title-row"><div><span className="eyebrow">04 / LEARN BY SHIPPING</span><h2>Turn the next lesson<br/><em>into something real.</em></h2></div><div className="section-side-copy"><p>Project briefs move from first interface to deeper application work. Each one includes a practical checklist.</p><Link href="/projects" className="section-link">Browse {projects.length} project briefs <ArrowRight size={14}/></Link></div></div>
        <div className="project-feature-grid">{examples.map((project,i)=><Link href="/projects" className={`featured-project featured-project-${i}`} key={project.id}><span className="featured-project-kicker"><span>{project.level}</span><span>0{i+1}</span></span><div className="project-illustration" aria-hidden="true"><div className="window-frame"><span/><span/><span/><div className={`window-art art-${i}`}><i/><i/><i/><i/></div></div><div className="project-stamp">{i===0?<Code2 size={17}/>:i===1?<Layers3 size={17}/>:<FolderKanban size={17}/>}</div></div><div className="featured-project-copy"><h3>{project.title}</h3><p>{project.description}</p><span className="project-tech">{project.stage}</span></div><span className="featured-project-arrow"><ArrowUpRight size={16}/></span></Link>)}</div>
      </section>

      <section id="resources" className="public-section resource-feature-section">
        <div className="resource-intro"><div><span className="eyebrow">05 / THE RIGHT REFERENCE</span><h2>Good sources make<br/><em>good habits.</em></h2><p>A curated starting shelf of real documentation, courses, and practice platforms. No dead-end links, no filler.</p></div><Link href="/resources" className="section-link">Open resource library <ArrowRight size={14}/></Link></div>
        <div className="featured-resources">{sampleResources.map((resource,i)=><a className="featured-resource" href={resource.url} target="_blank" rel="noreferrer" key={resource.title}><span className={`featured-resource-icon resource-icon-${i}`}><BookOpen size={16}/></span><span className="featured-resource-main"><span className="eyebrow">{resource.category}</span><strong>{resource.title}</strong><small>{resource.description}</small></span><ExternalLink size={14}/></a>)}</div>
      </section>

      <section className="public-section faq-section">
        <div className="faq-heading"><span className="eyebrow">06 / GOOD QUESTIONS</span><h2>Before you<br/><em>begin.</em></h2><p>Start where you are. The roadmap will meet you there.</p><span className="faq-note"><Clock3 size={14}/> Learn at a pace that fits.</span></div>
        <div className="faq-list">{faqs.map((item,i)=><article className={`faq-item ${faqOpen===i?'open':''}`} key={item.q}><button aria-expanded={faqOpen===i} onClick={()=>setFaqOpen(faqOpen===i?null:i)}><span>{item.q}</span><ChevronDown size={17}/></button>{faqOpen===i&&<p>{item.a}</p>}</article>)}</div>
      </section>
    </main>

    <footer className="public-footer"><div className="footer-main"><div className="footer-brand-column"><Brand/><p>A clearer way to learn web development.<br/>One useful step at a time.</p></div><div className="footer-column"><span className="eyebrow">LEARN</span><Link href="/roadmap">Curriculum</Link><Link href="/resources">Resources</Link><Link href="/practice">Practice lab</Link></div><div className="footer-column"><span className="eyebrow">BUILD</span><Link href="/projects">Project briefs</Link><Link href="/dashboard">Your progress</Link><Link href="/sign-up">Create account</Link></div><div className="footer-cta"><span className="eyebrow">START WITH ONE STEP</span><h3>The path gets clearer<br/>as you move.</h3><Link href="/sign-up" className="button btn-primary">Start learning <ArrowRight size={14}/></Link></div></div><div className="footer-bottom"><span>© DevRoadmap · Built for the curious.</span><span><span className="footer-live-dot"/> A learning companion for the open web</span><Link href="/sign-in">Sign in <ArrowUpRight size={12}/></Link></div></footer>
  </div>;
}
