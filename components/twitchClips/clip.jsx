import React from 'react'

class Clip extends React.Component {
    render() {
        let {clip, style} = this.props
        let slug = !!clip ? clip.slug : '' 
        let parent = '127.0.0.1'
        let url = !!clip ? `https://clips.twitch.tv/embed?clip=${slug}&autoplay=true&tt_medium=clips_api&tt_content=embed&muted=false&parent=${parent}` : ''

        return <div className="clip" style={style}>
            <iframe src={url} width='1280' height='720'  frameBorder='0' scrolling='no' preload="auto" ></iframe>
        </div>
    }
}

export default Clip;