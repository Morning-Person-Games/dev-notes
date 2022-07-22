import React, { Component } from "react";
import styled from "@emotion/styled";
import * as JsSearch from "js-search";
import { baseTypes, mixins, staticSizes } from "../../styles/globalStyles";
import { BsSearch } from "react-icons/bs";

const Form = styled.form`
  flex-grow: 1;
  flex-basis: 100%;
  ${mixins.transition()};
  display: flex;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: ${staticSizes.radius};
  ${baseTypes.hover} {
    background-color: ${(props) => props.theme.colors.primary};
  }
  &:hover:focus-within {
    background-color: ${(props) => props.theme.colors.secondary};
  }
  @media screen and (min-width: ${(props) => props.theme.sizes.screenMd}) {
    flex-basis: auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  background: none;
  border: 0;
  border-radius: ${staticSizes.radius};
  font-size: ${staticSizes.font.lg};
  min-width: 12em;
  flex-grow: 1;
  padding: 10px 10px 10px 12px;
  margin-left: 28px;
  @media screen and (min-width: ${(props) => props.theme.sizes.screenMd}) {
    min-width: 13em;
  }
`;

const IconInit = ({ className }) => <BsSearch className={className} />;

const Icon = styled(IconInit)`
  display: block;
  position: absolute;
  left: 10px;
  font-size: 1.3em;
  margin-top: 1px;
  color: ${(props) => props.theme.colors.white};
`;

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
    this.setState({ searchQuery: value });
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
      <Form onSubmit={this.handleSubmit}>
        <Wrapper>
          <Input
            type="search"
            value={searchQuery}
            onChange={this.searchData}
            placeholder="Search through topics and solutions..."
          />
          <Icon />
        </Wrapper>
      </Form>
    );
  }
}

export default PrimarySearch;
