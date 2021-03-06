import React, {forwardRef} from 'react';
import "./buttonList.scss";

const ButtonList = (props) => {

    return (
        <div className="buttonList">
            { props.buttons.map( (btn) => {
                    return (<button
                        onClick={btn.onclick}
                        onKeyPress={btn.onclick}
                        key={Math.random()}
                        className="listableButton">{btn.title}</button>);
                } )
            }
        </div>);
};

export default ButtonList;
