import React, { Component } from 'react';
import axios from 'axios';

class NewsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      newsArticles: [],
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };


  fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=5d8c9716e2b648958bafb593a1a90ef2&q=${this.state.searchTerm}`
      );
      this.setState({ newsArticles: response.data.articles });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };


  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.fetchNews();
    }
  }

  render() {
    return (
      <div className="container mt-3">
        <h1>News app</h1>
        <p>Welcome to my news app</p>

        <div className="mt-3">
          <div className="input-group mb-3">
            <input
              type="text"
              id="search-input"
              className="form-control"
              placeholder="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearchChange}
            />
            <button className="btn btn-primary" type="button" onClick={this.fetchNews}>
              Search
            </button>
          </div>
          <ul className="list-group" id="search-results">
            {this.state.newsArticles.map((article, index) => (
              <li key={index} className="list-group-item">
                {article.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default NewsSearch;