import React from 'react'

const Octaves = (props) => {
	
	return (

		<div className="octave">
			<div>Octave:</div>
			<div>
				<button onClick={() => props.handleClick('minus')}>-</button>
				<p>{props.octave}</p>
				<button onClick={() => props.handleClick('plus')}>+</button>
			</div>
		</div>
	);
};

export default Octaves
