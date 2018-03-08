import React from 'react'

class DateAndTimeDisplay extends React.Component {
    constructor(props) {
        super(props)

        this.rotateInfo = this.rotateInfo.bind(this)
        this.toggle = this.toggle.bind(this)
        this.state = { date: new Date(), loopId: 0, count: 0 }
    }

    rotateInfo() {
        let {count} = this.state
        this.setState({count: count + 1})    
    }

    toggle() {
        this.setState({visible: !this.state.visible})
    }
    componentDidMount() {
        let {tempo} = window
        let beatMs = 60000 / tempo
        this.state.loopId = setInterval(this.rotateInfo,beatMs*16)
    }

    render() {
        let {date, count} = this.state
        let {tempo} = window
        let beatMs = 60000 / tempo

        let style = {
            animation: `blur ${beatMs*2}ms infinite`
        }

        let info = count % 2 === 0 ? date.toDateString() : date.toLocaleTimeString()

        return <div id="date_and_time_display" style={style}>{info}</div>
    }
}

export default DateAndTimeDisplay