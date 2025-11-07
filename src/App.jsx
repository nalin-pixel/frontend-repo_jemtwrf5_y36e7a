import Hero from './components/Hero';
import RoleGrid from './components/RoleGrid';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <Hero />
      <RoleGrid />
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
