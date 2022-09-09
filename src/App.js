import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import Issues from './views/Issues';
import IssueDetails from './components/IssueDetails';
import CreateIssue from './views/CreateIssue';
import EditIssue from './views/EditIssue';
import Events from './views/Events';
import EventDetails from './components/EventDetails';
import Parts from './views/Parts';
import PartDetails from './components/PartDetails';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<IssueDetails />} />
        <Route path="/issues/create" element={<CreateIssue />} />
        <Route path="/issues/edit/:id" element={<EditIssue />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/parts/:universe" element={<Parts />} />
        <Route path="/parts/:id" element={<PartDetails />} />
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
