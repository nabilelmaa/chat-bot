import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "../components/Chat";
import Home from "../components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="chat" element={<Chat />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
