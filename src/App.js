import './index.css';
import TopNavBar from "./components/NavigationComponents/TopNavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/MainPages/HomePage";
import Discover from "./pages/MainPages/Discover";
import Favorites from "./pages/MainPages/Favorites";
import ViewAll from "./pages/MainPages/ViewAll";
import { useTheme } from '@mui/material/styles';
import Profile from "./pages/Settings/Profile";

function App() {
    const theme = useTheme();
    const appBarHeight = theme.mixins.toolbar.minHeight; // Get AppBar height

    return (
        <Router>
            <TopNavBar />
            <div style={{ marginTop: appBarHeight + 20 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/view-all" element={<ViewAll />} />
                    <Route path="/profile" element={<Profile />} />

                </Routes>
            </div>
        </Router>
    );
}


export default App;
