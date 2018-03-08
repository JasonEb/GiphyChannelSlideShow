import React from 'react'

class battery extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({visible: !this.state.visible})
    }

    componentDidMount() {
        console.log("Battery test")
    }

    render() {
        let { batteryPct } = this.props
        let {tempo} = window
        let beatMs = 60000 / tempo
        let width = Math.round(76 * (batteryPct))
        let style = {
            width: `${width}px`,
            animation: `jerk ${beatMs*4}ms infinite`,
            backgroundColor: batteryPct < 0.30 ? 'red' : 'white'
        }
        
        return <div id='battery' style={style}>
        </div>
    }
}

export default battery;
