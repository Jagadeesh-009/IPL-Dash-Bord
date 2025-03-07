// import './index.css'

// const LatestMatch = props => {
//   const {latestMatchDetailsIs} = props
//   const {
//     id,
//     competingTeam,
//     competingTeamLogo,
//     date,
//     venue,
//     result,
//     umpires,
//     manOfTheMatches,
//     firstInnings,
//     secondInnings,
//     matchStatus,
//   } = latestMatchDetailsIs

//   return (
//     <div className="latest-match">
//       <div className="latest-match-container">
//         <h1 className="latest-match-heading">Latest Match</h1>
//         <div className="match-details">
//           <p>{competingTeam}</p>
//           <p>{date}</p>
//           <p>{venue}</p>
//           <p>{result}</p>
//         </div>
//       </div>
//       <img src={competingTeamLogo} alt={`latest match ${competingTeam}`} />
//       <div className="match-container">
//         <h1 className="latest-match-heading">Latest Match</h1>
//         <div className="match-details">
//           <p>{firstInnings}</p>
//           <p>{competingTeam}</p>
//           <p>{secondInnings}</p>
//           <p>{manOfTheMatches}</p>
//           <p>{umpires}</p>
//           <p>{matchStatus}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LatestMatch

import './index.css'

const LatestMatch = props => {
  const {latestMatchData} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchData

  return (
    <div className="latest-match-container">
      <h1 className="latest-match-heading">Latest Matches</h1>
      <div className="latest-match-card">
        <div className="latest-match-details-logo-container">
          <div className="latest-match-details-1">
            <p className="latest-match-team-name">{competingTeam}</p>
            <p className="latest-match-date">{date}</p>
            <p className="match-details">{venue}</p>
            <p className="match-details">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            className="latest-match-team-logo"
            alt={`latest match ${competingTeam}`}
          />
        </div>
        <hr className="separator" />
        <div className="latest-match-details-2">
          <p className="latest-match-details-label">First Innings</p>
          <p className="latest-match-details-value">{firstInnings}</p>
          <p className="latest-match-details-label">Second Innings</p>
          <p className="latest-match-details-value">{secondInnings}</p>
          <p className="latest-match-details-label">Man Of The Match</p>
          <p className="latest-match-details-value">{manOfTheMatch}</p>
          <p className="latest-match-details-label">Umpires</p>
          <p className="latest-match-details-value">{umpires}</p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch
