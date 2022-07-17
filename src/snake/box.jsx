import React from "react";
import '../index.css'

const Box = ({ isSnake, isBody, isApple }) => {
    return <div>
        <div className='box' style={{ backgroundColor: isSnake ? 'green' : isBody ? 'greenyellow' : isApple && 'red', border:  isBody ? "1px solid black" : "0.1px solid grey" }}>
            {/* <div className='box' style={{ backgroundColor: isApple ? 'red' : 'greeh' }}></div> */}
        </div>

    </div>
}

export default Box;