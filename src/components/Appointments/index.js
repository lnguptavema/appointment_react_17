import './index.css'

import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    input: '',
    dateValue: '',
    newList: [],
    starredListValue: false,
    allItemsListNew: [],
  }

  onChangeEvent = event => {
    this.setState({input: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateValue: event.target.value})
  }

  clickedAdd = () => {
    const {input, dateValue} = this.state

    const dates = dateValue
      ? format(new Date(dateValue), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      input,
      dateValue: dates,
      isStared: false,
    }

    this.setState(prevState => ({
      newList: [...prevState.newList, newAppointment],
      allItemsListNew: [...prevState.allItemsListNew, newAppointment],
      dateValue: '',
      input: '',
    }))
  }

  clickedStarred = () => {
    const {newList, starredListValue, allItemsListNew} = this.state
    if (starredListValue === true) {
      this.setState({newList: allItemsListNew, starredListValue: false})
    } else {
      const starredList = newList.filter(eachItem => eachItem.isStared === true)
      this.setState({newList: starredList, starredListValue: true})
    }
  }

  clickedStarId = id => {
    this.setState(prevState => ({
      newList: prevState.newList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStared: !eachItem.isStared}
        }
        return eachItem
      }),
    }))
    this.setState(prevState => ({
      allItemsListNew: prevState.allItemsListNew.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStared: !eachItem.isStared}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {input, dateValue, newList, starredListValue} = this.state
    const colorClassname = starredListValue ? 'trueColor' : ''
    return (
      <div className="mainContainer">
        <div className="mainCard">
          <div className="cardItem">
            {' '}
            <div>
              <h1 className="mainheading">Add Appointment</h1>
              <div className="titleContainer">
                {' '}
                <label htmlFor="Title">TITLE</label>
                <input
                  id="Title"
                  type="input"
                  value={input}
                  onChange={this.onChangeEvent}
                  placeholder="Title"
                />
              </div>{' '}
              <div className="titleContainer">
                <label htmlFor="date">DATE</label>
                <input
                  id="date"
                  type="date"
                  value={dateValue}
                  onChange={this.onChangeDate}
                />
              </div>{' '}
              <button
                type="button"
                className="addbutton"
                onClick={this.clickedAdd}
              >
                Add
              </button>
            </div>
            <div>
              <img
                className="appointmentsImg"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>{' '}
          </div>
          <hr className="hr" />
          <div className="cardItemAppointments">
            <h1 className="appointmentsHeading">Appointments</h1>
            <button
              type="button"
              className={` buttonStarred ${colorClassname} `}
              onClick={this.clickedStarred}
            >
              Starred
            </button>{' '}
          </div>
          <ul>
            {newList.map(eachItem => (
              <AppointmentItem
                eachItem={eachItem}
                key={eachItem.id}
                clickedStar={this.clickedStarId}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
