import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Popper from '@mui/material/Popper'

const IngredientEntry = ({ onValueChange, onDelete, id, name = "", amount = "", validIngredient = true, validQuantity = true }) => {
    const [ingredient, setIngredient] = useState('');
    const [quantity, setQuantity] = useState('');

    //local values used to reduce lag when typing in fields
    const [localIngredient, setLocalIngredient] = useState(name);
    const [localQuantity, setLocalQuantity] = useState(amount);

    const handleIngredientChange = () => {
        setIngredient(localIngredient);
        updateParent(localIngredient, quantity);
    }

    const handleQuantityChange = () => {
        setQuantity(localQuantity);
        updateParent(ingredient, localQuantity);
    }

    const handleIngredientInput = (event, newValue) => {
        setLocalIngredient(newValue);
    }

    const updateParent = (ing, quant) => {
        if (onValueChange) {
            onValueChange(id, ing, quant);
        }
    }

    return (
        <Stack spacing={2} direction='col' sx={{ width: 'auto' }}>
            <Autocomplete
                style={{ marginRight: 20 }}
                freeSolo
                autoSelect
                sx={{ width: 300 }}
                id='ingredient-autocomplete'
                label='Ingredient'
                value={localIngredient}
                onInputChange={handleIngredientInput}
                onBlur={handleIngredientChange} //makes less laggy
                PopperComponent={({ style, ...props }) => ( //makes menu always appear below text
                    <Popper
                        {...props}
                        style={{ ...style, height: 0 }}
                    />
                )}
                options={exampleIngredients.map((option) => option.name)}
                renderInput={(params) => (<TextField {...params} error={!validIngredient} label='Ingredient' value={params} />)}
            />
            <TextField
                sx={{ width: 150 }}
                id='ingredient-quantity'
                label='Quantity'
                variant='outlined'
                value={localQuantity}
                error={!validQuantity}
                onChange={(e) => setLocalQuantity(e.target.value)}
                onBlur={handleQuantityChange}
                style={{ marginRight: 20 }}
            />

            <IconButton aria-label="delete" onClick={() => onDelete(id)}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
};

export default IngredientEntry;


const exampleIngredients = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Cinnamon' },
    { name: 'Flour' },
    { name: 'Sugar' },
    { name: 'Salt' },
    { name: 'Pepper' },
    { name: 'Eggs' },
    { name: 'Milk' },
    { name: 'Butter' },
    { name: 'Baking Soda' },
    { name: 'Baking Powder' },
    { name: 'Vanilla Extract' },
    { name: 'Chocolate Chips' },
    { name: 'Cocoa Powder' },
    { name: 'Peanut Butter' },
    { name: 'Oats' },
    { name: 'Rice' },
    { name: 'Chicken' },
    { name: 'Beef' },
    { name: 'Pork' },
    { name: 'Fish' },
    { name: 'Shrimp' },
];




