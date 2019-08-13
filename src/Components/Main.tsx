import React from "react"
import ".././App.css"
import {Container, Row, Col, Dropdown} from "react-bootstrap"
import {ReactComponent as Perosn} from "../Images/baseline-person-24px.svg"
interface IProp {
    currentMovie: string,
    count: any
}
interface IState {
    count: number,
    ID: string,
    Title: string,
    Poster: string,
    Date: string,
    Length: string,
    Link: string,
    Description: string,
    Genres: string,
    Related: any,
    isFavourite: boolean
}
class Main extends React.Component<IProp,IState>{
    constructor(props: any){
        super(props)
        
        this.state = {
            count: 0,
            ID: "",
            Title: "",
            Poster: "",
            Date: "",
            Length: "",
            Link: "",
            Description: "",
            Genres: "",
            Related: null,
            isFavourite: false
        }
        this.display(this.props.currentMovie)
    }
    componentWillUpdate = () => {
        
        
        if(this.state.ID !== this.props.currentMovie){
            this.display(this.props.currentMovie)   
        }
    }
    componentDidMount = () => {
        fetch('https://cors-anywhere.herokuapp.com/https://movieapiproject.azurewebsites.net/api/Movies', {
            method: 'GET',
            headers: {
              Accept: 'text/plain'
            }
        }).then((res:any) =>{
          return res.json();
        }).then( (res:any) => {
          this.display(res[0].movieId)
        }).catch((error) => {
            console.log(error)
          });
    }

    display = (current: any) => {
        fetch('https://cors-anywhere.herokuapp.com/https://movieapiproject.azurewebsites.net/api/Movies/' + current, {
            method: 'GET'
        }).then((res:any) => {
            return res.json();
        }).then((res:any) => {
            if(res.releaseDate !== undefined){
            this.setState({
                ID: res.movieId,
                Title: res.movieTitle,
                Poster: res.posterUrl,
                Date: res.releaseDate.substr(0,10),
                Length: res.movieLength,
                Link: res.imdblink,
                Description: res.discription,
                Genres: res.genres,
                Related: null,
                isFavourite: res.isFavourite
            });
        }
        }).catch((error) => {
            console.log(error)
          });
        
    }

    realted = () => {        
        fetch('https://cors-anywhere.herokuapp.com/https://movieapiproject.azurewebsites.net/api/RelatedMovies/GetRelatedMovies' + this.state.ID,{
            method: 'GET',
            headers:{
                Accept: 'text/plain'
            }
        }).then((response:any) =>{
            if (response.ok) {
                return response.json()
              } else {
                throw new Error('Something went wrong');
              }
            })
            .then((response:any) =>  {                
                const output :any = []
                response.forEach((relatedMovie:any)=>{
                    const movie:any = (<Dropdown.Item target="_blank" key={relatedMovie.realtedMovieId} rel="noopener noreferrer" href={relatedMovie.relatedImdblink}>{relatedMovie.relatedMovieTitle}</Dropdown.Item>)
                    output.push(movie)
                })
                if (this.state.Related !== output){                    
                this.setState({
                    Related: output
                })
            }
        }
            )
            .catch((error) => {
                console.log(error)
              });
    }



    render(){
        return(
            <div className="mainContainer">
                <Container>
                    <Row>
                        <Col md ="6" sm="12" className="mainImgContianer">
                            <div >
                                <img className="poster"alt={"Poster of " + this.state.Title}src ={this.state.Poster || 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'}/>
                            </div>
                        </Col>
                        <Col md="6" sm="auto" className="mainContentContainer">
                            <div >
                                <div className="MainPersonSignalR">
                                    {this.props.count}
                                    <Perosn />
                                </div>
                                <p><b>Title:</b> {this.state.Title || 'Title of the movie goes here.'}</p>
                                <p><b>Release Date: </b>{this.state.Date || 'Release date of the movie goes here. '}</p>
                                <p><b>Genres: </b>{this.state.Genres || 'Generes of the movie goes here.'}</p>
                                <p><b>Length: </b>{this.state.Length || 'Length of the movie goes here in '} mins</p>
                                <p><b>Favourite: </b>{this.state.isFavourite?"True":"False"}</p>
                                <p><b>IMDB Link: </b><a href={this.state.Link} target="_blank" rel="noopener noreferrer" className="MainhyperlinkIMBD">Click here</a> </p>
                                <p><b>Description: </b>{this.state.Description || 'Description of the movie goes here.'}</p>
                                {this.state.ID !== ""? 
                                <Dropdown onClick={this.realted}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <b>Related Movies: </b> 
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="DropdownRelated">
                                    {this.state.Related || 'Empty Dropbox'}
                                </Dropdown.Menu>
                            </Dropdown>
                                : 
                                <Dropdown onClick={() => " "}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <b>Related Movies: </b> 
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="DropdownRelated">
                                    
                                </Dropdown.Menu>
                            </Dropdown>} 
                                
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}

export default Main