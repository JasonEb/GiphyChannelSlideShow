import React from 'react'

class DateAndTimeDisplay extends React.Component {
    constructor(props) {
        super(props)

        this.rotateInfo = this.rotateInfo.bind(this)
        this.toggle = this.toggle.bind(this)
        this.state = { date: new Date(), count: 0 }
        this.loopId = 0
    }

    rotateInfo() {
        let {count} = this.state
        this.setState({count: count + 1, date: new Date()})    
    }

    toggle() {
        this.setState({visible: !this.state.visible})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tempo !== this.props.tempo){
            clearInterval(this.loopId)
            let {tempo} = nextProps
            let beatMs = 60000 / tempo
            this.loopId = setInterval(this.rotateInfo,beatMs*16)
        }
    }

    componentDidMount() {
        let {tempo} = this.props
        let beatMs = 60000 / tempo
        this.loopId = setInterval(this.rotateInfo,beatMs*16)
    }

    componentWillUnmount() {
        clearInterval(this.loopId)
    }

    render() {
        let {date, count} = this.state
        let {tempo} = this.props || 120
        let beatMs = 60000 / tempo

        let style = {
            animation: `blur ${beatMs*2}ms infinite`
        }

        let hours = date.getHours()
        let minutes = date.getMinutes()
        minutes = minutes < 10 ? '0' + minutes : minutes

        let info = count % 2 === 0 ? date.toDateString() : `${hours}:${minutes}` + " PST"

        return <div id="date_and_time_display" style={style}>{info}</div>
    }
}

export default DateAndTimeDisplay