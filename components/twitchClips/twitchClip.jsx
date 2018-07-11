import React from 'react'

class TwitchClip extends React.Component {
    render() {
        return <div className="clips">
        <iframe src='https://clips.twitch.tv/embed?clip=InspiringBeautifulLousePRChase&tt_medium=clips_api&tt_content=embed' width='1080' height='720' frameborder='1' scrolling='no' allowfullscreen='true'></iframe>
        </div>
    }
}

export default TwitchClip;