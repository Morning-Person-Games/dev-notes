/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as JsSearch from "js-search";
import { Component } from "react";
import { theme } from "../../globalStyles";
import { MdSearch } from "react-icons/md";

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
    const dataToSearch = new JsSearch.Search("id");
    dataToSearch.tokenizer = new JsSearch.StopWordsTokenizer(
      new JsSearch.SimpleTokenizer()
    );
    /**
     * defines an indexing strategy for the data
     * more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy();
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
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex();

    dataToSearch.addIndex("title"); // sets the index attribute for the data
    dataToSearch.addIndex("indexableSolutions"); // sets the index attribute for the data
    dataToSearch.addDocuments(topics); // adds the data to be searched
    this.setState({ search: dataToSearch, isLoading: false });
    this.props.setQueryResult(topics);
  };

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = (e) => {
    const { search } = this.state;
    const value = e.target.value;
    const queryResult = search.search(value);
    console.log("value", value);
    this.setState({ searchQuery: value });
    console.log("queryResult", queryResult);
    if (value.length === 0) {
      this.props.setQueryResult(this.props.topics);
    } else {
      this.props.setQueryResult(queryResult.length === 0 ? null : queryResult);
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <form
        css={css`
          box-shadow: inset -1px 2px 3px ${theme.colors.shadow};
          flex-grow: 1;
          flex-basis: 100%;
          transition: all 150ms ease-in;
          -webkit-transition: all 150ms ease-in;
          display: flex;
          background: ${theme.colors.secondary};
          border-radius: ${theme.sizes.radius};
          ${theme.baseTypes.hover} {
            background-color: ${theme.colors.primary};
          }
          @media screen and (min-width: ${theme.sizes.screenMd}) {
            flex-basis: auto;
          }
        `}
        onSubmit={this.handleSubmit}
      >
        <div
          css={css`
            display: flex;
            width: 100%;
            position: relative;
          `}
        >
          <input
            value={searchQuery}
            onChange={this.searchData}
            placeholder="Search for a topic or solution"
            css={css`
              ${theme.baseTypes.baseInput}
              background: none;
              font-size: ${theme.sizes.font.lg};
              min-width: 12em;
              flex-grow: 1;
              padding: 12px;
              margin-left: 28px;
              @media screen and (min-width: ${theme.sizes.screenMd}) {
                min-width: 13em;
              }
            `}
          />
          <MdSearch
            css={css`
              display: block;
              position: absolute;
              left: 8px;
              top: 10px;
              font-size: ${theme.sizes.font.xl};
              color: ${theme.colors.white};
            `}
          />
        </div>
      </form>
    );
  }
}

export default PrimarySearch;
