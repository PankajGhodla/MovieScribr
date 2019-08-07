import React from "react"
import ".././App.css"
import {Container, Row, Col} from "react-bootstrap"

class Main extends React.Component<{},{}>{
    render(){
        return(
            <div className="mainContainer">
                <Container>
                    <Row>
                        <Col md ="6" sm="12" className="mainImgContianer">
                            <div >
                                <img alt="this is a "src = "https://terrigen-cdn-dev.marvel.com/content/prod/1x/ae_digital_packshot.jpg"/>
                            </div>
                        </Col>
                        <Col md="6" sm="auto" className="mainContentContainer">
                            <div >
                                <div className="temp">
                                <p>Title: This is a place holder text thissi si s</p>
                                <p>Relese Date: This is a place holder text thissi si s</p>
                                <p>Gernes: This is a place holder text thissi si s</p>
                                <p>IMDB Link: This is a place holder text thissi si s</p>
                                <p>Description: This is a place holder text thissi si sThis is a place holder text thissi si sThis is a place holder text thissi si sThis is a place holder text thissi si sThis is a place holder text thissi si sThis is a place holder text thissi si s</p>
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