import './App.css';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Activities from './pages/activiteiten/Activities';
import Media from './pages/media/Media';
import Contact from './pages/contact/Contact';
import Admin from './pages/admin/Admin';
import Notfound from './pages/home/notfound/Notfound';
import ActivityDetail from './pages/activiteiten/detail/ActvitityDetail';
import Inschrijven from './pages/inschrijven/Inschrijven';

function App() {
  
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/*" element={<Notfound />} />
          <Route exact path="/activiteiten" element={<Activities />} />
          <Route exact path="/media" element={<Media />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/inschrijven" element={<Inschrijven />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/detail/:id" element={<ActivityDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
