import React from 'react'
import { Link } from 'react-router-dom'
import './PlayerCard.css'

const PlayerCard = (props) => {
    const getFriendshipDisplay = (level) => {
        switch(level) {
            case 2: return "1-2 Hearts"
            case 4: return "3-4 Hearts"
            case 6: return "5-6 Hearts" 
            case 8: return "7-8 Hearts"
            case 10: return "9-10 Hearts"
            default: return level || "Not specified"
        }
    }

    return (
        <div className = "player-card">
            <div className="card-header">
                <h3>🏡 {props.team_name}</h3>
                <h4>👤 {props.player_name}</h4>
            </div>

            <div className="card-content">
                <p><strong>💖 Favorite Character:</strong> {props.characters}</p>
                <p><strong>❤️ Friendship Level:</strong> {getFriendshipDisplay(props.friendship_level)}</p>
                <p><strong>🚜 Farm Focus:</strong> {props.farm_focus}</p>
                <p><strong>🔧 Preferred Tools:</strong> {props.tools}</p>
                <p><strong>🌸 Favorite Season:</strong> {props.season}</p>
            </div>

            <div className="card-actions">
                <Link to={`/player/${props.id}`}>
                    <button className="view-btn">View Details</button>
                </Link>
                <Link to={`/edit/${props.id}`}>
                    <button className="edit-btn">Edit Farmer</button>
                </Link>
            </div>
        </div>
    )
}
export default PlayerCard