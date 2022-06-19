import React from 'react';
import { getUrlParameter, getToken } from './utils/Utils';
import AuthPage from './pages/AuthPage';
import './styles/auth.css'
import RegisterPage from './pages/RegisterPage';

class Auth extends React.Component {
    constructor(props){
        super(props)

        

        var isShowAuth = getUrlParameter("isRegister")
        if (isShowAuth != undefined && isShowAuth != null){
            isShowAuth = false
        } else {
            isShowAuth = true
        }
        this.state = {
            isShowAuth : isShowAuth,
            isShowSuccessRegistrated : false
        }
       //this.getMyAds()
        var token = getToken()
        if (token && token != ""){
            //window.location.href = '/orders'
        }
    }
    onCanceled = () => {
        this.setState({isShowSuccessRegistrated : false})
    }
    showSuccessRegistated = () => {
        this.setState({isShowSuccessRegistrated : true})
    }
    showAuth = () => {
        this.setState({isShowAuth : true})
    }
    showrRegister = () => {
        this.setState({isShowAuth : false})
    }
    render() {
        return (
            <div className="register_container auth-table">
                <div ng-click="hideTooltips()">
                   
                    {/* <img src={logo} align="center" className="logo-auth"/> */}

                    <div className="panel panel-login">
                        <div className="panel-heading">
                    
                            <div className="text_top_reg">
                             <a onClick={this.showAuth} href="#" className={this.state.isShowAuth ? "active_title" : "blue_title"} id="login-form-link">Вход</a>
                            </div>
                            <div className="text_top_reg">
                             <a  onClick={this.showrRegister} href="#" className={!this.state.isShowAuth ? "active_title" : "blue_title"} id="register-form-link">Регистрация</a>
                            </div>
                      
                        
                        </div>
                        <div className="panel-body">
                            {this.state.isShowAuth ? <AuthPage openView={this.props.openView} db={this.props.db}/> : <RegisterPage openView={this.props.openView} db={this.props.db} showSuccessRegistated={this.showSuccessRegistated}/>}
                  
                    </div>
                    </div>
                </div>
          
            </div>
        );
    }
}
export default Auth;