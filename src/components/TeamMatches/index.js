import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {},
    matchStats: {won: 0, lost: 0, drawn: 0},
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  calculateMatchStats = matches => {
    let won = 0
    let lost = 0
    let drawn = 0

    matches.forEach(match => {
      if (match.matchStatus === 'Won') {
        won += 1
      } else if (match.matchStatus === 'Lost') {
        lost += 1
      } else {
        drawn += 1
      }
    })

    return {won, lost, drawn}
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchedData = await response.json()

    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    const matchStats = this.calculateMatchStats(formattedData.recentMatches)

    this.setState({
      teamMatchesData: formattedData,
      matchStats,
      isLoading: false,
    })
  }

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderPieChart = () => {
    const {matchStats} = this.state
    const data = [
      {name: 'Won', value: matchStats.won},
      {name: 'Lost', value: matchStats.lost},
      {name: 'Drawn', value: matchStats.drawn},
    ]

    const COLORS = ['#4CAF50', '#F44336', '#FFEB3B']

    return (
      <div className="pie-chart-container">
        <h2>Match Statistics</h2>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx={150}
            cy={150}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map(entry => (
              <Cell
                key={entry.id || entry.name}
                fill={COLORS[data.indexOf(entry) % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
        {this.renderPieChart()}
        <div className="">
          <button
            type="button"
            className="back-button"
            onClick={this.handleBackClick}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  handleBackClick = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="team-matches-container">
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default withRouter(TeamMatches)
