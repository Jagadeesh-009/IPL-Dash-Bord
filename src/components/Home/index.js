// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    teams: [],
  }

  componentDidMount() {
    this.getIPLAllTeams()
  }

  getIPLAllTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    if (response.ok) {
      // const statusCode = await response.statusCode
      // console.log(statusCode)
      const data = await response.json()
      console.log(data)
      const formatedData = data.teams.map(team => ({
        name: team.name,
        id: team.id,
        teamImageUrl: team.team_image_url,
      }))
      this.setState({isLoading: false, teams: formatedData})
    }
  }

  render() {
    const {isLoading, teams} = this.state
    return (
      <div>
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          <div className="HomeContainer">
            <h1 className="heading">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
                alt="ipl logo"
                width="50"
              />
              IPL Dashboard
            </h1>
            <ul className="teamsList">
              {teams.map(team => (
                <TeamCard allTeam={team} key={team.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
