import React from 'react';
import SquidwardGif from '../../images/squidward-grave.gif';
import NavBar from '../../components/navBar.jsx';


function RipJerry() {
    return (
        <div style={{ alignContent: 'center' }}>
            <NavBar />
            <img src={SquidwardGif} alt="Squidward Grave" style={{ marginTop: 150, marginLeft: 150, marginBottom: 30 }}/>
            <p style={{ fontFamily: 'Roboto', wordWrap: 'break-word', width: 600}}>
            In Loving Memory of Jerry, a valued friend, colleague, and founding member of RecipeQuest.
            May he use his freed up schedule wisely and pass 354 with an A+
            </p>
        </div>
    )
}

export default RipJerry;