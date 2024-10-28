import Gamecomp from "./Gamecomp";

export default function Gamecard({ state,  cb }: { state: string [],  cb: (x:number)=>void }) {
    return (
        <div>
            <div className="flex">
                <Gamecomp state={state} cb={cb} num={0} char={state[0]} />
                <Gamecomp state={state} cb={cb} num={1} char={state[1]} />
                <Gamecomp state={state} cb={cb} num={2} char={state[2]} />
            </div>
            <div className="flex">
                <Gamecomp state={state} cb={cb} num={3} char={state[3]} />
                <Gamecomp state={state} cb={cb} num={4} char={state[4]} />
                <Gamecomp state={state} cb={cb} num={5} char={state[5]} />
            </div>
            <div className="flex">
                <Gamecomp state={state} cb={cb} num={6} char={state[6]} />
                <Gamecomp state={state} cb={cb} num={7} char={state[7]} />
                <Gamecomp state={state} cb={cb} num={8} char={state[8]} />
            </div>
        </div>
    );
}
