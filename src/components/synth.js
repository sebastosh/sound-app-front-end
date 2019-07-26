import React from 'react'
import Tone from 'tone'

const synth = () => {
    const gain = new Tone.Gain(0.5).toMaster()
let synth = new Tone.Synth().connect(gain)

    
}

export default synth
