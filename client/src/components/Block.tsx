
export const Block=({value,indx,cb}:{value:any,indx:any,cb:any})=>{
    const send=()=>{
        try{
           cb(indx);
        }
        catch(err)
        {
            alert(err);
        }
        
    }
    return (
        <div onClick={send} className="p-8 border-[1px] rounded text-center items-center w-24 h-24 flex justify-center cursor-pointer">
            <p>{value}</p>
        </div>
    )
}