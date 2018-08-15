import React from 'react'

class ClipsDisplay extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log("Current Track and Display Mounted")
    }

    render() {
        return <h1>Clips</h1>
    }
}

export default ClipsDisplay