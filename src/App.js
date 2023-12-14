import './index.css';
import TopNavBar from "./components/NavigationComponents/TopNavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/NavigationPages/HomePage";
import Discover from "./pages/NavigationPages/Discover";
import Favorites from "./pages/NavigationPages/Favorites";
import { useTheme } from '@mui/material/styles';
import Profile from "./pages/Settings/Profile";
import CocktailCardView from "./pages/CocktailPages/CocktailCardView";
import AllReviews from "./components/Reviews/AllReviews";
import CocktailsViewAll from "./pages/CocktailPages/CocktailsViewAll";
import ViewAllCategories from "./pages/Category Pages/ViewAllCategories";
import SignUpPage from './pages/Authentication/SignUpPage';
import SignInPage from './pages/Authentication/SignInPage';
import Lists from "./pages/NavigationPages/ListsPage";
import ListsViewCocktails from "./pages/CocktailPages/ListsViewCocktails";
import PrivateRoute from "./components/NavigationComponents/PrivateRoute";

function App({signOut}) {

    const theme = useTheme();
    const appBarHeight = theme.mixins.toolbar.minHeight; // Get AppBar height

    return (
        <Router>
            <TopNavBar signOut={signOut}/>
            <div style={{ marginTop: appBarHeight + 20 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage/>} />

                    <Route path="/favorites" element={<PrivateRoute element={Favorites} />} />
                    <Route path="/lists" element={<PrivateRoute element={Lists} />} />
                    <Route path="/discover" element={<PrivateRoute element={Discover} />} />
                    <Route path="/lists/:listName" element={<PrivateRoute element={ListsViewCocktails} />} />
                    <Route path="/profile" element={<PrivateRoute element={Profile} />} />

                    <Route path="/cocktail/:id" element={<CocktailCardView/>} />
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
