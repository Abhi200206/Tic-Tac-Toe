import { useEffect, useState } from "react"
import axios from "axios";
import { Blocks } from "../components/Blocks";
export const Game=({code,playerid}:{code :any,playerid:any})=>{
    const [arr,setArr]=useState<any []>([]);
    const sendreq=async(indx:number)=>{
        try{
            
            let res=await axios.post(`http://127.0.0.1:5000/change/${code}`,{
               playerid,
               indx
            });
            
            if(res.data.bool)
            {
                alert("player with id: "+playerid+" won the match !!!!");
                
            }
            if(res.data.gameover)
            {
                setTimeout(()=>{
                    update();
                alert("gave completed !!!")
                },2000)
                
            }
            console.log(" value",res.data);
            setArr(res.data.state);
        }
        catch(err)
        {
            console.log(err)
            alert("not your turn")
        }

    }
    const update=async()=>{
        try{
            console.log(code);
            let res=await axios.put(`http://127.0.0.1:5000/update/${code}`);
            
        }
        catch(err)
        {
            console.log(err);
            alert("error fetching");
        }
    }
    const getState=async()=>{
        try{
            console.log(code);
            let res=await axios.get(`http://127.0.0.1:5000/getstate/${code}`);
            if(res.data.gameover)
            {
                setTimeout(()=>{
                    update();
                alert("gave completed !!!")
                },1000);
               
            }
            setArr(res.data.state);
            console.log(res.data);
        }
        catch(err)
        {
            console.log(err);
            alert("error fetching");
        }

    }
    useEffect(()=>{
       let intr= setInterval(()=>{
            getState();
        },2000);
        return ()=>{
            clearInterval(intr);
        }
    },[])
    useEffect(()=>{
       getState(); 
    },[]);
    return (
        <div>
            <p>this: {JSON.stringify(arr)} </p>
            <p>code: {code}</p>
            <p>playerid:{playerid}</p>
            <div>
                <Blocks cb={sendreq} code={code} playerid={playerid} values={arr}/>
            </div>
        </div>
    )
}