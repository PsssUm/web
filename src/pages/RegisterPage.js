import React from 'react';
import { setCookie, getCookie } from '../utils/Utils';

class RegisterPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            registerErrorText : "",
            name : getCookie("name") ? getCookie("name") : "",
            email : getCookie("email") ? getCookie("email") : "",
            password : getCookie("lastname") ? getCookie("lastname") : "",
            isRemember : false
        }
        
    }
    nameInputChanged = (event) => {
        if (event){
            this.setState({name : event.target.value})
        }
    }
    emailInputChanged = (event) => {
        if (event){
            this.setState({email : event.target.value})
        }
    }
    passwordInputChanged = (event) => {
        if (event){
            this.setState({password : event.target.value})
        }
    }

    registration = () => {
        if (this.state.name == "" || this.state.password == "" || this.state.email == "" || !this.state.email.includes("@")){
            this.setState({registerErrorText : "Проверьте правильность введенных данных"})
            return
        }
        this.setState({registerErrorText : ""})
        this.props.db.collection("users").add({
            first: this.state.name,
            last: this.state.password,
            email: this.state.email
        })
        .then((docRef) => {

            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        if (this.state.isRemember){
            setCookie('email', this.state.email)
            setCookie('name', this.state.name)
            setCookie('lastname', this.state.password)
            this.props.openView('questions')
        }
    }

    searchUser = () => {
        var foundEmail = false
        this.props.db.collection("users").where("email", "==", this.state.email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                if (doc.data().email.toLowerCase() == this.state.email.toLowerCase()){
                    foundEmail = true
                    setCookie('id', doc.id)
                    this.setState({registerErrorText : "Юзер с таким email уже зарегистрирован"})
                } 
            });
            if (!foundEmail){
                this.registration()
            }
        })
        .catch((error) => {
            this.registration()
            console.log("Error getting documents: ", error);
        });
    }

    
    
    
    
    openPolicy = () => {
        window.location.href = '/policy'
    }
    openAgreement = () => {
        window.location.href = '/agreement'
    }
    hideError = () => {
        this.setState({registerErrorText : ""})
    }
    rememberMeChanged = (event) => {
        if (event){
            const value = event.target.checked
            this.setState({isRemember : value})
        }
    }
    render() {
        return (
            <div onClick={this.hideError} className="block">
                <input onChange={this.passwordInputChanged} type="text" name="password" className="form-control" placeholder="Фамилия" value={this.state.password}/>

                <span className="relative">
                    <input onChange={this.nameInputChanged} type="text" name="username" className="form-control" placeholder="Имя" value={this.state.name}/>
                    
                </span>
                <input onChange={this.emailInputChanged} type="email" name="email" className="form-control" placeholder="Email" value={this.state.email}/>
                <div style={{marginBottom : '24px'}} className="flex">
                    <input onChange={this.rememberMeChanged} type="checkbox" className="checkbox" value={this.state.isRemember} />
                    <p className="check_text">Запомнить меня</p>
                </div>
                <div className="relative">
                    <button style={this.state.name.length > 0 && this.state.email.length > 2 && this.state.password.length > 2 ? {opacity : 1, pointerEvents : 'auto'} : {opacity : 0.2, pointerEvents : 'none'}} onClick={this.searchUser} className="form-control btn btn-register" id="login-submit">Зарегистрироваться</button>
                    {this.state.registerErrorText != "" && <div className="tooltip__container tooltip-top rate-content__tooltip-wrapper my-top-tooltip">
                            <i className="tooltip__arrow rate-content__tooltip-arrow tooltip_bottom i_error" role="button"></i>
                            <p className="errorText">{this.state.registerErrorText}</p>
                    </div>}
                </div>
                
             </div>
        );
    }
}
export default RegisterPage;