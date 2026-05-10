import './App.css'
import AsciiInfinity from './AsciiInfinity'
import { useState, useEffect } from 'react'

const experiences = [
  {
    category: 'INCOMING',
    entries: [
      { company: 'First Citizens Bank', role: 'Software Engineer Intern', team: 'Enterprise Architecture' },
    ],
  },
  {
    category: 'CURRENT',
    entries: [
      { company: 'Human-Data Interaction Group', role: 'Research Assistant', team: 'ChartQA' },
    ],
  },
  {
    category: 'PREVIOUS',
    entries: [
      { company: 'Hack4Impact', role: 'Software Engineer', team: 'Friends of the Mt. Vernon Trail' },
      { company: 'CLIP UMD', role: 'Research Assistant', team: 'AI News Audit & LitMT' },
    ],
  },
]

const socialLinks = [
  { href: 'https://github.com/jameszhou-dev', src: '/github.svg', alt: 'GitHub', size: 28 },
  { href: 'https://www.linkedin.com/in/jameszhoudev/', src: '/linkedin.svg', alt: 'LinkedIn', size: 28 },
  { href: 'https://drive.google.com/file/d/1o7Hzn8_7XkF6bSupbt1PPpnx9ES-MSHz/view?usp=sharing', src: '/resume.svg', alt: 'Resume', size: 31 },
]

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [isDark, setIsDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [speed, setSpeed] = useState(0.006)
  const [colorIdx, setColorIdx] = useState(0)

  const swatchColors = isDark
    ? [null, '#4ade80', '#60a5fa', '#fbbf24', '#f87171', '#c084fc']
    : [null, '#16a34a', '#2563eb', '#b45309', '#dc2626', '#7c3aed']
  const asciiColor = swatchColors[colorIdx]

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const fn = (e) => setIsDark(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    document.body.style.background = isDark ? '#111' : '#fff'
  }, [isDark])

  const kbdStyle = {
    fontSize: '11px',
    color: 'var(--text-muted)',
    border: '1px solid var(--kbd-border)',
    borderBottom: '2px solid var(--kbd-border)',
    borderRadius: '4px',
    padding: '2px 7px',
    background: 'var(--kbd-bg)',
    fontFamily: 'inherit',
  }

  return (
    <div className={`page${isDark ? ' dark' : ''}`}>

      {/* Top bar: header left, social right */}
      <div className="top-bar">
        <header>
          <p style={{ margin: 0, fontWeight: '600', color: 'var(--text)', fontSize: '2rem' }}>James Zhou</p>
          <p className="subtitle" style={{ margin: '0', color: 'var(--text-sub)' }}>
            Computer Science, Math, and Statistics @ Northwestern University
          </p>
        </header>
        <div className="social-links">
          {socialLinks.map(({ href, src, alt, size }) => (
            <a key={alt} href={href} target="_blank" rel="noreferrer">
              <img src={src} width={size} height={size} alt={alt} />
            </a>
          ))}
          <button className="theme-toggle" onClick={() => setIsDark(d => !d)} aria-label="Toggle theme">
            <img src={isDark ? '/sun.svg' : '/moon.svg'} width={28} height={28} alt="" />
          </button>
        </div>
      </div>

      {/* Keyboard hints — desktop only */}
      <div className="hints">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <kbd style={{ ...kbdStyle, display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.5001 3.75C13.9143 3.75 14.2501 4.08579 14.2501 4.5V7.5V12.75H15.7501V7.5C15.7501 7.08579 16.0858 6.75 16.5001 6.75C16.9143 6.75 17.2501 7.08579 17.2501 7.5V15C17.2501 17.8995 14.8996 20.25 12.0001 20.25V21.75C15.728 21.75 18.7501 18.7279 18.7501 15V7.5C18.7501 6.25736 17.7427 5.25 16.5001 5.25C16.2371 5.25 15.9846 5.29512 15.7501 5.37803V4.5C15.7501 3.25736 14.7427 2.25 13.5001 2.25C12.4625 2.25 11.5889 2.95235 11.3289 3.90757C11.0724 3.80589 10.7927 3.75 10.5001 3.75C9.25742 3.75 8.25006 4.75736 8.25006 6V12.5344L7.77377 11.5689L7.77221 11.5657C7.21726 10.4539 5.86607 10.0024 4.75422 10.5574C3.65214 11.1075 3.1989 12.4399 3.7315 13.546L5.03741 16.7808L5.06205 16.8354C6.16787 19.047 7.45919 20.2994 8.73651 20.9857C10.0096 21.6696 11.194 21.75 12.0001 21.75V20.25C11.3061 20.25 10.4069 20.1803 9.44641 19.6643C8.49439 19.1528 7.40758 18.1618 6.41695 16.191L5.11239 12.9597L5.08798 12.9055C4.903 12.5349 5.05349 12.0845 5.4241 11.8995C5.79428 11.7147 6.24405 11.8646 6.42944 12.2343L8.32743 16.0818L9.75004 15.75V14.25H9.75006V6C9.75006 5.58579 10.0858 5.25 10.5001 5.25C10.9143 5.25 11.2501 5.58579 11.2501 6V12.75H12.7501V6V4.5C12.7501 4.08579 13.0858 3.75 13.5001 3.75Z" fill="#999"/>
            </svg>
          </kbd>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>drag to adjust</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <kbd style={kbdStyle}>Space</kbd>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>pause</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <kbd style={kbdStyle}>←</kbd>
          <kbd style={kbdStyle}>→</kbd>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>adjust speed</span>
        </div>
        
      </div>

      {/* Bottom right panel — desktop only */}
      <div className="bottom-right">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>speed</span>
          <span style={{ fontSize: '12px', color: 'var(--text-mid)', fontWeight: '600', minWidth: '36px', textAlign: 'right' }}>
            {(speed / 0.006).toFixed(1)}×
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>color</span>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {swatchColors.map((c, i) => (
              <button
                key={i}
                onClick={() => setColorIdx(i)}
                aria-label={c ?? 'auto'}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: colorIdx === i ? '2px solid var(--text)' : '1px solid var(--kbd-border)',
                  background: c ?? (isDark ? '#f0f0f0' : '#111'),
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <section className="experiences">
          {experiences.map(({ category, entries }) => (
            <div key={category} style={{ marginBottom: '28px' }}>
              <p style={{ margin: '0 0 12px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                {category}
              </p>
              {entries.map((e, i) => (
                <div key={e.company} style={{ marginBottom: i < entries.length - 1 ? '20px' : 0 }}>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: '.9rem', color: 'var(--text)' }}>{e.company}</p>
                  <p style={{ margin: '5px 0 0', fontSize: '.7rem', color: 'var(--text-mid)' }}>{e.role}</p>
                  <p style={{ margin: '5px 0 0', fontSize: '.7rem', color: 'var(--text-muted)' }}>{e.team}</p>
                </div>
              ))}
            </div>
          ))}
        </section>

        <div className="ascii-wrapper">
          <AsciiInfinity
            w={isMobile ? 50 : 121}
            h={isMobile ? 23 : 55}
            k1={isMobile ? 21 : 52.8}
            onSpeedChange={setSpeed}
            color={asciiColor}
            bold={!isDark}
          />
        </div>

        {isMobile && (
          <div className="mobile-hints">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <kbd style={{ ...kbdStyle, display: 'flex', alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.5001 3.75C13.9143 3.75 14.2501 4.08579 14.2501 4.5V7.5V12.75H15.7501V7.5C15.7501 7.08579 16.0858 6.75 16.5001 6.75C16.9143 6.75 17.2501 7.08579 17.2501 7.5V15C17.2501 17.8995 14.8996 20.25 12.0001 20.25V21.75C15.728 21.75 18.7501 18.7279 18.7501 15V7.5C18.7501 6.25736 17.7427 5.25 16.5001 5.25C16.2371 5.25 15.9846 5.29512 15.7501 5.37803V4.5C15.7501 3.25736 14.7427 2.25 13.5001 2.25C12.4625 2.25 11.5889 2.95235 11.3289 3.90757C11.0724 3.80589 10.7927 3.75 10.5001 3.75C9.25742 3.75 8.25006 4.75736 8.25006 6V12.5344L7.77377 11.5689L7.77221 11.5657C7.21726 10.4539 5.86607 10.0024 4.75422 10.5574C3.65214 11.1075 3.1989 12.4399 3.7315 13.546L5.03741 16.7808L5.06205 16.8354C6.16787 19.047 7.45919 20.2994 8.73651 20.9857C10.0096 21.6696 11.194 21.75 12.0001 21.75V20.25C11.3061 20.25 10.4069 20.1803 9.44641 19.6643C8.49439 19.1528 7.40758 18.1618 6.41695 16.191L5.11239 12.9597L5.08798 12.9055C4.903 12.5349 5.05349 12.0845 5.4241 11.8995C5.79428 11.7147 6.24405 11.8646 6.42944 12.2343L8.32743 16.0818L9.75004 15.75V14.25H9.75006V6C9.75006 5.58579 10.0858 5.25 10.5001 5.25C10.9143 5.25 11.2501 5.58579 11.2501 6V12.75H12.7501V6V4.5C12.7501 4.08579 13.0858 3.75 13.5001 3.75Z" fill="#999"/>
                </svg>
              </kbd>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>drag to rotate</span>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
