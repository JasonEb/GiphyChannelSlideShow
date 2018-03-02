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

        let width = Math.round(76 * (batteryPct))
        let style = {
            animation: 'jerk 2s infinite',
            width: `${width}px`,
            // animation: batteryPct < 0.30 ? 'pulse 1s infinite' : null,
            backgroundColor: batteryPct < 0.30 ? 'red' : 'white'
        }
        
        return <div id='battery' style={style}>
        </div>
    }
}

export default battery;
