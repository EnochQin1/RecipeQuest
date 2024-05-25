import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import GoogleSignUp from './pages/signup/GoogleSignUp'
import PasswordReset from './pages/PasswordReset/PasswordReset';
import ForgotPassword from './components/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.css';
import NewPassword from './pages/PasswordReset/NewPassword';
import ResetSuccess from './pages/PasswordReset/ResetSuccess';
import ProfilePageEdit from './pages/profilepages/ProfilePageEdit';
import ProfilePage from './pages/profilepages/ProfilePage';
import CreateRecipe from './pages/recipe/CreateRecipe';
import firebaseConfig from './firebase-authentication.jsx';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import VerifyEmail from './pages/emailverification/VerifyEmail';
import HomePage from './pages/homepage/home.jsx';
import RecipeSearch from './pages/search/RecipeSearch.jsx';
import RecipeDisplay from './pages/recipe/RecipeDisplay.jsx';
import ViewProfilePage from './pages/profilepages/ViewProfilePage';
import EditRecipe from './pages/recipe/EditRecipe';
import UserSearch from './pages/search/UserSearch.jsx';
import TestPage from './pages/testPage.jsx';
import SavedRecipes from './pages/recipe/SavedRecipes.jsx';
import ShoppingList from './pages/shoppinglist/ShoppingList.jsx';
import AboutPage from './pages/about/aboutPage.jsx';
import FollowingRecipes from './pages/recipe/FollowingRecipes.jsx';
import RipJerry from './pages/about/ripJerry.jsx';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <div className="pages">
                <Routes>
                    <Route
                    path="/"
                    element={<LogIn />}
                    />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="/ResetSuccess" element={<ResetSuccess />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/google-sign-up' element={<GoogleSignUp />} />
                    <Route path='/profile-page' element={<ProfilePage />} />
                    <Route path='/profile-page-edit' element={<ProfilePageEdit />} />
                    <Route path='/new-password' element={<NewPassword />} />
                    <Route path='/verify-email' element={<VerifyEmail />} />
                    <Route path='/create-recipe' element={<CreateRecipe />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/search' element={<RecipeSearch />} />
                    <Route path='/recipe-display' element={<RecipeDisplay />} />
                    <Route path='/view-profile-page' element={<ViewProfilePage />} />
                    <Route path='/edit-recipe' element={<EditRecipe />} />
                    <Route path='/user-search' element={<UserSearch />} />
                    <Route path='/test-page' element={<TestPage />} />
                    <Route path='/saved-recipes' element={<SavedRecipes />} />
                    <Route path='/shopping-list' element={<ShoppingList />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/rip-jerry' element={<RipJerry />} />
                    <Route path='/following-recipes' element={<FollowingRecipes />} />
                </Routes>
            </div>
            </BrowserRouter>
        </div>
    );
}

export default App;