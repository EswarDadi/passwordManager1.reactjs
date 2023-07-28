import {Component} from 'react'

import './index.css'

import {v4 as uuid4} from 'uuid'

import PasswordItem from '../PasswordItem/index'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    userName: '',
    password: '',
    count: 0,
    isChecked: false,
    searchInput: '',
    isTrue: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPasswords = event => {
    event.preventDefault()
    const {website, userName, password, passwordsList} = this.state
    const newPassword = {
      id: uuid4(),
      website,
      userName,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      userName: '',
      password: '',
    }))

    this.setState(prevState => {
      console.log(`prevState count is ${prevState.count}`)
      return {
        count: prevState.count + 1,
      }
    })

    if (passwordsList.length === 0) {
      this.setState(prevState => {
        console.log(`prevState result is ${prevState.isTrue}`)
        return {
          isTrue: !prevState.isTrue,
        }
      })
    }
  }

  onToggleCheckBox = () => {
    this.setState(prevState => {
      console.log(`prevState is ${prevState.isChecked}`)
      return {
        isChecked: !prevState.isChecked,
      }
    })
  }

  onDeletePasswordItem = id => {
    const {passwordsList} = this.state
    const filteredResults = passwordsList.filter(each => each.id !== id)
    this.setState({
      passwordsList: filteredResults,
    })
    this.setState(prevState => {
      console.log(`prevState count is ${prevState.count}`)
      return {
        count: prevState.count - 1,
      }
    })

    if (filteredResults.length === 0) {
      this.setState(prevState => {
        console.log(`prevState result is ${prevState.isTrue}`)
        return {
          isTrue: !prevState.isTrue,
        }
      })
    }
  }

  onSearchResults = () => {
    const {searchInput, passwordsList} = this.state
    const searchResults = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  render() {
    const {
      website,
      userName,
      password,
      count,
      isChecked,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const searchResults = this.onSearchResults()

    if (searchResults.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="password-manager-logo"
        />
        <div className="card-container">
          <form className="form-container" onSubmit={this.onAddPasswords}>
            <h1 className="card-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-icon"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-element"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="input-icon"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-element"
                onChange={this.onChangeUserName}
                value={userName}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-icon"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-element"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>

            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager"
          />
        </div>
        <div className="card-container2">
          <div className="card-container3">
            <div className="passwords-container">
              <h1 className="password-description">Your Passwords</h1>
              <p className="passwords-count">{count}</p>
            </div>
            <div className="search-input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-icon"
              />
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearch}
                className="input-element"
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="show-passwords">
            <input
              type="checkbox"
              id="showPassword"
              onChange={this.onToggleCheckBox}
            />
            <label htmlFor="showPassword">Show Passwords</label>
          </div>

          {!isTrue && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="no-passwords"
            />
          )}
          {!isTrue && <p className="no-passwords-text">No Passwords</p>}

          {isTrue && (
            <ul className="list-container">
              {searchResults.map(each => (
                <PasswordItem
                  passwordDetails={each}
                  key={each.id}
                  isChecked={isChecked}
                  onDeletePasswordItems={this.onDeletePasswordItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
