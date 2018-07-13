import React from 'react'

class Clip extends React.Component {
    render() {
        let {slug} = this.props
        let url = `https://clips.twitch.tv/embed?clip=${slug}&tt_medium=clips_api&tt_content=embed&muted=false`

        return <div className="clip">
            <iframe src={url} width='1080' height='720' frameBorder='1' scrolling='no' preload="auto" ></iframe>
        </div>
    }
}

export default Clip;