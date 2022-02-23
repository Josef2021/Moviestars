// https://api.themoviedb.org/3/person/popular?api_key=df8b08ecb436696fee41a00f8d87a540&language=en&page=$3

// https://image.tmdb.org/t/p/w185/
import { Component } from "react";
import { InputGroup, Input, InputGroupText } from "reactstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paging from "./paging";
import ModalComponent from "./ModalComponent";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { paginationItemClasses } from "@mui/material";
import { FaRegHeart, FaHeart } from "react-icons/fa";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      imgHeader: "https://image.tmdb.org/t/p/w185",
      searchingString: "",
      dropDown: 0,
      defaultPage: 1,
      modalState: false,
      modalData: [],
      isItFavorited: false,
    };
  }

  handleModal = (id) => {
    this.setState({
      modalState: !this.state.modalState,
      modalData: this.state.data.filter((movieStar) => id === movieStar.id),
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.fetchMyData();
    }, 2000);
  }
  fetchMyData = () => {
    const url = `https://api.themoviedb.org/3/person/popular?api_key=df8b08ecb436696fee41a00f8d87a540&language=en&page=${this.state.defaultPage}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: data.results, loading: true });
      });
  };

  handleSearch = (e) => {
    this.setState({ searchingString: e.target.value });
  };
  dropDownChange = (e) => {
    this.setState({ dropDown: e.target.value });
  };
  pageUpdate = (number) => {
    // setTimeout(() => {

    this.setState({ defaultPage: number, loading: false }, () => {
      this.fetchMyData();
    });
    // }, 2000)
  };
  handleFavorite = (id) => {
    // this.setState({ isItFavorited: !this.state.isItFavorited });
    const favoritedActor = this.state.data.filter((el) => el.id === id);
    localStorage.setItem("favorites", JSON.stringify(favoritedActor));
    const savedActors = JSON.parse(localStorage.getItem("favorites"));
    console.log(savedActors);
  };
  render() {
    const {
      loading,
      data,
      searchingString,
      imgHeader,
      dropDown,
      defaultPage,
      modalData,
      modalState,
      isItFavorited,
    } = this.state;
    let dropDownFiltered;
    if (dropDown > 0) {
      dropDownFiltered = data.filter((movie) => movie.gender === dropDown);
    } else {
      dropDownFiltered = data;
    }
    const filtered = dropDownFiltered.filter((movie) =>
      movie.name.toLowerCase().includes(searchingString.toLowerCase())
    );
    // console.log({ defaultPage });

    const favorites = JSON.parse(localStorage.getItem("favorites"));
    console.log(favorites);
    return (
      <div className="App">
        <div className="m-3">
          <Paging pageUpdate={this.pageUpdate} defaultPage={defaultPage} />
        </div>
        <div className="m-3">
          <div className="mb-5">
            <InputGroup>
              <Input
                placeholder="search for actor"
                onChange={this.handleSearch}
                value={searchingString}
              />
            </InputGroup>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dropDown}
                label="Age"
                onChange={this.dropDownChange}
              >
                <MenuItem value={1}>Female</MenuItem>
                <MenuItem value={2}>Male</MenuItem>
                <MenuItem value={0}>Show All</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="movies">
          {loading ? (
            filtered.map((movieStar) => {
              const knownForDetails = movieStar.known_for.map(
                (title) => title.title
              );
              const imageShow = `${imgHeader}${movieStar.profile_path}`;
              return (
                <div
                  className="movie"
                  key={movieStar.id}
                  onClick={() => this.handleModal(movieStar.id)}
                >
                  {/* {favorites && favorites.includes(movieStar.id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart
                      onClick={() => this.handleFavorite(movieStar.id)}
                    />
                  )} */}

                  <img src={imageShow} alt={movieStar.name} />
                  <div>{movieStar.name}</div>
                  <div className="known-for">{knownForDetails.join(",")}</div>
                </div>
              );
            })
          ) : (
            <p>Loading....</p>
          )}
        </div>
        {modalState && (
          <ModalComponent
            handleModal={this.handleModal}
            modalState={modalState}
            modalData={modalData}
            imgHeader={imgHeader}
          />
        )}
      </div>
    );
  }
}

export default App;

// pagination

// usage of responsive components from reacstrap and materil ui

// implemented debounce to improme searching performance

// applied best es6 practices to filter and sort items on the page

//
