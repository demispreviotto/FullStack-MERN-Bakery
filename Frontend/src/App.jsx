import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Home from './components/pages/Home/Home'
import Footer from './components/layout/Footer/Footer'
import CostList from './components/pages/CostList.jsx/CostList'
import Login from './components/pages/Login/Login'
import Register from './components/pages/Register/Register'
import Profile from './components/pages/Profile/Profile'
import RecipesPage from './components/pages/RecipesPage/RecipesPage'
import RecipesDetailPage from './components/pages/RecipesDetailPage/RecipeDetailPage'
import IngredientsPage from './components/pages/IngredientsPage/IngredientsPage'
import IngredientsDetailPage from './components/pages/IngredientsDetailPage/IngredientDetailPage'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/recipes' element={<RecipesPage />} />
          <Route path='/recipes/:_id' element={<RecipesDetailPage />} />
          <Route path='/ingredients' element={<IngredientsPage />} />
          <Route path='/ingredients/:_id' element={<IngredientsDetailPage />} />
          <Route path='/cost-list' element={<CostList />} />
          <Route path='/price-list' element={<CostList />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
