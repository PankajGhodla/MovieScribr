import React from "react";
import ".././App.css"
//import { Button } from "react-bootstrap";


class Header extends React.Component<{},{}>{
    componentDidMount () {
        const script = document.createElement("script");
    
        script.src="https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=dark&autoMode=false"
        script.async = true;
        document.body.appendChild(script);
        
        script.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0"
        script.async = true;
        document.body.appendChild(script);

        script.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0&appId=409474863002414&autoLogAppEvents=1"
        script.async = true;
        document.body.appendChild(script);

    }
    render(){

        return (
            <nav>
                
                <div className="navContainer">
                    <img src={require('../Images/Logo.png')}alt="Logo" className="logo"/>
                    <div id="fb-root"></div>
                    <div className="button">
                        <div className="fb-like" data-href="https://movies12.azurewebsites.net" data-width="30" data-layout="button_count" data-action="like" data-size="large" data-show-faces="true" data-share="true"></div>
                    </div>
                    <div className="navBtnCollection">
                    <div id="ytWidget"></div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;