import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Game } from "./Game";
export const Create=()=>{
    const navigate=useNavigate();
    const [code,setCode]=useState();
    const [playerid,setPlayerid]=useState();
    const [loading,setLoading]=useState(true);
    const create=async()=>{
        try{
            let res=await axios.get(`http://127.0.0.1:5000/initialize`);
            setCode(res.data.code)
            setPlayerid(res.data.player1);
            setLoading(false);
        }
        catch(err)
        {
            console.log(err);
            alert("error creating game ");
            navigate('/')
        }
    };
    useEffect(()=>{
        create();
    },[]);
    if(loading)
    {
        return <div>
            Loading...
        </div>
    }
    return (
        <div>
            share this code to code with your friends to join the game
            <br />
            
            <p>code: {code}</p> <br />
            <Game code={code} playerid={playerid}/>

        </div>
    )
}