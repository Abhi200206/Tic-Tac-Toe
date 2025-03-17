import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
export const Landing = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState();
    const [playerid, setPlayerid] = useState();
    const getdel = async () => {
        try {
            let res = await axios.get(`http://127.0.0.1:5000/addplayer/${code}`);
            console.log(res.data);
            setPlayerid(res.data.player2);
            console.log("----------->player: ", playerid)
            navigate(`/join?code=${code}&playerid=${res.data.player2}`)
        }
        catch (err) {
            alert("error");
        }
    }
    return (
        <div className="flex justify-center ">
            <div>
                <div className="font-sans rounded py-2 bg-gradient-to-tr from-purple-500 via-orange-200 to-pink-500 font-semibold  text-3xl text-center mt-4 mb-12">
                    <p>Tic-Tac-Toe</p>
                </div>
                <div>
                    <div className="rounded border-[1px] cursor-pointer p-1 text-center font-sans text-white bg-emerald-500 hover:bg-emerald-600" onClick={() => {
                        navigate('/create')
                    }}>create</div>

                    <div className="my-6 text-slate-500 text-center">
                        <p>------------------OR------------------</p>
                    </div>

                    <div className="md:flex md:gap-2">
                        <div className="mb-2 md:mb-0">
                            <input className="border-[1px] min-w-64 rounded p-1" placeholder="enter code to join" type="text" onChange={(e: any) => setCode(e.target.value)} />
                        </div>
                        <div className="rounded border-[1px] cursor-pointer p-1 text-center font-sans text-white bg-cyan-500 hover:bg-cyan-600" onClick={async () => {
                            await getdel();
                        }
                        }>join</div>
                    </div>
                </div>
            </div>
        </div>
    )
}