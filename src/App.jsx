import './App.css'
import AsciiInfinity from './AsciiInfinity'

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

export default function App() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', padding: '30px' }}>
      <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', alignItems: 'center', gap: '30px' }}>
        <a href="https://github.com/jameszhou-dev" target="_blank" rel="noreferrer"><img src="/github.svg" width="28" height="28" alt="GitHub" /></a>
        <a href="https://www.linkedin.com/in/jameszhoudev/" target="_blank" rel="noreferrer"><img src="/linkedin.svg" width="28" height="28" alt="LinkedIn" /></a>
        <a href="https://drive.google.com/file/d/1o7Hzn8_7XkF6bSupbt1PPpnx9ES-MSHz/view?usp=sharing" target="_blank" rel="noreferrer"><img src="/resume.svg" width="31" height="31" alt="Resume" /></a>
      </div>

      <header style={{ position: 'absolute', top: '30px', left: '30px' }}>
        <p style={{ margin: 0, fontWeight: '600', color: '#000', fontSize: '2rem' }}>James Zhou</p>
        <p style={{ margin: 0, marginTop: '10px', color: '#555', fontSize: '1rem' }}>Computer Science, Math, and Statistics @ Northwestern University</p>
      </header>

      <div style={{ position: 'fixed', bottom: '28px', left: '30px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <kbd style={{ fontSize: '11px', color: '#888', border: '1px solid #bbb', borderBottom: '2px solid #bbb', borderRadius: '4px', padding: '2px 7px', background: '#f5f5f5', fontFamily: 'inherit' }}>Space</kbd>
          <span style={{ fontSize: '12px', color: '#999' }}>pause</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <kbd style={{ fontSize: '11px', color: '#888', border: '1px solid #bbb', borderBottom: '2px solid #bbb', borderRadius: '4px', padding: '2px 7px', background: '#f5f5f5', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.5001 3.75C13.9143 3.75 14.2501 4.08579 14.2501 4.5V7.5V12.75H15.7501V7.5C15.7501 7.08579 16.0858 6.75 16.5001 6.75C16.9143 6.75 17.2501 7.08579 17.2501 7.5V15C17.2501 17.8995 14.8996 20.25 12.0001 20.25V21.75C15.728 21.75 18.7501 18.7279 18.7501 15V7.5C18.7501 6.25736 17.7427 5.25 16.5001 5.25C16.2371 5.25 15.9846 5.29512 15.7501 5.37803V4.5C15.7501 3.25736 14.7427 2.25 13.5001 2.25C12.4625 2.25 11.5889 2.95235 11.3289 3.90757C11.0724 3.80589 10.7927 3.75 10.5001 3.75C9.25742 3.75 8.25006 4.75736 8.25006 6V12.5344L7.77377 11.5689L7.77221 11.5657C7.21726 10.4539 5.86607 10.0024 4.75422 10.5574C3.65214 11.1075 3.1989 12.4399 3.7315 13.546L5.03741 16.7808L5.06205 16.8354C6.16787 19.047 7.45919 20.2994 8.73651 20.9857C10.0096 21.6696 11.194 21.75 12.0001 21.75V20.25C11.3061 20.25 10.4069 20.1803 9.44641 19.6643C8.49439 19.1528 7.40758 18.1618 6.41695 16.191L5.11239 12.9597L5.08798 12.9055C4.903 12.5349 5.05349 12.0845 5.4241 11.8995C5.79428 11.7147 6.24405 11.8646 6.42944 12.2343L8.32743 16.0818L9.75004 15.75V14.25H9.75006V6C9.75006 5.58579 10.0858 5.25 10.5001 5.25C10.9143 5.25 11.2501 5.58579 11.2501 6V12.75H12.7501V6V4.5C12.7501 4.08579 13.0858 3.75 13.5001 3.75Z" fill="#999"/>
            </svg>
          </kbd>
          <span style={{ fontSize: '12px', color: '#999' }}>drag to adjust</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <section>
        {experiences.map(({ category, entries }) => (
          <div key={category} style={{ marginBottom: '28px' }}>
            <p style={{ margin: '0 0 12px', fontSize: '0.8rem', fontWeight: '600', color: '#888', letterSpacing: '0.08em' }}>
              {category}
            </p>
            {entries.map((e, i) => (
              <div key={e.company} style={{ marginBottom: i < entries.length - 1 ? '20px' : 0 }}>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '.9rem', color: '#000' }}>{e.company}</p>
                <p style={{ margin: '5px 0 0', fontSize: '.7rem', color: '#444' }}>{e.role}</p>
                <p style={{ margin: '5px 0 0', fontSize: '.7rem', color: '#888' }}>{e.team}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
        <div style={{ marginLeft: '60px' }}><AsciiInfinity /></div>
      </div>
    </div>
  )
}
