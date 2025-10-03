import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Review from "./Review";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [msgVisible, setMsgVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 👈 for mobile menu toggle

  const featuredRecipes = [
    {
      name: "Chicken Mandhi",
      img: "https://img.freepik.com/premium-photo/close-up-chicken-mandi-rice-dish-generative-ai_786587-4196.jpg",
      link: "https://www.pepperdelight.com/chicken-mandi/",
    },
    {
      name: "Chicken Biriyani",
      img: "https://img.freepik.com/free-photo/plate-food-with-lemon-lemon_505751-3815.jpg",
      link: "https://www.indianhealthyrecipes.com/chicken-biryani-recipe/",
    },
    {
      name: "Shawarma",
      img: "https://img.freepik.com/free-photo/grilled-beef-taco-flatbread-with-fresh-tomato-guacamole-generated-by-artificial-intelligence_188544-125123.jpg",
      link: "https://www.recipetineats.com/chicken-sharwama-middle-eastern/",
    },
    {
      name: "Paneer Masala",
      img: "https://img.freepik.com/free-photo/curry-with-chicken-onions-indian-food-asian-cuisine_2829-4415.jpg",
      link: "https://www.indianhealthyrecipes.com/paneer-butter-masala-restaurant-style/",
    },
    {
      name: "Butter Chicken",
      img: "https://img.freepik.com/premium-photo/indian-butter-chicken-black-bowl-wooden-table_198067-559042.jpg",
      link: "https://www.indianhealthyrecipes.com/butter-chicken/",
    },
    {
      name: "Ghee Rice",
      img: "https://img.freepik.com/premium-photo/fried-rice_718564-13.jpg",
      link: "https://www.indianhealthyrecipes.com/ghee-rice/",
    },
    {
      name: "Lasagna",
      img: "https://img.freepik.com/free-photo/delicious-pasta-plate_23-2150690693.jpg",
      link: "https://www.simplyrecipes.com/recipes/lasagna/",
    },
    {
      name: "Pasta Alfredo",
      img: "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-8727.jpg",
      link: "https://www.allrecipes.com/recipe/23431/to-die-for-fettuccine-alfredo/",
    },
    {
      name: "Margherita Pizza",
      img: "https://img.freepik.com/premium-photo/circular-margherita-pizza-chopping-board-table_23-2147926081.jpg",
      link: "https://www.simplyrecipes.com/recipes/margherita_pizza/",
    },
    {
      name: "BBQ Ribs",
      img: "https://img.freepik.com/free-photo/grilled-ribs-bbq-sauce_140725-3422.jpg",
      link: "https://www.delish.com/cooking/recipe-ideas/a19885318/oven-baked-ribs-recipe/",
    },
    {
      name: "Tandoori Chicken",
      img: "https://img.freepik.com/free-photo/side-view-doner-with-grilled-chicken-greens-lettuce-tomato-french-fries-table_141793-4881.jpg",
      link: "https://www.indianhealthyrecipes.com/tandoori-chicken/",
    },
    {
      name: "Sushi Platter",
      img: "https://img.freepik.com/free-photo/sushi-rolls-served-black-stone-plate_123827-20688.jpg",
      link: "https://www.justonecookbook.com/sushi-roll/",
    },
    {
      name: "Pav Bhaji",
      img: "https://img.freepik.com/premium-photo/pav-bhaji-is-fast-food-dish-from-india-consists-thick-vegetable-curry-served-soft-bread-rolls_466689-77565.jpg",
      link: "https://www.vegrecipesofindia.com/pav-bhaji-recipe-mumbai-pav-bhaji/",
    },
    {
      name: "Falafel Wrap",
      img: "https://img.freepik.com/free-photo/falafel-wrap-with-hummus-sauce-wooden-board_140725-1453.jpg",
      link: "https://www.recipetineats.com/falafel-recipe/",
    },
  ];

  const handleSearch = () => {
    if (!search.trim()) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.meals) {
          setMeals([]);
          setMsgVisible(true);
        } else {
          setMeals(data.meals);
          setMsgVisible(false);
        }
        setSelectedMeal(null);
      })
      .catch(() => alert("Error fetching meals."));
  };

  const showMealDetails = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedMeal(data.meals[0]))
      .catch(() => alert("Error fetching meal details."));
  };

  return (
    <div>
      {/* ✅ Responsive Navbar */}
      <nav className="navigation p-3 bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="logo">Delicious Recipe</h1>

          {/* Hamburger Button */}
          <button
            className="menu-toggle d-md-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className={`nav-list d-md-flex gap-3 ${menuOpen ? "open" : ""}`}>
            <a href="/">Home</a>
            <a href="#cards">Recipe</a>
            <a href="#about-footer">About Us</a>
            <a href="#footer-class">Contact</a>
            <a href="#Review">Review</a>
          </div>
        </div>
      </nav>

      {/* Hero & Search */}
      <div className="container py-5 text-center">
        <h1 className="headname mb-4">
          <span>B</span>ite Food
        </h1>
        <div className="d-flex justify-content-center mb-3 flex-wrap">
          <input
            type="text"
            className="form-control w-50 me-2 mb-2"
            placeholder="Search for meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary mb-2" onClick={handleSearch}>
            Search
          </button>
        </div>
        {msgVisible && <p className="text-danger">No meals found!</p>}
      </div>

      {/* Meal Search Results */}
      <div className="container d-flex flex-wrap justify-content-center gap-3 mb-5">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="card m-2"
            style={{ width: "12rem", cursor: "pointer" }}
            onClick={() => showMealDetails(meal.idMeal)}
          >
            <img
              src={meal.strMealThumb}
              className="card-img-top"
              alt={meal.strMeal}
            />
            <div className="card-body text-center">
              <h5 className="card-text">{meal.strMeal}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Meal Details */}
      {selectedMeal && (
        <div className="container mb-5 d-flex justify-content-center">
          <div className="card" style={{ width: "19rem" }}>
            <img
              src={selectedMeal.strMealThumb}
              className="card-img-top"
              alt={selectedMeal.strMeal}
            />
            <div className="card-body">
              <h3>{selectedMeal.strMeal}</h3>
              <h6>Ingredients & Info</h6>
              <ul>
                <li>
                  <strong>Area:</strong> {selectedMeal.strArea}
                </li>
                <li>
                  <strong>Category:</strong> {selectedMeal.strCategory}
                </li>
                {Array.from({ length: 20 }, (_, i) =>
                  selectedMeal[`strIngredient${i + 1}`]
                )
                  .filter((ing) => ing)
                  .map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Featured Recipes */}
      <div id="cards" className="container py-5">
        <h2 className="text-center mb-4">Featured Recipes</h2>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {featuredRecipes.map((recipe, idx) => (
            <div className="card m-2" style={{ width: "14rem" }} key={idx}>
              <img
                src={recipe.img}
                className="card-img-top"
                alt={recipe.name}
              />
              <div className="card-body text-center">
                <h5>{recipe.name}</h5>
                <a
                  href={recipe.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary mt-2"
                >
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about-footer" className="container py-5 text-center">
        <h2>About Us</h2>
        <p>
          Welcome to our food recipe website, where we share our passion for
          cooking and delicious food.
        </p>
        <h3>Our Mission</h3>
        <p>
          Our mission is to provide the best food recipes, cooking tips, and
          techniques to help you become a confident cook.
        </p>
        <div id="Review">
          <Review />
        </div>
      </div>

      {/* Footer */}
      <footer
        id="footer-class"
        className="bg-dark text-light py-4 mt-5 text-center text-md-start"
      >
        <div className="container d-flex justify-content-between flex-wrap">
          <div className="mb-3">
            <h5>Contact Us</h5>
            <p>+1 123 456 7890</p>
            <p>
              <a href="mailto:info@foodrecipe.com" className="text-light">
                @foodrecipe.com
              </a>
            </p>
            <p>123 Main St, Anytown, USA</p>
          </div>
          <div className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="#cards" className="text-light">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#about-footer" className="text-light">
                  About
                </a>
              </li>
              <li>
                <a href="#Review" className="text-light">
                  Review
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-3 text-center text-md-end">
            <h5>Follow Us</h5>
            <div className="d-flex gap-2 justify-content-center justify-content-md-end">
              <a href="#" className="text-light">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          &copy; 2025 Food Recipe. All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default App;
