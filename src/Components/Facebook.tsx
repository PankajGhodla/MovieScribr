import React from "react"
import FacebookLogin from "react-facebook-login"
import Combine from "./Combine"
import "../App.css"
import Header from "./Header"

interface IState {
    isLoggedin :boolean,
    name: string
}

class Facebook extends React.Component<{},IState>{
    constructor(props: any){
        super(props)
        this.state = {
            isLoggedin: false,
            name: ""
        }
    }
    componentClicked =() => {
        console.log('I was clicked');
        
    }
    responseFacebook = (respose:any ) =>{
        console.log(respose);
        this.setState({
            isLoggedin: true,
            name: respose.name
        })
    }
    render(){
        let fbContent: any
        if (this.state.isLoggedin){
            console.log(this.state.name);
            
            fbContent = <Combine/>
        }else{
            fbContent = (
                <div>
                    <Header/>
                    <div className="displayText"> 
                    <h1>Please authenticate with Facebook</h1>
                    <br/>
                        <div className="loginBtn">
                        <FacebookLogin
                            appId="409474863002414"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook} 
                        />
                        </div>
                    </div>
                </div>)
            
        }
    return fbContent
    }
}


export default Facebook