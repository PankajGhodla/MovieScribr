import React from "react";
import ".././App.css"
import { Button } from "react-bootstrap";


class Header extends React.Component<{},{}>{
    componentDidMount () {
        const script = document.createElement("script");
    
        script.src="https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=dark&autoMode=false"
        script.async = true;
        document.body.appendChild(script);
        
        script.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0"
        script.async = true;
        document.body.appendChild(script);
    }
    render(){

        return (
            <nav>
                
                <div className="navContainer">
                    <img src={require('../Images/Logo.png')}alt="Logo" className="logo"/>
                    <div id="fb-root"></div>
                    <a className="button" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmovies12.azurewebsites.net%2F&amp;src=sdkpreparse" > <Button variant="primary">Share</Button> </a>
                    <div className="navBtnCollection">
                    <div id="ytWidget"></div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;