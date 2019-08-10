import React from "react"
import Facebook from "./Components/Facebook"


class App extends React.Component<{},{}>{

    render(){
        return( 
        <Facebook/>
        )
    }
}


export default App










// import * as React from 'react';
// import './App.css';
// import Header from "./Components/Header";
// import Main from "./Components/Main"
// import MovieList from './Components/MovieList';
// import InputSearch from "./Components/InputSearch"
// import Facebook from "./Components/Facebook"


// interface IState {
//   updateListMethod: any,
//   List: any,
//   currentMovie: any
// }

// class App extends React.Component<{}, IState>{
//   constructor(props: any){
//     super(props)
//     this.state = {
//       updateListMethod: null,
//       List: [],
//       currentMovie: 7
//     }   
//   }

//   // This function will get the updateList method formt the MovieList Component as it's input 
//   // and store it in the state of app
//   movieListFromChild = (callback: any) =>{
//     this.setState({
//       updateListMethod: callback
//     })    

//   }

//   // This updates the curret movie 
//   updateCurrentMovie = (id: string) => {
//     this.setState({
//       currentMovie: id
//     }, () => this.setState({currentMovie: id}))
//   }

//   addMovieTODB = (url:String) => {
//     const body = {"url": url}
//         fetch('https://cors-anywhere.herokuapp.com/http://movieapiproject.azurewebsites.net/api/Movies', {
//           body: JSON.stringify(body),
//           headers: {
//             Accept: "text/plain",
//             'Content-type': 'applicaton/json-patch+json'
//           },
//           method: 'POST'
//         }).then((res:any) => {
//           this.state.updateListMethod(); //This will update the movie list when we add a movie
//           //Update the video list
//           return null
//   })
// }

// // m = () => {
// //   fetch('https://cors-anywhere.herokuapp.com/https://movieapiproject.azurewebsites.net/api/Movies', {
// //             method: 'GET',
// //             headers: {
// //               Accept: 'text/plain'
// //             }
// //         }).then((res:any) =>{
// //           return res.json();
// //         }).then( (res:any) => {
// //           this.setState({currentMovie: res[0].movieId})
// //         })
// // }
//   render(){
//     return(

//       <div>
//         <p> To get started authenciate with Facebook</p>
//         <Facebook />
//         <Header/>
//         <Main currentMovie={this.state.currentMovie}/>
//         <InputSearch updateMovieList= {this.state.updateListMethod} />
//         <MovieList currentMovie={this.updateCurrentMovie} getMovieList={this.movieListFromChild}/>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
        
//       </div>
//     )
//   }
// }

// export default App;
