import React from "react";
import ".././App.css"
import {Button} from "react-bootstrap"

class Header extends React.Component<{},{}>{
    render(){

        return (
            <nav>
                <div className="navContainer">
                    This is a nav bar
                    <div className="navBtnCollection">
                        <Button className = "navBtn" variant="outline-primary">Translate</Button>
                        <Button className = "navBtn" variant="outline-primary">Share</Button>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;