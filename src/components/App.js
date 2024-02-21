import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './style.css';

import Search from './Search'
import Footer from './Footer';
import Navbar from './Navbar';
import FilmInfo from './FilmInfo';
import FilmList from './FilmList';
import ActorInfo from './ActorInfo';
import EditFilm from './EditFilm';
import ProfilePage from './ProfilePage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Search /> } />
        <Route path="/film">
          <Route path=":filmId" element={ <FilmInfo />} />
        </Route>
        <Route path="/film-list/:category?/:actor?" element={ <FilmList /> }/>
        <Route path="/actor/:actorId" element={ <ActorInfo /> } />
        <Route path="/editFilm/:filmId" element={ <EditFilm />} />
        <Route path='/profile' element={ <ProfilePage /> } />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
