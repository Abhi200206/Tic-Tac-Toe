import { useSearchParams } from "react-router-dom";
import { Game } from "./Game";

export const Join=()=>{
    const [params]=useSearchParams();
    const code=params.get('code');
    const playerid=params.get('playerid');
    return (
        
        <div>
            <Game code={code} playerid={playerid} />
        </div>
    )
}