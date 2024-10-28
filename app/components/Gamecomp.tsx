export default function Gamecomp({ char, num, cb, state }: { char: string,  num: number, cb: (x:number)=>void, state: string [] }) {
    function handleClick() {
        if (state[num] == 'click') { 
            cb(num);  
        }
    }

    return (
        <div onClick={handleClick} className={`${char === 'X' ? 'bg-blue-500' : 'white'
            } ${char === 'O' ? 'bg-red-500' : 'white'} p-2 w-[100px] h-[100px] rounded text-center items-center cursor-pointer border-[1px]`}
        >
            <p className="pt-2">{char}</p>
        </div>
    );
}
