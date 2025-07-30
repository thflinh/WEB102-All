import { useState, useEffect } from 'react'
import PlayerCard from '../components/PlayerCard'
import { supabase } from '../client'

const ViewPlayers = () => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        //read all players from table
        const fetchPlayers = async () => {
            const {data} = await supabase
                .from('Characters')
                .select()
                .order('created_at', {ascending: false})
            
                //set state of players
                setPlayers(data)
        }
        fetchPlayers()
    }, [])

    return (
        <div className="ViewPlayers">
            <h1>🌟 Stardew Valley Team Dashboard 🌟</h1>
            {
                players && players.length > 0 ?
                players.map((player) =>
                    <PlayerCard
                        key={player.id}
                        id={player.id}
                        team_name={player.team_name}
                        player_name={player.player_name}
                        characters={player.characters}
                        friendship_level={player.friendship_level}
                        farm_focus={player.farm_focus}
                        tools={player.tools}
                        season={player.season}
                    />
                ) : <h2>{'No Farmers Yet 🚜 Start Building Your Team!'}</h2>
            }
        </div>
    )
}
export default ViewPlayers