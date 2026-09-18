import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Vault from "./pages/Vault";
import SharePreview from "./pages/SharePreview";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex items-center justify-between h-16 md:h-20 lg:h-24 px-6 text-white border-b border-white/20 ">
        <Link to="/" className="flex items-center gap-2 font-bold text-3xl font-stretch-ultra-expanded">
          <img src="/pwdman.png" alt="" className="h-10 w-10 object-contain" />
          pwdman
        </Link>

        <div className="flex items-center gap-4 text-sm font-semibold tracking-widest uppercase">
          <Link to="/login" className="w-28 flex justify-center px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors">Login</Link>
          <Link to="/signup" className="w-28 flex justify-center px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-700 transition-colors">Signup</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Vault />} />
        <Route path="/share-preview/:id" element={<SharePreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;