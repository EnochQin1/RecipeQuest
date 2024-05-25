import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from '../../components/navBar.jsx';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RecipeCard from '../../components/recipeCard.jsx';
import burgerImage from '../../images/Default.jpg';

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [firstRender, setFirstRender] = useState(true);


  useEffect(() => {
    const getSavedRecipes = async () => {
      const response = await fetch('/api/users/getSavedRecipes/' + localStorage.getItem("userEmail"), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSavedRecipes(data["Saved"]);
      } else {
        alert("Error Retrieving Saved Recipes");
      }
    }
    if (firstRender) {
      getSavedRecipes();
      setFirstRender(false);
    }
  });

  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: 100 }}>
        <h1 style={{ fontFamily: 'Roboto' }}>Saved Recipes</h1>
        {/* Links to recipe display pages will appear here i think */}

        {
          <ul style={{ marginTop: 20 }}>
            {savedRecipes.length > 0
              ? savedRecipes.map((recipe, index) => (
                <div key={index} style={{ marginBottom: 15 }}>
                  <RecipeCard
                    image={burgerImage}
                    title={recipe["Title"]}
                    badges={recipe["Tags"]}
                    width='50rem'
                    sourceUser={recipe["Poster"]}
                    email={recipe["PosterEmail"]}
                    id={recipe["_id"]}
                    rating={recipe["Rating"]["AverageRating"]} />
                </div>
              )) : <p style={{ marginLeft: -80, fontFamily: 'Roboto' }}>No saved recipes yet. Start saving your favorite recipes!</p>
            }
          </ul>
        }

      </Container>
    </div>

  );
}

export default SavedRecipes;
