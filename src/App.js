import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Listview from './views/Listview';
import Aboutview from './views/Aboutview';
import Contactview from './views/Contactview';
import ThemeContextProvider from './contexts/ThemeContext';
import Authenticated from './Authenticated';
import Login from './views/Login'
import SignUp from './views/SignUp'
import Newblog from './views/Newblog'
import UsercontextProvider from './contexts/Usercontext';


function App() {
  return (
    <Router>
      <div className="App">
        <div>
        <ThemeContextProvider>
            <UsercontextProvider>
                <Routes >
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/signup' element={<SignUp/>}/>
                  <Route element={<Authenticated/>}>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/addblog' element={<Newblog/>}/>
                    <Route exact path='/listview/:id' element={<Listview/>}/>
                    <Route exact path='/aboutview' element={<Aboutview/>}/>
                    <Route exact path='/contactview' element={<Contactview/>}/>
                  </Route>
                </Routes>
            </UsercontextProvider>
        </ThemeContextProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
