import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../assets/logo.png';

import useStyles from './styles';
import { AppContext } from '../../contexts/AppContext';

const Navbar = () => {

    const classes = useStyles();
    const { searchItem, setSearchItem, setSearchToggle } = useContext(AppContext);
    const history = useHistory();

    const handleChange = (e) => {
        setSearchItem(e.target.value);
        // console.log(searchItem);
    }

    const handleKeyPress = (e) => {
        // console.log(e)
        if (searchItem === '' && e.key === "Enter") {
            history.push('/');
        }
        if (searchItem !== '' && e.key === "Enter") {
            setSearchToggle(prev => !prev);
            history.push('/search');
        }
    }
    const handleClick = (e) => {
        if (searchItem !== '') {
            setSearchToggle(prev => !prev);
            history.push('/search');
        }
    }

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Webshop" height="25px" className={classes.image} />
                        Webshop
                    </Typography>
                    <div className={classes.grow} />
                    <div>
                        <IconButton type="button" onClick={handleClick}>
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder="Search..."
                            value={searchItem}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar