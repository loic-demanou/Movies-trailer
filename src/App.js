import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Container } from '@mui/material';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import NotFound from './NotFound';

function App() {
  return (
      <Router>
        <Header />
        <div className="app">
          <Container>
            <Switch>
              <Route path= '/' component={Trending} exact />
              <Route path= '/movies' component={Movies} />
              <Route path= '/series' component={Series} />
              <Route path= '/search' component={Search} />
              <Route path= '*' component={NotFound} />
            </Switch>
          </Container>
        </div>
        <SimpleBottomNavigation />
      </Router>
  );
}

export default App;
