import React from 'react'

interface ViewItemInterface {
    image: string;
    time: string;
    name: string;
    cost: number;
}


function ViewItem({ obj }: { obj: ViewItemInterface }) {
    return (
        <div>
            <div style={{minHeight: "250px"}}>
                    <img src={obj.image} alt={obj.name} className="img-thumbnail"></img>

            </div>
            <div >
                <div>
                    {obj.time}
                </div>
                <div style={{display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden"}}
                className='my-1'>
                    {obj.name}
                </div>
                <div className="fw-bold">
                    ${obj.cost}
                </div>
            </div>

        </div>
    );
}

export default ViewItem;