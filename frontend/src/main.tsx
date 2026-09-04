import React from 'react'
import { createRoot } from 'react-dom/client'
import { Activity, AlertTriangle, Bot, Box, CheckCircle2, ChevronRight, Cloud, Gauge, GitBranch, LayoutDashboard, Server, Settings, ShieldCheck, Terminal, Zap } from 'lucide-react'
import './styles.css'

const services = [
  { name: 'payment-service', status: 'Healthy', latency: '42ms', uptime: '99.98%', icon: CheckCircle2 },
  { name: 'order-service', status: 'Healthy', latency: '31ms', uptime: '99.95%', icon: CheckCircle2 },
  { name: 'user-service', status: 'Degraded', latency: '286ms', uptime: '96.21%', icon: AlertTriangle },
  { name: 'notification-service', status: 'Healthy', latency: '54ms', uptime: '99.99%', icon: CheckCircle2 },
]

const navItems = [
  ['Overview', LayoutDashboard],
  ['Services', Server],
  ['Kubernetes', Box],
  ['Monitoring', Gauge],
  ['Incidents', AlertTriangle],
  ['AI Agent', Bot],
  ['Deployments', GitBranch],
  ['Logs', Terminal],
  ['Security', ShieldCheck],
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Zap size={20} /></div>
          <div><strong>AegisOps</strong><span>DevOps Control Plane</span></div>
        </div>
        <div className="workspace">PRODUCTION <span>●</span></div>
        <nav>
          {navItems.map(([label, Icon], index) => (
            <button className={`nav-item ${index === 0 ? 'active' : ''}`} key={label}>
              <Icon size={17} /> <span>{label}</span>
              {label === 'Incidents' && <b>2</b>}
            </button>
          ))}
        </nav>
        <button className="nav-item settings"><Settings size={17} /><span>Settings</span></button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div><p className="eyebrow">PLATFORM / OVERVIEW</p><h1>Production Overview</h1></div>
          <div className="top-actions"><span className="live"><i /> All systems operational</span><div className="avatar">AS</div></div>
        </header>

        <section className="stats-grid">
          <Stat icon={<Server />} label="Services" value="12" note="10 healthy · 2 degraded" />
          <Stat icon={<Activity />} label="SLO" value="98.7%" note="Target 99.5%" />
          <Stat icon={<GitBranch />} label="Deployments" value="24" note="+18% this week" />
          <Stat icon={<AlertTriangle />} label="Open Alerts" value="2" note="1 critical · 1 warning" danger />
        </section>

        <div className="content-grid">
          <section className="panel services-panel">
            <div className="panel-heading"><div><h2>Service Health</h2><p>Live application status</p></div><button className="link-btn">View all <ChevronRight size={15} /></button></div>
            <div className="service-list">
              {services.map(({ name, status, latency, uptime, icon: Icon }) => <div className="service-row" key={name}>
                <div className={`service-icon ${status.toLowerCase()}`}><Icon size={17} /></div>
                <div className="service-name"><strong>{name}</strong><span>Spring Boot · Kubernetes</span></div>
                <div className="service-metric"><span>Latency</span><strong>{latency}</strong></div>
                <div className="service-metric"><span>Uptime</span><strong>{uptime}</strong></div>
                <div className={`status ${status.toLowerCase()}`}>{status}</div>
              </div>)}
            </div>
          </section>

          <section className="panel ai-panel">
            <div className="ai-heading"><div className="ai-icon"><Bot size={21} /></div><div><h2>AI DevOps Agent</h2><p>Continuous incident intelligence</p></div><span className="agent-live">LIVE</span></div>
            <div className="incident-card">
              <div className="incident-top"><span className="severity">SEV-2</span><span>#1042 · 4 min ago</span></div>
              <h3>user-service latency degradation</h3>
              <p>The agent detected elevated response times and is investigating Kubernetes metrics, logs and recent deployments.</p>
              <div className="confidence"><span>Investigation confidence</span><strong>87%</strong><div><i /></div></div>
              <button className="primary-btn">View Investigation <ChevronRight size={15} /></button>
            </div>
          </section>
        </div>

        <section className="bottom-grid">
          <div className="panel chart-panel"><div className="panel-heading"><div><h2>Request Performance</h2><p>Last 24 hours · p95 latency</p></div><span className="chart-value">148ms</span></div><div className="chart"><div className="grid-lines"/><svg viewBox="0 0 800 170" preserveAspectRatio="none"><path d="M0 120 C55 112 72 126 120 106 S195 120 240 92 S310 105 355 74 S430 93 470 80 S530 89 575 58 S640 78 680 50 S740 66 800 42" fill="none" stroke="currentColor" strokeWidth="3" /></svg></div></div>
          <div className="panel deployment-panel"><div className="panel-heading"><div><h2>Latest Deployment</h2><p>payment-service</p></div><span className="success-dot">● Healthy</span></div><div className="deploy-version"><span>v1.8.2</span><strong>Production</strong><small>Deployed 18 min ago by CI/CD</small></div><div className="deploy-progress"><span /><span /><span /><span /><span /></div><div className="deploy-meta"><span>GitHub Actions</span><span>Argo CD</span><span>EKS</span></div></div>
        </section>

        <footer><span>AegisOps Platform v0.1.0</span><span><Cloud size={13} /> Kubernetes connected · EKS / production</span></footer>
      </main>
    </div>
  )
}

function Stat({ icon, label, value, note, danger = false }: { icon: React.ReactNode; label: string; value: string; note: string; danger?: boolean }) {
  return <div className="stat-card"><div className={`stat-icon ${danger ? 'danger' : ''}`}>{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
