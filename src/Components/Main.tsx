import React from "react"
import ".././App.css"
import {Container, Row, Col} from "react-bootstrap"
interface IProp {
    currentMovie: string
}
interface IState {
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
    }
    componentWillUpdate = () => {
        fetch('https://cors-anywhere.herokuapp.com/https://movieapiproject.azurewebsites.net/api/Movies/' + this.props.currentMovie, {
            method: 'GET'
        }).then((res:any) => {
            return res.json();
        }).then((res:any) => {
            this.setState({
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


    render(){
        //this.display()
        return(
            <div className="mainContainer">
                <Container>
                    <Row>
                        <Col md ="6" sm="12" className="mainImgContianer">
                            <div >
                                <img alt="this is a "src ={this.state.Poster}/>
                            </div>
                        </Col>
                        <Col md="6" sm="auto" className="mainContentContainer">
                            <div >
                                <div className="temp">
                                <p>Title: {this.state.Title}</p>
                                <p>Relese Date: {this.state.Date}</p>
                                <p>Gernes: {this.state.Genres}</p>
                                <p>Length: {this.state.Length}</p>
                                <p>Favourite: {this.state.isFavourite?"True":"False"}</p>
                                <p>IMDB Link: <a href={this.state.Link}>Click here</a> </p>
                                <p>Description: {this.state.Description}</p>
                                <p>Related Movies: This is a place holder text thissi si sThis is a place holder text thissi si s</p>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}


export default Main