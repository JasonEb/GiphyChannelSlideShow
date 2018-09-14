import React from 'react'

class ClipTitleCard extends React.Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        let {clip, onTitleClick} = this.props
        onTitleClick(clip)
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
                <div className="text" onClick={this.handleClick}>
                    <span>
                        ⦍{title}⦐
                        <br/>
                        {broadcaster}
                    </span>
                    <span>
                        ⦍{title}⦐
                        <br/>
                        {broadcaster}
                    </span>
                    <span>
                        ⦍{title}⦐
                        <br/>
                        {broadcaster}
                    </span>
                    <span>
                        ⦍{title}⦐
                        <br/>
                        {broadcaster}
                    </span>
                </div>
            </div>
        </div>
    }
  }

export default ClipTitleCard;
