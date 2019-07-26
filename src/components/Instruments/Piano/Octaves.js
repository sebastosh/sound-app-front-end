import React from 'react'

const Octaves = (props) => {
	
	return (

		<div className="octave">
			<div>
				<button onClick={() => props.handleClick('minus')}>-</button>
				{props.octave}
				<button onClick={() => props.handleClick('plus')}>+</button>
			</div>
		</div>
	);
};

export default Octaves
