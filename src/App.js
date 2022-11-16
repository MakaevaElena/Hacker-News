import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import StoryPage from './pages/StoryPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/story/:id" element={<StoryPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
