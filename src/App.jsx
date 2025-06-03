import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CreateNote from './pages/CreateNote';
import ViewNotes from './pages/ViewNotes';
import EditNote from './pages/EditNote'; // 👈 New import added

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CreateNote />} />
            <Route path="/notes" element={<ViewNotes />} />
            <Route path="/edit/:id" element={<EditNote />} /> {/* 👈 New route added */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
