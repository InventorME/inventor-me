import React, { Component } from 'react';
import './SignInPage.css';
// import ProfileBox from '../images/profile-box.png';
import ToastMessage from '../components/toastMessage/ToastMessage';
import { Auth } from 'aws-amplify';



class SignInPage extends Component{

    constructor(props) {
        super(props);
        this.state = { response: '', post: '', email: '', password: '', loading: false };
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.submit = this.submit.bind(this);
        this.toast = React.createRef();
      }
      
      async componentDidMount() {

        try{
          await Auth.currentSession();
          // console.log('user found!');
          window.location.href="/items-page";
        }
        catch(error){
          console.log('could not find user :(', error);
        }

        // const { getSession } = this.context;
        // getSession()
        // .then(session => {
        //   console.log('Signed In:', "user found");
        //   console.log('Session:', session);
        //   window.location.href="/items-page";
        // }).catch(err => {
        //   console.log('err:', "no user found");
        // });
      }

      setEmail(event){
        this.setState({ email: event.target.value});
        event.preventDefault();
      }
      setPassword(event){
        this.setState({ password: event.target.value});
        event.preventDefault();
      }
      validateUser(event){
        if(this.state.email === "")
          this.toastMessage("Error: Please Type Email");
        else if(this.state.password === "")
          this.toastMessage("Error: Please Type Password");
        else
          this.submit();
      };

      submit = async () =>{
        this.setState({ loading: true})
        try{
          const user = await Auth.signIn(this.state.email, this.state.password);
          console.log('Logged in!', user);
          window.location.href="/items-page";
        }catch(error){
          // console.log(error);
          this.setState({ loading: false});
          alert("Sign In Error", "Please Make Sure Account Is Confirmed. Please Check Email or Password Are Correct");
        }



        // const { authenticate } = this.context;
        // authenticate(this.state.email, this.state.password)
        //   .then(data =>{
        //     window.location.href="/items-page";
        //   })
        //   .catch(err =>{
        //     this.setState({ loading: false})
        //     this.toastMessage('Error: Password or Email is incorrect');
        //   })
      };

      toastMessage = (message) => {
        this.toast.current.openToast(message);
      };


   render(){
       return(
    <div class="signin-title">
      { this.state.loading ?
      <div className="loading-container-sign"> <div className="form-load-symbol-sign"/></div>
      : null }
    <div class="signin-inventor-title">
    <h2>InventorME</h2>
    </div>
    <ToastMessage ref={this.toast}/>
    <div  class="login-box">
    {/* <img class = "lbox"img style = {this.state.style} src={ProfileBox} alt=""/> */}
    <p class ="Password"> Password: </p>
    <input type="password"
      input className = "password" 
      value={this.state.password} 
      onChange={this.setPassword}/>
    <p class ="Email"> Email: </p>
    <input type="text" 
     input className = "email" 
     value={this.state.email} 
     onChange={this.setEmail}/>
        <button class="login-account" onClick={this.validateUser}>Log in</button>
        <p class ="or-message"> Don't have an account?</p>
        <button class="create-account" onClick={event =>  window.location.href="/createacct-page"}>Create an Account</button>
      </div>
      </div>      
       );
  }
}
   
    
export default SignInPage;