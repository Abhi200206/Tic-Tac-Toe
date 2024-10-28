"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const [code, setCode] = useState<string>("");
  const router=useRouter();
  async function Generate()
  {
    const id=await axios.get('http://localhost:3000/api') ;
    router.push(`/game?id=${id.data.id}&bool=${id.data.bool}&roomID=${id.data.roomID}`);
  }
  async function gen(roomID: string) {
    const response = await axios.get(`http://localhost:3000/api?roomID=${roomID}`);
    console.log(JSON.stringify(response.data));
    if (response.data.error) {
      alert("Invalid room ID. Please enter a valid code.");
    } else {
      router.push(`/game?id=${response.data.id}&bool=${response.data.bool}&roomID=${roomID}`);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" ">
        <div onClick={Generate} className="cursor-pointer border-[1px] border-black text-center p-2 rounded bg-black text-white hover:text-black hover:bg-white "><p>Create</p></div>
        <div className="text-2xl font-serif text-center my-8">
          <p>OR</p>
        </div>
        <div >
          <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setCode(e.target.value);
          }}   className="rounded border-[1px] border-black p-1 my-2" type="text" placeholder="Enter the code" />
          <div onClick={()=>{
            gen(code)
          }} className="cursor-pointer border-[1px] border-black text-center p-2 rounded bg-black text-white hover:text-black hover:bg-white "><p>Join</p></div>
        </div>
      </div>
    </div>
  );
}
