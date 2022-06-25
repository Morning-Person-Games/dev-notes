import * as JsSearch from "js-search";
import React, { Component } from "react";

class PrimarySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: [],
      isLoading: true,
      searchQuery: "",
    };
  }
  componentDidMount() {
    this.rebuildIndex();
  }
  componentDidUpdate(prevProps) {
    if (this.props.topics !== prevProps.topics) {
      this.rebuildIndex();
    }
  }
  rebuildIndex = () => {
    const { topics } = this.props;
    const dataToSearch = new JsSearch.Search("topics");
    /**
     * defines an indexing strategy for the data
     * more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("topics");
    dataToSearch.addIndex(["title"]); // sets the index attribute for the data
    dataToSearch.addIndex(["indexableSolutions"]);
    dataToSearch.addDocuments(topics); // adds the data to be searched
    this.setState({ search: dataToSearch, isLoading: false });
    console.log("dataToSearch", dataToSearch);
  };

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = (e) => {
    const { search } = this.state;
    const value = e.target.value;
    const queryResult = search.search(value);
    this.setState({ searchQuery: value });
    this.props.setQueryResult(
      value && queryResult.length === 0 ? null : queryResult
    );
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="Search"
          value={searchQuery}
          onChange={this.searchData}
          placeholder="Search for a topic or solution"
          style={{ margin: "0 auto", width: "300px" }}
        />
      </form>
    );
  }
}

export default PrimarySearch;
