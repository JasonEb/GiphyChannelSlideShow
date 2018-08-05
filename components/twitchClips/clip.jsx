import React from 'react'

class Clip extends React.Component {
    render() {
        let {clip} = this.props
        let slug = !!clip ? clip.slug : '' 
        let url = !!clip ? `https://clips.twitch.tv/embed?clip=${slug}&tt_medium=clips_api&tt_content=embed&muted=false` : ''

        return <div className="clip">
            <iframe src={url} width='1280' height='720' frameBorder='0' scrolling='no' preload="auto" ></iframe>
        </div>
    }
}

export default Clip;