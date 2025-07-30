import { useState } from 'react'
import { supabase } from '../client'

const CreatePlayer = () => {
    const [player, setPlayer] = useState({
        team_name: "", 
        player_name: "", 
        characters: "",
        friendship_level: "",
        farm_focus: "",
        tools: "",
        season: ""
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setPlayer( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createPlayer = async (event) => {
        event.preventDefault()
        
        const {data, error} = await supabase
            .from('Characters')
            .insert({
                team_name: player.team_name,
                player_name: player.player_name,
                characters: player.characters,
                friendship_level: player.friendship_level,
                farm_focus: player.farm_focus,
                tools: player.tools,
                season: player.season
            })
            .select()
        
        if (error) {
            console.error("Supabase error:", error.message)
        } else {
            console.log("Insert success:", data)
            // Clear form
            setPlayer({
                team_name: "", 
                player_name: "", 
                characters: "",
                friendship_level: "",
                farm_focus: "",
                tools: "",
                season: ""
            })
            // Navigate back
            window.location = "/"
        }
    }

    return (
        <div className="create-player-container">
            <h1>🌱 Create New Farmer 🌱</h1>
            <form onSubmit={createPlayer}>
                <label htmlFor="team_name">Farm/Team Name</label><br />
                <input type="text" id="team_name" name="team_name" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="player_name">Farmer Name</label><br />
                <input type="text" id="player_name" name="player_name" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="characters">Favorite Characters</label><br />
                <select id="characters" name="characters" onChange={handleChange}>
                    <option value="">Select Character</option>
                    <option value="Abigail">Abigail</option>
                    <option value="Alex">Alex</option>
                    <option value="Elliott">Elliott</option>
                    <option value="Emily">Emily</option>
                    <option value="Haley">Haley</option>
                    <option value="Harvey">Harvey</option>
                    <option value="Leah">Leah</option>
                    <option value="Maru">Maru</option>
                    <option value="Penny">Penny</option>
                    <option value="Sam">Sam</option>
                    <option value="Sebastian">Sebastian</option>
                    <option value="Shane">Shane</option>
                </select><br />
                <br/>

                <label htmlFor="friendship_level">Friendship Level</label><br />
                <select id="friendship_level" name="friendship_level" onChange={handleChange}>
                    <option value="">Select Level</option>
                    <option value="2">1-2 Hearts</option>
                    <option value="4">3-4 Hearts</option>
                    <option value="6">5-6 Hearts</option>
                    <option value="8">7-8 Hearts</option>
                    <option value="10">9-10 Hearts</option>
                </select><br />
                <br/>

                <label htmlFor="farm_focus">Farm Focus</label><br />
                <select id="farm_focus" name="farm_focus" onChange={handleChange}>
                    <option value="">Select Focus</option>
                    <option value="Crops">Crops</option>
                    <option value="Animals">Animals</option>
                    <option value="Mining">Mining</option>
                    <option value="Fishing">Fishing</option>
                    <option value="Foraging">Foraging</option>
                    <option value="Mixed">Mixed</option>
                </select><br />
                <br/>

                <label htmlFor="tools">Preferred Tools</label><br />
                <select id="tools" name="tools" onChange={handleChange}>
                    <option value="">Select Tool</option>
                    <option value="Watering Can">Watering Can</option>
                    <option value="Hoe">Hoe</option>
                    <option value="Axe">Axe</option>
                    <option value="Pickaxe">Pickaxe</option>
                    <option value="Scythe">Scythe</option>
                    <option value="Fishing Rod">Fishing Rod</option>
                </select><br />
                <br/>

                <label htmlFor="season">Favorite Season</label><br />
                <select id="season" name="season" onChange={handleChange}>
                    <option value="">Select Season</option>
                    <option value="Spring">Spring 🌸</option>
                    <option value="Summer">Summer ☀️</option>
                    <option value="Fall">Fall 🍂</option>
                    <option value="Winter">Winter ❄️</option>
                </select><br />
                <br/>

                <input type="submit" value="Create Farmer" />
            </form>
        </div>
    )
}

export default CreatePlayer