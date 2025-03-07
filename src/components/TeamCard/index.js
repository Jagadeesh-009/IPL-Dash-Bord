// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {allTeam} = props
  const {teamImageUrl, name, id} = allTeam
  return (
    <Link to={`/team-matches/${id}`} className="card">
      <li className="iplDashboardContainer">
        <img src={teamImageUrl} alt={name} width="100" height="120" />
        <p data-testid="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
