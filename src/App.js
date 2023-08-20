
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AdminHome from './AdminHome';
import UserHome from './UserHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Link to="/login">login</Link>
      <Link to="/register">register</Link>

      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/adminHome" element={<AdminHome></AdminHome>}></Route>
        <Route path="/userHome" element={<UserHome></UserHome>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
