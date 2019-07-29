import React, { Component } from 'react'

class ScorePlot extends Component {
  handleChange = (x, y) => {

    return e => {
      this.props.data[y][x] = +e.currentTarget.checked
      this.forceUpdate()
    }
  }

  render () {
    return (
      <div className="table">
        <div className="tbody">
          {[...new Array(this.props.height)].map((_, y) => (
            <div className="key-y" key={y}>
              {[...new Array(this.props.width)].map((_, x) => (
                <div className="key-x" key={x}>
                  <input
                  className="sequencer-box" 
                      type="checkbox"
                      checked={this.props.data[y][x]}
                      onChange={this.handleChange(x, y)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tbody">
          <div className="key-y">
            {[...new Array(this.props.width)].map((_, x) => (
              <div className="key-x" key={x}>
                <input
                className="sequencer-box" 
                    type="checkbox"
                    checked={x === this.props.index}
                    disabled
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ScorePlot


