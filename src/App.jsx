import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { Search, Trophy, Users, Home as HomeIcon } from 'lucide-react'
import './index.css'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1652513842544-ca66b676757a?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxJUEx8ZW58MHwwfHx8MTc2Mjk1NjUyNHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="IPL" className="h-8"/>
            <span className="font-bold text-lg">IPL Encyclopedia</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <NavLink to="/"><HomeIcon size={18}/> Home</NavLink>
            <NavLink to="/teams"><Users size={18}/> Teams</NavLink>
            <NavLink to="/players"><Search size={18}/> Players</NavLink>
            <NavLink to="/stats"><Trophy size={18}/> Stats</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Indian Premier League. This is an educational fan project.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-blue-600" href="https://www.iplt20.com/" target="_blank">Official Website</a>
            <a className="hover:text-blue-600" href="https://twitter.com/IPL" target="_blank">Twitter</a>
            <a className="hover:text-blue-600" href="https://instagram.com/iplt20" target="_blank">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ to, children }){
  return (
    <Link to={to} className="px-3 py-1.5 rounded-md hover:bg-black/5 text-gray-700 flex items-center gap-1">
      {children}
    </Link>
  )
}

function Home(){
  const [teams, setTeams] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}/api/teams`).then(r=>r.json()).then(setTeams) }, [])
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20 grid md:grid-cols-2 items-center gap-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Indian Premier League</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">The IPL is the world’s premier T20 cricket league featuring top talent from India and around the globe. Explore teams, players, staff, owners, and stats — all in one place.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/teams" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Browse Teams</Link>
              <Link to="/players" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">Find Players</Link>
            </div>
          </div>
          <div className="relative">
            <img className="w-full max-w-md mx-auto drop-shadow-xl" alt="IPL" src="https://images.unsplash.com/photo-1652513842544-ca66b676757a?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxJUEx8ZW58MHwwfHx8MTc2Mjk1NjUyNHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"/>
            <div className="absolute -z-10 blur-3xl inset-0 bg-gradient-to-r from-blue-300/40 to-purple-300/40 rounded-full"/>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-4">Teams</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {teams.map(t => (
            <Link key={t.id} to={`/teams/${t.id}`} className="group bg-white rounded-xl border border-black/5 p-4 hover:shadow-lg transition">
              <img src={t.logo} alt={t.name} className="h-16 mx-auto object-contain"/>
              <div className="mt-3 text-center">
                <p className="font-semibold group-hover:text-blue-600">{t.name}</p>
                <p className="text-xs text-gray-500">{t.shortName}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function Teams(){
  const [teams, setTeams] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}/api/teams`).then(r=>r.json()).then(setTeams) }, [])
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Teams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(t => <TeamCard key={t.id} t={t} />)}
      </div>
    </div>
  )
}

function TeamCard({ t }){
  return (
    <Link to={`/teams/${t.id}`} className="bg-white rounded-xl border border-black/5 p-5 hover:shadow-lg transition flex items-center gap-4">
      <img src={t.logo} alt={t.name} className="h-16 w-16 object-contain"/>
      <div>
        <p className="font-semibold">{t.name}</p>
        <p className="text-sm text-gray-500">Home: {t.homeGround}</p>
      </div>
    </Link>
  )
}

function TeamDetail(){
  const { teamId } = useParams()
  const [team, setTeam] = useState(null)
  useEffect(()=>{ fetch(`${API_BASE}/api/teams/${teamId}`).then(r=>r.json()).then(setTeam) }, [teamId])
  if(!team) return <Loading/>
  const roster = team.roster || {}
  const roles = [
    {key:'batsmen', label:'Batsmen'},
    {key:'bowlers', label:'Bowlers'},
    {key:'allRounders', label:'All-rounders'},
    {key:'wicketkeepers', label:'Wicketkeepers'},
  ]
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <img src={team.logo} alt={team.name} className="h-24 sm:h-32 object-contain"/>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{team.name}</h1>
          <p className="text-gray-600 mt-1">Home ground: {team.homeGround}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <Badge>Captain: {team.captain}</Badge>
            <Badge>Head Coach: {team.headCoach}</Badge>
            {team.owners?.map(o => <Badge key={o}>{o}</Badge>)}
          </div>
          <div className="mt-4 flex gap-3">
            {team.website && <a className="text-blue-600 underline" href={team.website} target="_blank">Website</a>}
            {team.social?.twitter && <a className="text-blue-600 underline" href={team.social.twitter} target="_blank">Twitter</a>}
            {team.social?.instagram && <a className="text-blue-600 underline" href={team.social.instagram} target="_blank">Instagram</a>}
          </div>
        </div>
      </div>

      {team.achievements?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Achievements</h2>
          <ul className="list-disc list-inside text-gray-700">
            {team.achievements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {roles.map(r => (
          <div key={r.key} className="bg-white rounded-xl border border-black/5 p-5">
            <h3 className="font-semibold mb-2">{r.label}</h3>
            <div className="flex flex-wrap gap-2">
              {(roster[r.key]||[]).map((p) => (
                <Link key={p} to={`/players/${team.id}-${p.toLowerCase().replace(/\s+/g,'-')}`} className="px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm">
                  {p}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Players(){
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('')
  const [team, setTeam] = useState('')
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])

  useEffect(()=>{ fetch(`${API_BASE}/api/teams`).then(r=>r.json()).then(setTeams) }, [])
  useEffect(()=>{
    const params = new URLSearchParams()
    if(query) params.set('q', query)
    if(role) params.set('role', role)
    if(team) params.set('team', team)
    fetch(`${API_BASE}/api/players?${params.toString()}`)
      .then(r=>r.json()).then(setPlayers)
  }, [query, role, team])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Players</h1>
      <div className="bg-white rounded-xl border border-black/5 p-4 flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 flex-1">
          <Search size={18} className="text-gray-500"/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search players..." className="w-full outline-none"/>
        </div>
        <select value={role} onChange={e=>setRole(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="">All Roles</option>
          <option>Batsman</option>
          <option>Bowler</option>
          <option>All-rounder</option>
          <option>Wicketkeeper</option>
        </select>
        <select value={team} onChange={e=>setTeam(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="">All Teams</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.shortName} • {t.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {players.map(p => <PlayerCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}

function PlayerCard({ p }){
  return (
    <Link to={`/players/${p.id}`} className="bg-white rounded-xl border border-black/5 p-5 hover:shadow-lg transition flex items-center gap-4">
      <img src={p.photo} alt={p.name} className="h-16 w-16 rounded-full object-cover bg-gray-100"/>
      <div>
        <p className="font-semibold">{p.name}</p>
        <p className="text-sm text-gray-500">{p.role} • {p.teamName}</p>
      </div>
    </Link>
  )
}

function PlayerDetail(){
  const { playerId } = useParams()
  const [player, setPlayer] = useState(null)
  useEffect(()=>{ fetch(`${API_BASE}/api/players/${playerId}`).then(r=>r.json()).then(setPlayer) }, [playerId])
  if(!player) return <Loading/>
  const s = player.iplStats || {}
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl border border-black/5 p-6 flex flex-col sm:flex-row gap-6 items-start">
        <img src={player.photo} className="h-28 w-28 rounded-full object-cover bg-gray-100"/>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{player.name}</h1>
          <p className="text-gray-600 mt-1">{player.role} • {player.teamName}</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <Stat label="Matches" value={s.matches ?? '-'} />
            <Stat label="Runs" value={s.runs ?? '-'} />
            <Stat label="Wickets" value={s.wickets ?? '-'} />
            <Stat label="Strike Rate" value={s.strikeRate ?? '-'} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Staff(){
  const [team, setTeam] = useState('')
  const [staff, setStaff] = useState([])
  const [teams, setTeams] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}/api/teams`).then(r=>r.json()).then(setTeams) }, [])
  useEffect(()=>{ fetch(`${API_BASE}/api/staff${team?`?team=${team}`:''}`).then(r=>r.json()).then(setStaff) }, [team])
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Coaching & Management</h1>
      <div className="mb-6">
        <select value={team} onChange={e=>setTeam(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="">All Teams</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {staff.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-black/5 p-5 flex items-center gap-4">
            <img src={s.photo} alt={s.name} className="h-16 w-16 rounded-full object-cover bg-gray-100"/>
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-gray-500">{s.role} • {s.teamName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Owners(){
  const [owners, setOwners] = useState([])
  const [teams, setTeams] = useState([])
  const [team, setTeam] = useState('')
  useEffect(()=>{ fetch(`${API_BASE}/api/teams`).then(r=>r.json()).then(setTeams) }, [])
  useEffect(()=>{ fetch(`${API_BASE}/api/owners${team?`?team=${team}`:''}`).then(r=>r.json()).then(setOwners) }, [team])
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Owners</h1>
      <div className="mb-6">
        <select value={team} onChange={e=>setTeam(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="">All Teams</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {owners.map(o => (
          <div key={o.id} className="bg-white rounded-xl border border-black/5 p-5 flex items-center gap-4">
            <img src={o.logo} alt={o.name} className="h-16 w-16 object-contain bg-gray-50 rounded"/>
            <div>
              <p className="font-semibold">{o.name}</p>
              <p className="text-sm text-gray-500">{o.teamName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Stats(){
  const [runs, setRuns] = useState([])
  const [wickets, setWickets] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}/api/stats/top-runs`).then(r=>r.json()).then(setRuns); fetch(`${API_BASE}/api/stats/top-wickets`).then(r=>r.json()).then(setWickets) }, [])
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Stats</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-black/5 p-5">
          <h3 className="font-semibold mb-3">Top Run Scorers</h3>
          <ul className="space-y-2">
            {runs.map((r,i)=> <li key={i} className="flex justify-between"><span>{r.name}</span><span className="font-semibold">{r.runs}</span></li>)}
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-black/5 p-5">
          <h3 className="font-semibold mb-3">Top Wicket Takers</h3>
          <ul className="space-y-2">
            {wickets.map((w,i)=> <li key={i} className="flex justify-between"><span>{w.name}</span><span className="font-semibold">{w.wickets}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Loading(){
  return (
    <div className="flex items-center justify-center min-h-[40vh] text-gray-500">Loading...</div>
  )
}

function Badge({ children }){
  return <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">{children}</span>
}

function App(){
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/teams" element={<Teams/>} />
          <Route path="/teams/:teamId" element={<TeamDetail/>} />
          <Route path="/players" element={<Players/>} />
          <Route path="/players/:playerId" element={<PlayerDetail/>} />
          <Route path="/staff" element={<Staff/>} />
          <Route path="/owners" element={<Owners/>} />
          <Route path="/stats" element={<Stats/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
