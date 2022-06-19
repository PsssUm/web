import React from 'react';
import check_blue from '../images/check_blue.svg'
class TechnologiesDropdown extends React.Component {
    constructor(props){
        super(props)
    }
    onTypePicked = (type, index) => {
        this.props.toggleKnownTechnology(index)
    }
    onCloseFilters = () => {
        console.log("onClose")
        if (this.props.onCloseFilters){
            this.props.onCloseFilters()
        }
        
    }
    render(){
      
            return (
            
                    <div style={this.props.style} className="apps_dropdown filter_dropdown choose_type_dropdown">
                        {/* <div onClick={this.onCloseFilters} className="tooltip_bg"></div> */}
                        {this.props.technologies.map((type, index) => (
                            <div style={type.isSelected ? {background: '#EAF4FA'} : {}} onClick={() => this.onTypePicked(type, index)} className="flex apps_line" type={type} key={index}>
                                <p className="apps_drop_text choose_type_text">{type.title}</p>
                                <img style={type.isSelected ? {display : 'block'} : {display : 'none'}} src={check_blue}/>
                            </div>   
                        ))}
                        
                    </div>
             
            ); 
        
        
    }
}
export default TechnologiesDropdown;
