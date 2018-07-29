import React from 'react'

class ClipTitleCard extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let {clip} = this.props
        let broadcaster = !!clip ? clip.broadcaster.display_name : ''
        let title = !!clip ? clip.title : ''

        let style = {
            visibility: this.props.visibility ? "visible" : "hidden"
        }

        return <div id="clip_title_card" style={style}>
            <div className="glitch">
                <div className="text">
                    <span>
                        "{title}"
                        <br/>
                        {broadcaster}
                    </span>
                    <span>
                        "{title}"
                        <br/>
                        {broadcaster}
                    </span>
                    <span>
                        "{title}"
                        <br/>
                        {broadcaster}
                    </span>
                    <span>
                        "{title}"
                        <br/>
                        {broadcaster}
                    </span>
                </div>
            </div>
        </div>
    }
  }

export default ClipTitleCard;
