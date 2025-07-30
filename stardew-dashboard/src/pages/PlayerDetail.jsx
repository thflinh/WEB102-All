import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

const PlayerDetail = () => {
    const { id } = useParams()
    const [player, setPlayer] = useState(null)

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

    useEffect(() => {
        const fetchPlayer = async () => {
            const { data } = await supabase
                .from('Characters')
                .select()
                .eq('id', id)
                .single()
            
                if (data) {
                    setPlayer(data)
                }
        }
        fetchPlayer()
    }, [id])

    if (!player) {
        return <div>Loading farmer details...</div>
    }

    return (
        <div className="player-detail">
            <div className="detail-header">
                <h1>🏡 {player.team_name}</h1>
                <h2>👤 Farmer: {player.player_name}</h2>
            </div>

            <div className="detail-content">
                  <div className="detail-section">
                      <h3>🌟 Farmer Profile</h3>
                      <div className="profile-grid">
                          <div className="profile-item">
                              <strong>💖 Favorite Character:</strong>
                              <p>{player.characters || 'Not specified'}</p>
                          </div>

                          <div className="profile-item">
                              <strong>❤️ Friendship Level:</strong>
                              <p>{getFriendshipDisplay(player.friendship_level)}</p>
                          </div>

                          <div className="profile-item">
                              <strong>🚜 Farm Focus:</strong>
                              <p>{player.farm_focus || 'Not specified'}</p>
                          </div>

                          <div className="profile-item">
                              <strong>🔧 Preferred Tools:</strong>
                              <p>{player.tools || 'Not specified'}</p>
                          </div>

                          <div className="profile-item">
                              <strong>🌸 Favorite Season:</strong>
                              <p>{player.season || 'Not specified'}</p>
                          </div>

                          <div className="profile-item">
                              <strong>📅 Farm Established:</strong>
                              <p>{new Date(player.created_at).toLocaleDateString()}</p>
                          </div>
                      </div>
                  </div>
            <div className="detail-actions">
                  <Link to={`/edit/${player.id}`}>
                      <button className="edit-btn">Edit Farmer</button>
                  </Link>
                  <Link to="/">
                      <button className="back-btn">Back to Dashboard</button>
                  </Link>
            </div>
        </div>
    </div>
    )
};
export default PlayerDetail