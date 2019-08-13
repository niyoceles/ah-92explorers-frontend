/* istanbul ignore file */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import jwtDecode from 'jwt-decode';
import '../../assets/scss/ratings.scss';
import Starbtn from '../../assets/icons/star.svg';
import RatingsModal from './Rating/RatingsModal';
import NavBar from '../Layout/navBar';
import Navbar from '../Layout/Navbar.jsx';
import { getArticle, deleteArticle, getRating } from '../../redux/actions/actionCreators';
import { articleRating } from '../../redux/actions/actionCreators/rating';
import '../../assets/css/articleread.css';

export class ArticleReadDelete extends Component {
  state = {
    modal: false,
    modal1: false,
    slug: '',
    value: 0,
    rateAvg: 0,
  }

  componentDidMount() {
    const slug = this.props.match.params.articleSlug;
    this.props.getArticle(slug);
    this.props.getRating(slug);
  }

  componentWillReceiveProps(nextProps) {
    const { rating } = nextProps.article.rating;
    this.setState(prevState => ({
      ...prevState,
      value: rating ? rating.rating : 0,
      rateAvg: nextProps.rateAvg && nextProps.rateAvg,
    }));
  }

  onStarClick = (nextValue) => {
    this.setState({ value: nextValue });
  }

  handleRatingsSubmit = () => {
    const { match } = this.props;
    const { articleSlug } = match.params;
    const { value } = this.state;
    const { articleRating: articleRate } = this.props;
    articleRate(articleSlug, value);
    this.setState(prevState => ({
      modal1: !prevState.modal1,
    }));
  }

  checkUser = () => {
    const token = localStorage.jwtToken;
    const decoded = jwtDecode(token);
    const { id } = decoded;
    const { userId } = this.props.article;
    if (id !== userId) {
      return true;
    }
  }


  handleOnDelete = () => {
    const { match: { params } } = this.props;
    this.props.deleteArticle(params.articleSlug);
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  toggle1 = () => {
    this.setState(prevState => ({
      modal1: !prevState.modal1,
    }));
  }

  render() {
    const { value } = this.state;
    const {
      fetched, owner, authenticated,
    } = this.props.article;
    const { slug } = this.props.article.article;
    const {
      rateAvg,
    } = this.state;
    const loader = Object.keys(this.props.article.article).length === 0;
    const token = localStorage.getItem('jwtToken');
    return (
      <Fragment>
        { authenticated ? <NavBar /> : <Navbar /> }
        <div className="theBodyArticle">
          <div className="colOne">
            { token && (
              <div className="rateIcon" onClick={this.toggle1}>
                <img src={Starbtn} className="rateIcon bodyIcons disappear rate" alt="" />
              </div>
            )}
            <br></br>
            { owner && (
            <div className="deleteIcon" onClick={this.toggle}>
              <img src={require('../../assets/icons/trash.svg')} className="bodyIcons" alt="..." />
            </div>
            )}
            <br></br>
            { owner && (
            <div>
              <a href={`/article/${slug}/update`}><img src={require('../../assets/icons/edit.svg')} className="bodyIcons disappear edit" alt="..." /></a>
            </div>
            )}
          </div>
          <div className="colTwo">
            <h1 className="title">
              {fetched && this.props.article.article.title}
            </h1>
            { ReactHtmlParser(fetched && this.props.article.article.body) }
            <div>
              <Link to={`/rating/${slug}`}>
                {' '}
                <img src="https://image.flaticon.com/icons/svg/291/291205.svg" className="bodyIcons" alt="" />
                <small>{rateAvg}</small>
              </Link>
            </div>
            <hr></hr>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Delete Article
            {' '}
            {fetched && this.props.article.article.title}
          </ModalHeader>
          <ModalBody>
            would you like to delete article?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleOnDelete}>Delete Article</Button>
            {' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className}>
          <RatingsModal
            title="Article Ratings"
            rating={value}
            starClick={this.onStarClick}
            handleRatingsSubmit={this.handleRatingsSubmit}
          />
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  article: state.articles,
  rating: state.articles.rating,
  rateAvg: state.articles.article.rateAvg,
  articlee: state.articles.article,
});

export const connectReadDelete = connect(mapStateToProps,
  {
    getArticle, articleRating, deleteArticle, getRating,
  })(ArticleReadDelete);
export { connectReadDelete as ReadArticle };