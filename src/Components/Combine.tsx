import * as React from 'react';
import '../App.css';
import Header from "./Header";
import Main from "./Main"
import MovieList from './MovieList';
import InputSearch from "./InputSearch"


interface IState {
  //hubConnection: any,
  updateListMethod: any,
  List: any,
  currentMovie: any,
  count: number,
}

class App extends React.Component<{}, IState>{
 // public signalR = require("@aspnet/signalr");
  constructor(props: any){
    super(props)
    this.state = {
      //hubConnection: new this.signalR.HubConnectionBuilder().withUrl("https://movieapiproject.azurewebsites.net/hub", {credentials: 'include' }).build(),
      count: 0,
      updateListMethod: null,
      List: [],
      currentMovie: "",
    }   
  }

  // This function will get the updateList method formt the MovieList Component as it's input 
  // and store it in the state of app
  movieListFromChild = (callback: any) =>{
    this.setState({
      updateListMethod: callback
    })    

  }

  // This updates the curret movie 
  updateCurrentMovie = (id: string) => {
    this.setState({
      currentMovie: id
    }, () => this.setState({currentMovie: id}))
  }

  //SignalR
  CountMethod = () => {
    const temp = this.state.count
    this.setState({
      count: temp + 1
    })
    console.log('prints the count number');
    
    console.log(this.state.count);
    
  }
  addMovieMethod = (url: string) => {
    this.addMovieTODB(url);
  }

  addMovieTODB = (url:String) => {
    const body = {"url": url}
        fetch('https://cors-anywhere.herokuapp.com/http://movieapiproject.azurewebsites.net/api/Movies', {
          body: JSON.stringify(body),
          headers: {
            Accept: "text/plain",
            'Content-type': 'applicaton/json-patch+json'
          },
          method: 'POST'
        }).then((res:any) => {
          this.state.updateListMethod(); //This will update the movie list when we add a movie
          //Update the video list
        })
      //   .then(() => {
      //     console.log('this works');
      //     this.state.hubConnection.invoke("MovieAdded")
      //  });

}

//Signal R
// public componentDidMount = () => {

//   this.state.hubConnection.on("Connect", ()  => {
//     console.log('A new user has connected to the hub.');
//   });
  
//   this.state.hubConnection.on("UpdateMovieList", ()  => {
//     this.state.updateListMethod();
//     console.log('A new video has been added!');
// });

//   this.state.hubConnection.start().then(() => this.state.hubConnection.invoke("BroadcastMessage"));
// }

  render(){
    return(

      
        <div>
        <Header/>
        <Main currentMovie={this.state.currentMovie} count={this.state.count}/>
        <InputSearch CountMethod={this.CountMethod} updateMovieList= {this.state.updateListMethod} />
        <MovieList currentMovie={this.updateCurrentMovie} getMovieList={this.movieListFromChild}/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </div>
      
    )
  }
}

export default App;