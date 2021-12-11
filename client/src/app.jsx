import React, {useContext, useEffect, useState} from "react";
import {Route, BrowserRouter} from "react-router-dom";

import "../static/container.css"; // include container class
import "../static/reset.css"; // reset default styles
import "./themes/white-theme.scss";// set white theme

import Header from "./components/header/header";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage/loginPage";
import GamePage from "./pages/gamePage/gamePage";
import Popup from "./components/popup/popup";
import SearchGamePopup from "./layouts/popups/searchGamePopup/searchGamePopup";
import TestPage from "./pages/testPage/testPage";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const dispatch = useDispatch();
    const searchGamePopupState = useSelector(state => state.searchGamePopup);

    return (
        <>
            <Popup
                titleClose={false} title="Поиск оппонента"
                isActive={searchGamePopupState} nonClosable>
                <SearchGamePopup/>
            </Popup>
            <BrowserRouter>
                <Header />

                <Route exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/game" component={GamePage}/>
                <Route path="/test" component={TestPage}/>
            </BrowserRouter>
        </>
    );
}

export default App;
