import React, { Component } from 'react';
import { Card, Image, Button, Confirm, Checkbox, Dimmer, Header, Modal, Container } from 'semantic-ui-react';
import Favorites from './Favorites/Favorites';
import Review from './Review/Review'
import  './WatchCard.css'

export default class WatchCard extends Component {

    state = {
        open: false,
    };
    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    //--For Confirmation Box--//
    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    checkboxLabel = () => {
        return (
            (this.props.watchlist.watched === true) ?
                "Watched" :
                "Not Watched"
        )
    }

    watchedToggle = () => {
        const watched = {
            id: this.props.watchlist.id,
            userId: JSON.parse(sessionStorage.getItem('user')).id,
            Title: this.props.watchlist.Title,
            Year: this.props.watchlist.Year,
            Rated: this.props.watchlist.Rated,
            Runtime: this.props.watchlist.Runtime,
            Actors: this.props.watchlist.Actors,
            Awards: this.props.watchlist.Awards,
            BoxOffice: this.props.watchlist.BoxOffice,
            Director: this.props.watchlist.Director,
            Genre: this.props.watchlist.Genre,
            Plot: this.props.watchlist.Plot,
            Poster: this.props.watchlist.Poster,
            Production: this.props.watchlist.Production,
            Type: this.props.watchlist.Type,
            Writer: this.props.watchlist.Writer,
            imdbID: this.props.watchlist.imdbID,
            imdbRating: this.props.watchlist.imdbRating,
            favorite: this.props.watchlist.favorite,
            watched: !this.props.watchlist.watched
        }
        this.props.updateCard(watched)
    }

    render() {
        const { active } = this.state
        const content = (
            <div>
                <Header as='h2' inverted>
                    Details
              </Header>
                <Modal trigger={<Button>View</Button>}>
                    <Modal.Header>{this.props.watchlist.Title}</Modal.Header>
                    <Modal.Content image scrolling>
                        <Image size='medium' src={this.props.watchlist.Poster} wrapped/>
                        <Modal.Description>
                                <Container>
                                <Header>{this.props.watchlist.Type} overview</Header>
                            <ul>
                                <li><strong>Year</strong>: {this.props.watchlist.Year}</li>
                                <li><strong>Actors</strong>: {this.props.watchlist.Actors}</li>
                                <Container >
                                <li><strong>Plot</strong>: {this.props.watchlist.Plot}</li>
                                </Container>
                                <li><strong>Director</strong>: {this.props.watchlist.Director}</li>
                                <li><strong>Genre</strong>: {this.props.watchlist.Genre}</li>
                                <li><strong>Rated</strong>: {this.props.watchlist.Rated}</li>
                                <li><strong>Runtime</strong>: {this.props.watchlist.Runtime}</li>
                                <li><strong>Awards</strong>: {this.props.watchlist.Awards}</li>
                                <li><strong>BoxOffice</strong>: {this.props.watchlist.BoxOffice}</li>
                                <li><strong>Production</strong>: {this.props.watchlist.Production}</li>
                                <li><strong>Writer</strong>: {this.props.watchlist.Writer}</li>
                                <li><strong>imdbRating</strong>: {this.props.watchlist.imdbRating}</li>
                             </ul>
                                </Container>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
        // console.log("watchlist props", this.props.watchlist)
        let checkLabel = this.checkboxLabel()
        return (
            <Card key={this.props.watchlist.id} raised>
                <Card.Content>
                    <Favorites watchlist={this.props.watchlist} updateCard={this.props.updateCard} />
                </Card.Content>
                <Dimmer.Dimmable
                    as={Image}
                    src={this.props.watchlist.Poster}
                    wrapped ui={false}
                    dimmed={active}
                    dimmer={{ active, content }}
                    onMouseEnter={this.handleShow}
                    onMouseLeave={this.handleHide}
                />
                <Card.Content>
                    <Checkbox label={checkLabel} defaultChecked={this.props.watchlist.watched} onChange={this.watchedToggle} />
                    <Card.Header>{this.props.watchlist.Title}</Card.Header>
                    <Card.Meta>Runtime: {this.props.watchlist.Runtime}</Card.Meta>
                    <Card.Meta>Year: {this.props.watchlist.Year}</Card.Meta>
                </Card.Content>
                <Card.Content>
                    <Review watchlist={this.props.watchlist} />
                </Card.Content>
                <Card.Content>
                    <Button onClick={this.open}>
                        Remove from Watchlist
                </Button>
                    <Confirm size="mini" open={this.state.open}
                        onCancel={this.close}
                        onConfirm={() => this.props.deleteCard("watchlists", this.props.watchlist.id)}
                    />
                </Card.Content>
            </Card>
        )
    }
}