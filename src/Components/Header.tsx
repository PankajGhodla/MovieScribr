import React from "react";
import ".././App.css"
//import {ReactComponent as Like} from "../Images/hand-in-a-thumbs-up-position.svg"
//import { Button } from "react-bootstrap";


class Header extends React.Component<{},{}>{
    
    componentDidMount =() => {
        const script = document.createElement("script");
    
        script.src="https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=dark&autoMode=false"
        script.async = true;
        document.body.appendChild(script);
        
       
    }

    render(){
        return (
            
            <nav>
                
                <div className="navContainer">
                    <img src={require('../Images/Logo.png')}alt="Logo" className="logo"/>
                    
                    
                    
                    {/*
                    <a className="button" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmovies12.azurewebsites.net%2F&amp;src=sdkpreparse" > <Button variant="primary">Share</Button> </a>                    
                    */}
                    <div className="button">
                        <div id="fb-root"></div>
                        <div className="fb-like fb_iframe_widget" data-href="https://movies12.azurewebsites.net" data-width={30} data-layout="button_count" data-action="like" data-size="large" data-show-faces="true" data-share="true" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&app_id=409474863002414&container_width=1280&href=https%3A%2F%2Fmovies12.azurewebsites.net%2F&layout=button_count&locale=en_US&sdk=joey&share=true&show_faces=true&size=large&width=30"><span style={{verticalAlign: 'bottom', width: '133px', height: '28px'}}><iframe name="f287c11f388a9dc" width="30px" height="1000px" title="fb:like Facebook Social Plugin" frameBorder={0} scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v2.3/plugins/like.php?action=like&app_id=409474863002414&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D44%23cb%3Dfe3bab49fe75%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ff3ce24eea76c3%26relation%3Dparent.parent&container_width=1280&href=https%3A%2F%2Fmovies12.azurewebsites.net%2F&layout=button_count&locale=en_US&sdk=joey&share=true&show_faces=true&size=large&width=30" style={{border: 'none', visibility: 'visible', width: '133px', height: '28px'}}  /></span></div>                    </div>
                    
                    
                    <div className="navBtnCollection">
                    <div id="ytWidget"></div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;