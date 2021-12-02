import React from 'react';
import "./searchGamePopup.scss";
import Spinner from "../../../components/spinner/spinner";
import Button from "../../../components/button/button";

const SearchGamePopup = (props) => {

    function closePopup() {
        props.setActive(false);
    }

    return (
        <div className="searchGamePopup">
            <p className="gameModeName">Simple and fast</p>
            <div className="spinnerContainer">
                <Spinner/>
            </div>
            <div className="bottomRow">
                <Button onClick={closePopup} text="Cancel"/>
            </div>
        </div>
    );
};

export default SearchGamePopup;