import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
export const Landing=()=>{
    const navigate=useNavigate();
    const [code,setCode]=useState();
    const [playerid,setPlayerid]=useState();
    const getdel=async()=>{
        try{
            let res=await axios.get(`http://127.0.0.1:5000/addplayer/${code}`);
            console.log(res.data);
            setPlayerid(res.data.player2);
            console.log("----------->player: ",playerid)
            navigate(`/join?code=${code}&playerid=${res.data.player2}`)
        }
        catch(err)
        {
            alert("error");
        }
    }
    return(
        <div>
            <div onClick={()=>{
                navigate('/create')
            }}>create</div>
            <br />
            <input className="border-[1px]" placeholder="enter code to join" type="text" onChange={(e:any)=>setCode(e.target.value)}  />
            <div onClick={async()=>{
                await getdel();
            }
                }>join</div>
        </div>
    )
}