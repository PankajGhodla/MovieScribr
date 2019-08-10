import React from "react"
import ".././App.css"
import TextField from '@material-ui/core/TextField'
import {ReactComponent as Search} from "../Images/baseline-search-24px.svg"
import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircle from '@material-ui/icons/AddCircle'

interface IState {
    inputSearch: string,
    inputUrl: string,
    result: any,
    body:any,
}
interface IProp {
    updateMovieList: any
}

class InputSearch extends React.Component<IProp,IState>{
    constructor(props:any){
        super(props)
        this.state = {
            inputSearch: "",
            inputUrl: "",
            result: null,
            body: null
        }
    }

    search  = () => {
        console.log(this.state.inputSearch);
        
        this.props.updateMovieList(this.state.inputSearch.trim())
        this.setState({
            inputSearch: ""
        })
        console.log('this is a test', this.state.inputSearch);
        
    }
    
    addUrl = () => {
        console.log(this.state.inputUrl);
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
            .then(this.props.updateMovieList)
            .catch((error) => {
                console.log(error)
              });
    }
    
    render(){
        return(
            <div className="InputSearchContainer">
           <table className="InputSearchTableContainer">
            <thead>
            <tr>
                <th>
               <h1 className="InputSearchHeading"><span className="InputSearchGraphicOne">мσνιєѕ</span><span className="InputSearchGraphicTwo">ℓιѕтѕ</span></h1>
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