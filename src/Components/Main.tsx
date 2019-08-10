import React from "react"
import ".././App.css"
import {Container, Row, Col, Dropdown} from "react-bootstrap"
interface IProp {
    currentMovie: string
}
interface IState {
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
        this.display()
        this.realted()
    }
    componentWillUpdate = () => {
        console.log('this is it',this.props.currentMovie);
        
        if(this.state.ID !== this.props.currentMovie){
            console.log('display');
            this.display()   
        }
    }
    display = () => {
        fetch('https://cors-anywhere.herokuapp.com/https://movieapiproject.azurewebsites.net/api/Movies/' + this.props.currentMovie, {
            method: 'GET'
        }).then((res:any) => {
            return res.json();
        }).then((res:any) => {
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
            })
        })
    }

    realted = () => {
        console.log(this.state.ID);
        
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
                console.log(response);
                
                const output :any = []
                response.forEach((realtedMovie:any)=>{
                    const movie:any = (<Dropdown.Item href={realtedMovie.relatedImdblink}>{realtedMovie.relatedMovieTitle}</Dropdown.Item>)
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
                                <img alt='Poster of {this.state.Title}'src ={this.state.Poster}/>
                            </div>
                        </Col>
                        <Col md="6" sm="auto" className="mainContentContainer">
                            <div >
                                <p><b>Title:</b> {this.state.Title}</p>
                                <p><b>Relese Date: </b>{this.state.Date}</p>
                                <p><b>Gernes: </b>{this.state.Genres}</p>
                                <p><b>Length: </b>{this.state.Length}</p>
                                <p><b>Favourite: </b>{this.state.isFavourite?"True":"False"}</p>
                                <p><b>IMDB Link: </b><a href={this.state.Link}>Click here</a> </p>
                                <p><b>Description: </b>{this.state.Description}</p>
                                
                                <Dropdown onClick={this.realted}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <b>Related Movies: </b> 
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="DropdownRelated">
                                        {this.state.Related}
                                    </Dropdown.Menu>
                                    </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}


export default Main