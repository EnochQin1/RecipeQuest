import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/RecipeQuestLogo.png';
import profileIcon from '../../images/UserProfileIcon.png';
import listIcon from '../../images/ShoppingListIcon.png';
import profileIconTransparent from '../../images/UserProfileTransparent.png';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../components/create.jsx';
import RecipeCard from '../../components/recipeCard.jsx';
import Stack from '@mui/material/Stack';
import NavBar from '../../components/navBar.jsx';
import IngredientDisplay from '../../components/ingredientDisplay.jsx';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import IngredientEdit from '../../components/ingredientEdit.jsx';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function ShoppingList() {
    const [shoppingList, setShoppingList] = useState([]);
    const [alphabetical, setAlphabetical] = useState(false);
    const [originalList, setOriginalList] = useState([]);
    const [firstRender, setFirstRender] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [openConfirmPopup, setOpenConfirmPopup] = useState(false);
    const [popupText, setPopupText] = useState('');
    const [sortButtonText, setSortButtonText] = useState('');

    const getShoppingList = async () => {
        const response = await fetch(`/api/users/getShoppingList/${localStorage.getItem("userEmail")}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: localStorage.getItem("userEmail") }),
        });

        const data = await response.json();

        if (response.ok) {
            handleInitialSort(data);
            //setShoppingList(data);
            //setOriginalList(data);
            /*if (localStorage.getItem("listSort") !== null) {
                setAlphabetical(!localStorage.getItem("listSort"))
                sortAlphabetical()

                if(localStorage.getItem("listSort")) {
                    setSortButtonText('Revert Order')
                } else {
                    setSortButtonText('Sort Alphabetically')
                }
            }*/
        } else {
            alert("Error Retrieving Shopping List");
        }
    };

    const handleInitialSort = (data) => {
        if (localStorage.getItem("listSort") !== null) {
            if (localStorage.getItem("listSort") === 'true') {
               initialSortAlphabetical(data);
            } else {
                setAlphabetical(false);
                setOriginalList(data);
                setShoppingList(data);
                setSortButtonText('Sort Alphabetically');
            }
        } else {
            setAlphabetical(false);
            setOriginalList(data);
            setShoppingList(data);
            setSortButtonText('Sort Alphabetically');
        }


    }

    const toggleEditMode = () => {
        if (editMode) {
            handleEdit()
        }
        setEditMode(!editMode);
    };

    const handleDeleteIngredient = (id) => {
        const filteredIngredients = shoppingList.filter(ing => ing["Identifier"] !== id);
        setShoppingList(filteredIngredients);
    }

    const handleAddIngredient = () => {
        setShoppingList(prevIngredients => [...prevIngredients, { "Identifier": Date.now(), "Name": '', "Amount": '' }]);
    };

    const handleIngredientChange = (id, ingredient, quantity) => {
        const updatedIngredients = shoppingList.map(ing => {
            if (ing["Identifier"] === id) {
                return { ...ing, "Name": ingredient, "Amount": quantity };
            }
            return ing;
        });
        setShoppingList(updatedIngredients);
    }



    const handleEdit = async () => {
        const response = await fetch(`/api/users/editedShoppingList/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Email": localStorage.getItem("userEmail"),
                "ShoppingList": shoppingList
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert("Error Deleting From Shopping List");
        }
    };

    const initialSortAlphabetical = (data) => {
        setSortButtonText('Revert Order')
        const list = data.slice().sort((a, b) => a["Name"].localeCompare(b["Name"]))
        setOriginalList(data);
        setShoppingList(list);
        setAlphabetical(true);
        //localStorage.setItem('listSort', true);
    }

    const sortAlphabetical = () => {
        if (alphabetical) {
            setSortButtonText('Sort Alphabetically')
            const list = originalList;
            setShoppingList(list)
            setAlphabetical(false);
            localStorage.setItem("listSort", false)
        } else {
            setSortButtonText('Revert Order')
            const list = originalList.slice().sort((a, b) => a["Name"].localeCompare(b["Name"]))
            setShoppingList(list);
            setAlphabetical(true);
            localStorage.setItem("listSort", true)
        }
    };

    const emptyShoppingCart = async () => {
        const response = await fetch(`/api/users/deleteShoppingList/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: localStorage.getItem("userEmail") }),
        });
        const data = await response.json();
        if (data.ok) {
            alert("Shopping List Emptied!");
        }
        setShoppingList([]);
    };

    useEffect(() => {
        if (firstRender) {
            getShoppingList();
            setFirstRender(false);
        }
    }, []);

    const handlePopupOpen = () => {
        setOpenConfirmPopup(true);
        if (shoppingList.length > 0) {
            setPopupText('Are you sure you want to empty your shopping list?');
        }
        else {
            setPopupText('Your shopping list is already empty!');
        }
    }

    const handlePopupClose = () => {
        setOpenConfirmPopup(false);
    }

    const handleConfirm = () => {
        emptyShoppingCart();
        handlePopupClose();
    }

    

    return (
        <div>
            <NavBar />

            <Dialog open={openConfirmPopup} onClick={handlePopupClose}>
                <DialogTitle sx={{ fontFamily: 'Roboto'}}>{popupText}</DialogTitle>
                <DialogActions>
                    <Button onClick={handlePopupClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
                </Dialog>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 120, paddingBottom: 100 }}>
                <h2 style={{ fontFamily: 'Roboto'}}>Your Shopping List</h2>
                <Stack direction="row" spacing={2}>
                    <Button
                        style={{ width: '200px', marginTop: 20, marginBottom: 10 }}
                        variant='flat'
                        type='submit'
                        onClick={sortAlphabetical}
                    >
                        {sortButtonText}
                    </Button>

                    <Button
                        style={{ width: '200px', marginTop: 20, marginBottom: 10 }}
                        variant='flat'
                        type='button'
                        onClick={toggleEditMode}
                    >
                        {editMode ? 'Done Editing' : 'Edit Mode'}
                    </Button>
                </Stack>

                <div>
                    {editMode ?
                        <Stack spacing={2} direction='col' sx={{ width: 'auto', marginLeft: 5, marginTop: 3 }}>
                            <h1 style={{ fontFamily: 'Roboto', fontSize: 23 }}>Add Ingredient</h1>
                            <IconButton aria-label="add" onClick={handleAddIngredient} style={{ marginTop: -4, marginRight: 20 }} >
                                <AddIcon />
                            </IconButton>
                        </Stack> : ''}
                </div>

                {/*<ul style={{ marginTop: 20, listStyle: 'none', padding: 0, marginLeft: 250}}>
                    {shoppingList.length > 0 ? (
                        shoppingList.map((shoppingItem, index) => (
                            
                            <li key={index} style={{ marginBottom: 10 }}>
                                <IngredientDisplay
                                    ingredient={shoppingItem["Name"]}
                                    quantity={shoppingItem["Amount"]}
                                />
                                {editMode && (
                                    
                                    {/*<div>
                                        <Button variant="warning" onClick={() => handleEditItem(index)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteItem(index)}>
                                            Delete
                                        </Button>
                                    </div> */} {/*}
                                )}
                            </li>
                        ))
                    ) : (
                        <p style={{ marginTop: 20, marginLeft: -200 }}>Shopping Cart Empty!</p>
                    )}
                </ul>*/}

                <ul style={{ marginTop: 20, marginLeft: 250 }}>
                    {shoppingList.length > 0 ? (
                        editMode ? (
                            shoppingList.map((shoppingItem) => (
                                <div key={shoppingItem["Identifier"]} style={{ marginBottom: 10 }}>
                                    <IngredientEdit
                                        id={shoppingItem["Identifier"]}
                                        name={shoppingItem["Name"]}
                                        amount={shoppingItem["Amount"]}
                                        onValueChange={handleIngredientChange}
                                        onDelete={handleDeleteIngredient}
                                    />
                                </div>
                            ))
                        ) : (shoppingList.map((shoppingItem) => (
                            <div key={shoppingItem["Identifier"]} style={{ marginLeft: -70, marginBottom: 10 }}>
                                <IngredientDisplay
                                    ingredient={shoppingItem["Name"]}
                                    quantity={shoppingItem["Amount"]}
                                />
                            </div>
                        ))
                        )
                    ) : (<p style={{ marginTop: 20, marginLeft: -220 }}>Shopping Cart Empty!</p>)
                    }

                </ul>

                <Button
                    style={{ width: '200px', marginTop: 20, marginBottom: 10, marginLeft: -20 }}
                    variant='flat'
                    type='submit'
                    onClick={handlePopupOpen}
                >
                    Empty Shopping List
                </Button>
            </div>
        </div>
    );
}

export default ShoppingList;
