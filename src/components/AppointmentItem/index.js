import './index.css'

const AppointmentItem = props => {
  const {eachItem, clickedStar, key} = props
  const {input, dateValue, isStared, id} = eachItem

  const onClickStar = () => {
    clickedStar(id)
  }

  const isStaredClicked = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="listItem" key={key}>
      <div className="container">
        <div className="starContainer">
          <p className="inputValue"> {input} </p>
          <button
            type="button"
            className="starButton"
            data-testid="star"
            onClick={onClickStar}
          >
            <img src={isStaredClicked} alt="star" />
          </button>
        </div>
        <p className="dateValue">{dateValue}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
