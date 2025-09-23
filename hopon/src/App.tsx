import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "./App.css"; 
import manLogo from "./assets/mangLogo.png"


const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="shell">
    <div className="phone">
      <header className="header">
        <Link to="/" className="logo-link">
          <img src={manLogo} alt="HopOn logo" className="logo-img" />
          <h1>HopOn!</h1>
        </Link>
      </header>
      <div className="phone-inner">{children}</div>
    </div>
  </div>
);


function CardButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button className="card-button" onClick={onClick}>
      {label}
    </button>
  );
}

const SPORTS = [
  { id: "soccer", name: "Soccer ⚽" },
  { id: "basketball", name: "Basketball 🏀" },
];

function Home() {
  const nav = useNavigate();
  return (
    <Shell>
      <section className="home-section">
        <h2 className="home-title">Choose a sport</h2>

        <div className="sport-grid">
          {SPORTS.map((s) => (
            <CardButton key={s.id} label={s.name} onClick={() => nav(`/sport/${s.id}`)} />
          ))}
        </div>

        <p className="home-note">
          ( This is a Demo version. Only Soccer and Basketball are available. )
        </p>
      </section>
    </Shell>
  );
}

function SportActions() {
  const { sportId } = useParams();
  const sport = SPORTS.find((s) => s.id === sportId);
  return (
    <Shell>
      <section className="actions-section">
        <h2 className="actions-title">{sport ? sport.name : "Selected Sport"}</h2>
        <p className="actions-sub">What would you like to do?</p>

        <div className="actions-buttons">
          <Link to={`/sport/${sportId}/join`}><CardButton label="Join a drop-in" /></Link>
          <Link to={`/sport/${sportId}/create`}><CardButton label="Create a drop-in" /></Link>
        </div>
      </section>
    </Shell>
  );
}

const JoinPage = () => {
  const { sportId } = useParams();
  return (
    <Shell>
      <h2>Join a drop-in</h2>
      <p>Sport: <b>{sportId}</b></p>
    </Shell>
  );
};

const CreatePage = () => {
  const { sportId } = useParams();
  return (
    <Shell>
      <h2>Create a drop-in</h2>
      <p>Sport: <b>{sportId}</b></p>
    </Shell>
  );
};


// Can make this more cleaner with nested routtes - this is just a demo
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sport/:sportId" element={<SportActions />} />
        <Route path="/sport/:sportId/join" element={<JoinPage />} />
        <Route path="/sport/:sportId/create" element={<CreatePage />} />
        <Route path="*" element={<Shell><p>Not found.</p></Shell>} />
      </Routes>
    </BrowserRouter>
  );
}
