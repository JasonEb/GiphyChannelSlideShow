import React from 'react'

class ClipTitleCard extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let {username, title} = this.props
        let style = {
            visibility: this.props.visibility ? "visible" : "hidden",
            mixBlendMode : this.props.blendMode
        }

        return <section id="clip_title_card" style={style}>
            <div className="glitch">
                <div className="text">
                    <span>
                        "{title}"
                        <br/>
                        {username}
                    </span>
                    <span>
                        "{title}"
                        <br/>
                        {username}
                    </span>
                    <span>
                        "{title}"
                        <br/>
                        {username}
                    </span>
                    <span>
                        "{title}"
                        <br/>
                        {username}
                    </span>
                </div>
            </div>
        </section>
    }
  }

export default ClipTitleCard;
