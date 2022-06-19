import React from 'react';
import { getCookie, getTechnologies, getTimeRanges, setCookie } from './utils/Utils';
import ChooseTechnology from './items/ChooseTechnology';
import SwitchLine from './items/SwitchLine';

class Questions extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email : getCookie('email'),
            knownTechnologies : getTechnologies(),
            whantToKnow : getTechnologies(),
            wantToBeMentor : false,
            wantMentor : false,
            about : "",
            times : getTimeRanges(),
            error : ""
        }
        this.emailChanged = this.emailChanged.bind(this)
        this.wantToBeMentorChanged = this.wantToBeMentorChanged.bind(this)
        this.wantMentorChanged = this.wantMentorChanged.bind(this)
        this.aboutChanged = this.aboutChanged.bind(this)
        this.timePickerChanged = this.timePickerChanged.bind(this)
    }
    componentDidMount(){
        if (this.props.db != undefined){
            this.searchUserData()
        }
    }
    componentDidUpdate(prevProps){
        if (this.props != prevProps){
            this.searchUserData()
        }
    }
    searchUserData = () => {
        this.props.db.collection("users").where("email", "==", this.state.email).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var user = doc.data()
                this.setState({email : user.email, wantToBeMentor : user.want_to_be_mentor, wantMentor : user.want_mentor, about : user.about})
                const timesArr = user.times.split(",")
                var times = this.state.times
                times.forEach(time => {
                    if (timesArr.includes(time.title)){
                        time.isSelected = true
                    } else {
                        time.isSelected = false
                    }
                });
                this.setState({times : times})

                const knownTechArr = user.known_tech.split(",")
                var knownTechs = this.state.knownTechnologies
                knownTechs.forEach(tech => {
                    if (knownTechArr.includes(tech.title)){
                        tech.isSelected = true
                    } else {
                        tech.isSelected = false
                    }
                });
                this.setState({knownTechnologies : knownTechs})

                const whantToKnowArr = user.want_to_know_tech.split(",")
                var wantTechs = this.state.whantToKnow
                wantTechs.forEach(tech => {
                    if (whantToKnowArr.includes(tech.title)){
                        tech.isSelected = true
                    } else {
                        tech.isSelected = false
                    }
                });
                this.setState({whantToKnow : wantTechs})
            });
           
        })
        
        //knownTechnologies : user.known_tech, whantToKnow : user.want_to_know_tech
    }
    emailChanged(event){
        if (event){
            const value = event.target.value
            this.setState({email : value})
        }
    }
    aboutChanged(event){
        if (event){
            const value = event.target.value
            this.setState({about : value})
        }
    }
    toggleKnownTechnology = (index) => {
        var array = this.state.knownTechnologies
        array[index].isSelected = !array[index].isSelected
        this.setState({knownTechnologies : array})
    }
    toggleWantToKnow = (index) => {
        var array = this.state.whantToKnow
        array[index].isSelected = !array[index].isSelected
        this.setState({whantToKnow : array})
    }
    wantToBeMentorChanged(event){
        console.log("wantToBeMentorChanged")
        if (event){
            var value = event.target.checked
            this.setState({wantToBeMentor : value})
        }
    }
    wantMentorChanged(event){
        if (event){
            var value = event.target.checked
            this.setState({wantMentor : value})
        }
    }
    timePickerChanged(index){
        var array = this.state.times
        array[index].isSelected = !array[index].isSelected
        this.setState({times : array})
    }
    saveInfo = () => {
        var knownTech = this.state.knownTechnologies.filter(t => t.isSelected).join(',')
        var wantToKnowTech = this.state.whantToKnow.filter(t => t.isSelected).join(',')
        var times = this.state.times.filter(t => t.isSelected).join(',')
        if (knownTech == "" || wantToKnowTech == "" || times == "" || this.state.about == ""){
            this.setState({error : 'Заполните недостающую информацию'})
            return
        }
        this.setState({error : ''})
        var user = this.props.db.collection("users").doc(getCookie('id'));
        const params = {email: this.state.email,
            known_tech: knownTech,
            want_to_know_tech: wantToKnowTech,
            times : times,
            about : this.state.about,
            want_to_be_mentor : this.state.wantToBeMentor,
            want_mentor : this.state.wantMentor}
        user.update(params)
        .then(function() {
            
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
        setCookie('email', this.state.email)
    }
    render() {
        return (
            <div className="main_container" style={{minHeight : '100vh'}}>
                <p className="main_title">Анкета</p>
                <div className="order_row bot_16">
                    <div style={{display : 'block'}} className="input_container_border display_block">Введите свой Email
                        <input autoComplete="off" placeholder="email" onChange={this.emailChanged} className="input_text_search" value={this.state.email}/>
                    </div>
                    <div className="input_description_container">
                        <p className="input_description_text">Ваш email</p>
                    </div>
                 </div>
                 <div className="line-row"/>
                 <ChooseTechnology title="Хорошо знаете эти технологии" description="Выберите технологии, которые вы хорошо знаете и готовы поделиться своими знаниями" toggleKnownTechnology={this.toggleKnownTechnology} knownTechnologies={this.state.knownTechnologies}/>
                 <div className="line-row"/>
                 <ChooseTechnology title="Хотите изучить" description="Выберите технологии, которые вы хотели бы изучить или уже начали изучать и у вас появилось много вопросов." toggleKnownTechnology={this.toggleWantToKnow} knownTechnologies={this.state.whantToKnow}/>
                 <div className="line-row"/>
                 <SwitchLine title="Хочу быть ментором" description="Выберите, если хотите стать ментором и научить чему-нибудь полезному" isSelected={this.state.wantToBeMentor} onSwitchChanged={this.wantToBeMentorChanged}/>
                 <div className="line-row"/>
                 <SwitchLine title="Ищу ментора" description="Если вам нужна помощь в изучение чего-либо" isSelected={this.state.wantMentor} onSwitchChanged={this.wantMentorChanged}/>
                 <div className="line-row"/>
                 <div className="order_row">
                    <div style={{display : 'block'}} className="input_container_border display_block">Расскажите о себе
                        <input autoComplete="off" placeholder="Хобби, должность, привычки" onChange={this.aboutChanged} className="input_text_search" value={this.state.about}/>
                    </div>
                    <div className="input_description_container">
                        <p className="input_description_text">Опишите вашу должноть, хобби, вредные привычки. Любую интересную информацию в свободной форме.</p>
                    </div>
                </div>
                 <div className="line-row"/>
                 <ChooseTechnology isTimes={true} title="Время обеда" description="Выберите временной интервал обеда или несколько разных временных интервалов отдыха" toggleKnownTechnology={this.timePickerChanged} knownTechnologies={this.state.times}/>

                 <div className="line-row"/>
                  {this.state.error != "" && <p style={{color : 'rgb(255, 98, 98)', marginTop : '16px', marginBottom : '16px'}}>{this.state.error}</p>}
                 <div onClick={this.saveInfo} style={!this.state.email.includes("@") ? {opacity : '0.2', pointerEvents : 'none'} : {}} className="yellow_btn create_order_btn">Сохранить</div>
            </div>
        );
    }
}
export default Questions;