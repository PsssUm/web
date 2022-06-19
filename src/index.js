import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css'
import {
  BrowserRouter as Router, Switch,
  Route
} from "react-router-dom";
import Auth from './Auth';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Questions from './Questions';
const firebaseConfig = {
	apiKey: "AIzaSyCI91wZXP2eaX-PDZ7vcUQITTDrKjksPBQ",
	authDomain: "vk-mini-apps-3d40e.firebaseapp.com",
	projectId: "vk-mini-apps-3d40e",
	storageBucket: "vk-mini-apps-3d40e.appspot.com",
	messagingSenderId: "313555575143",
	appId: "1:313555575143:web:64979e52b58521bf25cfc2",
	databaseURL:'https://vk-mini-apps-3d40e-default-rtdb.europe-west1.firebasedatabase.app/',
	measurementId: "G-8VWSLCYJHK"
};
class Application extends React.Component {
   
  constructor(){
      super()
      this.state = {
          db : undefined,
          activeView : 'auth'
      }
     
  }
  openView = (view) => {
    this.setState({activeView : view})
  }
  componentDidMount(){
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    this.setState({db : db})
  }

  render() {
      return (
          <Router>
            <div className="app">
                <main>
                  {this.state.activeView == "auth" && <Auth openView={this.openView} db={this.state.db}/>}
                  {this.state.activeView == "questions" && <Questions openView={this.openView} db={this.state.db}/>}
                              
                </main>
              </div>
           </Router>
          
      );
  }
}
ReactDOM.render(<Application/>, document.getElementById('root'));
