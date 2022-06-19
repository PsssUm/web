import React from 'react';
class SwitchLine extends React.Component {
    constructor(props){
        super(props)
        
    }
    
   
    render() {
        return (
            <div className="order_row">
                    <div className="switch_container flex">
                        <label className="switch">
                            <input type="checkbox" onChange={this.props.onSwitchChanged} checked={this.props.isSelected} />
                            <div className="slider round"></div>
                        </label>

                        <p className="text-pre-subscr">{this.props.title}</p>
                    </div>
                    <div className="input_description_container">
                        <p className="input_description_text">{this.props.description}</p>
                    </div>
            </div>
           
        );
    }
}
export default SwitchLine;