import 'bootstrap/dist/css/bootstrap.min.css';
import './common/App.css';
import './common/style.css';

import Search from './components/Search';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import FilmInfo from './components/FilmInfo';
import FilmList from './components/FilmList';
import ActorInfo from './components/ActorInfo';
import EditFilm from './components/EditFilm';
import ProfilePage from './components/ProfilePage';
import NotFound from './components/NotFound';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddFilm from './components/AddFilm';


function App() {
  const url = "http://16.171.166.101:8080";

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={ <Search baseUrl={url}/> } />
        <Route path="/film/:filmId" element={ <FilmInfo baseUrl={url} />} />
        <Route path="/film-list/:category?/:actor?" element={ <FilmList baseUrl={url}/> }/>
        <Route path="/actor/:actorId" element={ <ActorInfo baseUrl={url}/> } />
        <Route path="/edit-film/:filmId" element={ <EditFilm baseUrl={url}/>} />
        <Route path='/add-film' element={ <AddFilm baseUrl={url} /> } />
        <Route path='/profile' element={ <ProfilePage baseUrl={url}/> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
