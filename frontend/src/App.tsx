import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Demo from "./pages/Demo";

export default function App() {
    return (
        <BrowserRouter>
            <nav className="flex gap-4 border-b border-gray-200 p-4 font-medium">
                <Link to="/">Home</Link>
                <Link to="/demo">Demo</Link>
            </nav>
            <main className="mx-auto max-w-4xl p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/demo" element={<Demo />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
