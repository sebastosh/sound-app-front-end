import React from 'react'

class JamList extends React.Component {

	render(){
		return this.props.jams.map(jam => {
			return (
				<li key={jam.id} onClick={()=> this.props.selectJam(jam.id)}>
					{jam.name}
				</li>

			)
		})
	}
}

export default JamList