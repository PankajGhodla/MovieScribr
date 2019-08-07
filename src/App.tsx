import * as React from 'react';
import './App.css';
import Header from "./Components/Header";
import Main from "./Components/Main"
import MovieList from './Components/MovieList';


interface IState {
  currentMovie: any,
  movieList: any,

}
class App extends React.Component<{}, IState>{
  render(){
    return(
      <div>
        <Header/>
        <Main/>
        <MovieList/>
      </div>
    )
  }
}

export default App;
