import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isChecked, onDeletePasswordItems} = props
  const {id, website, userName, password} = passwordDetails
  const deletePassword = () => {
    onDeletePasswordItems(id)
  }
  return (
    <li className="list-items-container">
      <h1 className="thumbnail">{website[0].toUpperCase()}</h1>
      <div>
        <p className="password-items">{website}</p>
        <p className="password-items">{userName}</p>
        <p className="password-items">
          {isChecked ? (
            password
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
              alt="stars"
              className="password-image"
            />
          )}
        </p>
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={deletePassword}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}
export default PasswordItem
