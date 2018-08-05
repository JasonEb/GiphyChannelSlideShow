import React from 'react'

class TwitchData extends React.Component {
    constructor(props){
      super(props)
      this.state = {
          this.game = "Black Desert"
      }
    }

    componentDidMount() {
      document.body.style.setProperty('--main-bg', 'black')
      document.title = "TwitchData"

      this.searchTwitch(this.state.currentStr)
    }




    render() {
        return (<h1>Twitch Data</h1>)
  }

export default TwitchData;
