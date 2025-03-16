import { Block } from "./Block"

export const Blocks = ({ values=[],playerid,code,cb }: { values: any[] ,playerid:any,code:any,cb:any}) => {
    if(values.length <=0)
    {
        return <div>
            <p>loading ..</p>
        </div>
    }
    return (
        <div>
            <div className="flex gap-1">
                <Block indx={1} cb={cb} value={values[0]} />
                <Block indx={2} cb={cb} value={values[1]} />
                <Block indx={3} cb={cb} value={values[2]} />
            </div>
            <div className="flex gap-1">
                <Block indx={4} cb={cb} value={values[3]} />
                <Block indx={5} cb={cb} value={values[4]} />
                <Block indx={6} cb={cb} value={values[5]} />
            </div>
            <div className="flex gap-1">
                <Block indx={7} cb={cb} value={values[6]} />
                <Block indx={8} cb={cb} value={values[7]} />
                <Block indx={9} cb={cb} value={values[8]} />
            </div>
        </div>
    )
}