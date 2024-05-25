import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from '../../components/navBar.jsx';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RecipeCard from '../../components/recipeCard.jsx';
import burgerImage from '../../images/Default.jpg';
function FollowingRecipes() {


  const [FollowingRecipes, setFollowingRecipes] = useState([]);
  const [firstRender, setFirstRender] = useState(true);


  useEffect(() => {
    const getFollowingRecipes = async () => {
      const response = await fetch(`/api/users/getFollowingRecipes/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: localStorage.getItem("userEmail") }),
      });

      const data = await response.json();
      if (response.ok) {
        setFollowingRecipes(data);
      } else {
        alert("Error Retrieving Following Recipes");
      }
    }


    if (firstRender) {
      getFollowingRecipes();
      setFirstRender(false);
    }
  });

  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: 100 }}>
        <h1 className="following-recipes-title">Recipes from followed users</h1>

        {
          <ul style={{ marginTop: 20 }}>
            {FollowingRecipes.length > 0
              ? FollowingRecipes.map((recipe, index) => (
                <div key={index}>
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
              )) : <p style={{ marginLeft: -30 }}>No Recipes Yet!</p>
            }
          </ul>
        }

        {FollowingRecipes.length === 0 && (
          <p>No recipes from followed users, start following new users!</p>
        )}
      </Container>
    </div>

  );
}

export default FollowingRecipes;
