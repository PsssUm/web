import React from 'react';
import arrow_filter from '../images/drop_arrow.svg'
import TechnologiesDropdown from '../dialogs/TechnologiesDropdown';

var arrowRotate = {
    transform: 'rotate(180deg)',
    marginTop: '6px'
}
class ChooseTechnology extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isShowTypes : false
        } 
    }
    toogleTypes = () => {
        this.setState({isShowTypes : !this.state.isShowTypes})
    }
    render() {
        const selectedTechnologies = this.props.knownTechnologies.filter(tech => tech.isSelected)
        return (
            <div className="display_block">
                    <div className="order_row">
                        <div className="relative choose_type">
                            <div onClick={this.toogleTypes} className="button_choose_app choose_type new_border new_border_hover">
                                    <p className="choose_type_title">{this.props.title}</p>
                                    <div className="just_content">
                                        <p className="button_choose_text">{selectedTechnologies.length == 0 ? this.props.isTimes ? "Время" : "Технологии" : "Выбрано : " + selectedTechnologies.length} </p>
                                        <img style={this.state.isShowTypes ? arrowRotate : {}} className="choose_drop_arrow" src={arrow_filter}/>
                                    </div>
                            </div>
                            {this.state.isShowTypes && <TechnologiesDropdown toggleKnownTechnology={this.props.toggleKnownTechnology} technologies={this.props.knownTechnologies}/>}

                        </div>
                        
                        <div className="input_description_container">
                            <p className="input_description_text">{this.props.description}</p>
                        </div>
                    </div>
            </div>
           
        );
    }
}
export default ChooseTechnology;