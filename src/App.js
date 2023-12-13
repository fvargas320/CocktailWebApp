import './index.css';
import TopNavBar from "./components/NavigationComponents/TopNavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/NavigationPages/HomePage";
import Discover from "./pages/NavigationPages/Discover";
import Favorites from "./pages/NavigationPages/Favorites";
import ViewAll from "./pages/NavigationPages/ViewAll";
import { useTheme } from '@mui/material/styles';
import Profile from "./pages/Settings/Profile";
import CocktailCardView from "./pages/CocktailPages/CocktailCardView";
import AllReviews from "./components/Reviews/AllReviews";
import CocktailsViewAll from "./pages/CocktailPages/CocktailsViewAll";
import ViewAllCategories from "./components/Cocktail Collections/ViewAllCategories";
import SignIn from './pages/Authentication/SignIn';
import SignUpPage from './pages/Authentication/SignUp';
import SignInPage from './pages/Authentication/SignIn';
import Lists from "./pages/NavigationPages/ListsPage";
import ListsViewCocktails from "./components/Lists/ListsViewCocktails";

function App({signOut, user}) {
    const theme = useTheme();
    const appBarHeight = theme.mixins.toolbar.minHeight; // Get AppBar height

    return (
        <Router>
            <TopNavBar user = {user} signOut={signOut}/>
            <div style={{ marginTop: appBarHeight + 20 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/lists" element={<Lists />} />
                    <Route path="/lists/:listName" element={<ListsViewCocktails />} />
                    <Route path="/view-all" element={<ViewAll />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage/>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cocktail/:id" element={<CocktailCardView user = {user} />} />
                    <Route path="/all-reviews/:id" element={<AllReviews />} />
                    <Route path="/all/categories" element={<ViewAllCategories/>} />
                    <Route path="/all/categories/:collection" element={<CocktailsViewAll/>} />
                    <Route path="/all" exact element={<CocktailsViewAll/>} />

                </Routes>
            </div>
        </Router>
    );
}


export default App;
