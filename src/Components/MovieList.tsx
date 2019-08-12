import React from "react"
import ".././App.css"
import {Card} from "react-bootstrap"
import {ReactComponent as Delete} from '../Images/baseline-delete-24px.svg'
import {ReactComponent as Fav} from '../Images/baseline-favorite-24px.svg'
import {ReactComponent as FavOutline} from '../Images/baseline-favorite_border-24px.svg'
interface IState {
    movieList: any
}
interface IProp {
    currentMovie: any,
    getMovieList: any,
}

class MovieList extends React.Component<IProp, IState>{
    constructor(props:any){
        super(props);
        this.state = {
            movieList: []
        }
        this.updateList();
    }
    updateList = (inputSearch?: string) => { /**search use */
        
        if (inputSearch !== undefined && inputSearch !== ""){
            fetch('https://movieapiproject.azurewebsites.net/api/Movies/SearchByMovie/' + inputSearch, {
                method: 'GET',
                headers:{
                    Accept: 'text/plain'
                }
            })
            .then((res:any) => {
            return res.json()
            }).then((res:any) => {                        
                const output:any[] = [];
                res.forEach((movie:any) => {
                    const movieCard = (
                        <Card key={movie.movieId} className="MovieListCard"style={{ width: '18rem' }}>
                        <Delete onClick={()=> this.deleteMovie(movie.movieId)} className="MovieDelete "/>
                        <span onClick={ ()=> this.handleLike(movie)}className="MovieFav ">
                        {movie.isFavourite === true? <Fav/>: <FavOutline/>}
                        </span>
                                <Card.Body>
                                    <Card.Title onClick={() => this.updateCurrentMovie(movie.movieId)} className="pointer">{movie.movieTitle}</Card.Title>
                                    <Card.Text>
                                    Release Date: {movie.releaseDate.substr(0,10)}
                                    <br/>
                                    IMDB Link : <a href={movie.imdblink} target="_blank" rel="noopener noreferrer" className="MovieListhyperlinkIMBD">Check here</a>
                                    </Card.Text>
                            </Card.Body>
                        </Card>)
                        if (movie.isFavourite){
                            output.unshift(movieCard) // Puts all the favourite movies at the start of the array
                        }
                        else{
                            output.push(movieCard) // Puts all the non favourite movies after the favourite movies in the array 
                        }
                });
                
                this.setState({
                    movieList: output
                })
            });
        }
        /** https://cors-anywhere.herokuapp.com/ */
        else { /** normal use  */
            
            fetch('http://movieapiproject.azurewebsites.net/api/Movies').then((res:any) => {
                return res.json();
            }).then((res:any) => {                        
                const output:any[] = [];
                res.forEach((movie:any) => {
                    const movieCard = (
                        <Card key={movie.movieId} className="MovieListCard"style={{ width: '18rem' }}>
                        <Delete onClick={()=> this.deleteMovie(movie.movieId)} className="MovieDelete"/>
                        <span onClick={ ()=> this.handleLike(movie)}className="MovieFav">
                        {movie.isFavourite === true? <Fav/>: <FavOutline/>}
                        </span>
                                <Card.Body>
                                    <Card.Title onClick={() => this.updateCurrentMovie(movie.movieId)} className="pointer">{movie.movieTitle}</Card.Title>
                                    <Card.Text>
                                    Release Date: {movie.releaseDate.substr(0,10)}
                                    <br/>
                                    IMDB Link : <a href={movie.imdblink} target="_blank" rel="noopener noreferrer" className="MovieListhyperlinkIMBD">Check here</a>
                                    </Card.Text>
                            </Card.Body>
                        </Card>)
                        if (movie.isFavourite){
                            output.unshift(movieCard) // Puts all the favourite movies at the start of the array
                        }
                        else{
                            output.push(movieCard) // Puts all the non favourite movies after the favourite movies in the array 
                        }
                });
                
                this.setState({
                    movieList: output
                })
            });
        }
    }
    //This is the fix I found online, i.e., add https://cors-anywhere.herokuapp.com/ beofre the api call. 
    deleteMovie = (id: any) => {
        fetch('https://movieapiproject.azurewebsites.net/api/Movies/' + id, {
            method: 'DELETE', 
        headers: {
            Accept: 'text/plain'
        }}).then( () => {
            this.updateList()
            this.props.currentMovie("");
        })
    }
    // This fix doesn't work for link function. 
    handleLike = (movieObj:any) => {
            const sendThis = [{
            "value": !movieObj.isFavourite,
            "path": "/isFavourite",
            "op": "replace",
            "from": ""
          }];
          fetch('https://movieapiproject.azurewebsites.net/api/Movies/update/' + movieObj.movieId, {
            body: JSON.stringify(sendThis),
            headers: {
                Accept: 'text/plain',
                "Content-Type": 'application/json-patch+json'
            },
            method: 'PATCH'
        })
        .then(() => this.updateList());
        return null
    }

    componentDidMount = () => {
        this.props.getMovieList(this.updateList);
        
    }

    updateCurrentMovie = (id: string) => {        
        this.props.currentMovie(id);
    }
    render(){
        return(
           
            <div className="MovieListContainer">
            <div className="MovieListCardContainer">
                {this.state.movieList}
            </div>
            </div>
        )
    }
}

export default MovieList