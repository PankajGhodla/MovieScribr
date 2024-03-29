import React from "react"
import ".././App.css"
import TextField from '@material-ui/core/TextField'
import {ReactComponent as Search} from "../Images/baseline-search-24px.svg"
import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircle from '@material-ui/icons/AddCircle'

interface IState {
    hubConnection: any,
    inputSearch: string,
    inputUrl: string,
    result: any,
    body:any,
    
}
interface IProp {
    updateMovieList: any,
    CountMethod: any,
    updateDeletedMovie:any
}

class InputSearch extends React.Component<IProp,IState>{
    public signalR = require("@aspnet/signalr");
    constructor(props:any){
        super(props)
        this.state = {
            hubConnection: new this.signalR.HubConnectionBuilder().withUrl("https://movieapiproject.azurewebsites.net/hub", {credentials: 'include' }).build(),

            inputSearch: "",
            inputUrl: "",
            result: null,
            body: null
        }
    }

    search  = () => {
        this.props.updateMovieList(this.state.inputSearch.trim())
        this.setState({
            inputSearch: ""
        })        
    }
    
    addUrl = () => {
        const input = this.state.inputUrl;
        this.setState({
            inputUrl: ""
        })
        const body ={
            "url": input
          };
        fetch('https://cors-anywhere.herokuapp.com/https://movieapiproject.azurewebsites.net/api/Movies',{
            method: 'POST',
            body : JSON.stringify(body),
            headers:{
                'content-type' : 'application/json-patch+json',
                Accept: 'text/plain'
            }
        }).then((response:any) =>{
            if (response.ok) {
                response.json()
              } else {
                throw new Error('Something went wrong');
              }
            })
            .then( () =>{
                this.props.updateMovieList()
                this.state.hubConnection.invoke("MovieAdded")
            } )
            .catch((error:any) => {
                console.log(error)
              });
    }

   
    
    //Signal R
    public componentDidMount = () => {

        this.state.hubConnection.on("Connect", ()  => {
        this.props.CountMethod();
        });
        
        this.state.hubConnection.on("UpdateMovieList", ()  => {
        this.props.updateMovieList();
    });
        this.props.updateDeletedMovie(this.update)
        this.state.hubConnection.start().then(() => this.state.hubConnection.invoke("BroadcastMessage"));
    }

    update = () => {
        this.state.hubConnection.on("UpdateMovieList", ()  => {
            this.props.updateMovieList();
        });
        this.state.hubConnection.invoke("MovieAdded")
    }
    render(){
        return(
            <div className="InputSearchContainer">
           <table className="InputSearchTableContainer">
            <thead>
            <tr>
                <th>
               <h1 className="InputSearchHeading"><span className="InputSearchGraphicOne">мσνιєѕ</span><span className="InputSearchGraphicTwo">ℓιѕт</span></h1>
               </th>

               <th className="InputSearchAddMovie">
               <TextField
                    id="outlined-search"
                    label="ADD URL"
                    //type="search"
                    className = "AddUrlBar"
                    placeholder="Add IMDB Url"
                    margin="normal"
                    value= {this.state.inputUrl}
                    //variant="outlined"
                    onChange = { (event: any ) => this.setState({inputUrl:event.target.value})}
                    
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={this.addUrl}>
                                <AddCircle/>
                            </IconButton>
                        </InputAdornment>,
                    }}
                />
                </th>
                <th className="InputSearchSearch">
                <TextField
                    id="outlined-search"
                    label="Search"
                    //type="search"
                    className = "SearchBar"
                    placeholder="Search here"
                    margin="normal"
                    //variant="outlined"
                    value = {this.state.inputSearch}
                    onChange = { (event: any ) => this.setState({inputSearch:event.target.value})}
                    
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={this.search}>
                                <Search/>
                            </IconButton>
                        </InputAdornment>,
                    }}
                />
                </th>
            </tr>
            </thead>
            </table>
            </div>
        )
    }
}

export default InputSearch;