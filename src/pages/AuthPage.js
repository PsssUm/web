import React from 'react';

import { getUrlParameter, setCookie, getCookie } from '../utils/Utils';
class AuthPage extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            authErrorText : "",
            authErrorText2 : "",
            name : getCookie("name") ? getCookie("name") : "",
            email : getCookie("email") ? getCookie("email") : "",
            lastname : getCookie("lastname") ? getCookie("lastname") : "",
        }
        
    }
    loginInputChanged = (event) => {
        if (event){
            this.setState({email : event.target.value})
        }
    }
    lastnameChanged = (event) => {
        if (event){
            this.setState({lastname : event.target.value})
        }
    }
    nameChanged = (event) => {
        if (event){
            this.setState({name : event.target.value})
        }
    }
    authUser = () => {
        this.setState({isShowError : false})
        
    }
    forgotPass = () => {
        this.setState({isShowForgotPass : true})
    }
    closePassDialog = () => {
        this.setState({isShowForgotPass : false, isShowResetPassword : false})
    }
    emailSent = () => {
        this.setState({isShowForgotPass : false, isShowSuccessRecovered : true})
    }
    onCanceled = () => {
        this.setState({isShowSuccessRecovered : false})
    }
    closeError = () => {
        this.setState({isShowError : false})
    }
    searchUser = () => {
        this.setState({authErrorText : ""})
        var foundEmail = false
        var foundUser = {}
        this.props.db.collection("users").where("email", "==", this.state.email).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().email.toLowerCase() == this.state.email.toLowerCase()){
                    foundEmail = true
                    foundUser = doc.data()
                    setCookie('id', doc.id)
                }
            });
            if (foundEmail){
                if (foundUser.first.toLowerCase() == this.state.name.toLowerCase() && foundUser.last.toLowerCase() == this.state.lastname.toLowerCase()){
                    setCookie('email', this.state.email)
                    setCookie('name', this.state.name)
                    setCookie('lastname', this.state.lastname)
                    
                    //window.location.href = '/questions'
                    this.props.openView('questions')
                } else {
                    this.setState({authErrorText : "Неверно введены данные"})
                }
            } else {
                this.setState({authErrorText : "Юзер не найден"})
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    render() {
        return (
            <div onClick={this.closeError} className="block">
                <input onChange={this.lastnameChanged} type="text" className="form-control" placeholder="Фамилия" value={this.state.lastname}/>
                <input onChange={this.nameChanged}  type="text" name="password" className="form-control" placeholder="Имя" value={this.state.name}/>

                <input onChange={this.loginInputChanged} type="text" name="username" className="form-control" placeholder="Email" value={this.state.email}/>
                <div className="relative">
                    <button style={(this.state.email == undefined || this.state.name == undefined) ? {opacity : 0.2, pointerEvents : 'none'} : this.state.email.length > 2 && this.state.name.length > 2 ? {opacity : 1, pointerEvents : 'auto'} : {opacity : 0.2, pointerEvents : 'none'}} onClick={this.searchUser} id="login-submit-reg-btn" className="form-control btn btn-login">Вход</button>
                    {this.state.authErrorText != "" && <p className="errorText">{this.state.authErrorText}</p>
                    } 
                </div>
               
                
             </div>
        );
    }
}
export default AuthPage;