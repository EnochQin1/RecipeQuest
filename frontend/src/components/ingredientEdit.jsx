import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const IngredientEdit = ({ onValueChange, onDelete, id, name = "", amount = ""}) => {
    const [ingredient, setIngredient] = useState(name);
    const [quantity, setQuantity] = useState(amount);

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

    const updateParent = (ing, quant) => {
        if (onValueChange) {
            onValueChange(id, ing, quant);
        }
    }

    return (
        <Stack spacing={2} direction='row' sx={{ width: 'auto', marginLeft: -20 }}>
            <TextField
            autoSelect
            sx={{ width: 300}}
            id='ingredient-entry'
            label='Ingredient'
            variant='outlined'
            value={localIngredient}
            onChange={(e) => setLocalIngredient(e.target.value)}
            onBlur={handleIngredientChange}
            />
            <TextField
                sx={{ width: 150}}
                id='ingredient-quantity'
                label='Quantity'
                variant='outlined'
                value={localQuantity}
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

export default IngredientEdit;





