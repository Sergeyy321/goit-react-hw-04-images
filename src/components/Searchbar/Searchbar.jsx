import {
  Formbutton,
  SearchForm,
  Forminput,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    name:''
  }
  onNameChange = (event) => {
    this.setState({ name: event.currentTarget.value.toLowerCase() })

  }
  onSubmit = (event) => {
    event.preventDefault()
    if (this.state.name.trim() === '') {
    alert('Empty string'
     )
     return
    }
    this.props.onSubmit(this.state.name)
    this.setState({name:''})
  }
  render() {
    
    return (
      <header>
        <SearchForm onSubmit={this.onSubmit}>
          <Formbutton type="submit" >
            <ImSearch />
          </Formbutton>
  
          <Forminput
            id={nanoid()}
            type="text"
            autoComplete="off"
            autoFocus
            name='name'
            value={this.state.name}
            onChange={this.onNameChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </header>
    );
  }
};
