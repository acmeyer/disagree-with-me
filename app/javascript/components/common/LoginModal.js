import React from 'react';
import AppModal from './AppModal';
import { AppToaster }  from './AppToaster';
import { Button, Spinner } from "@blueprintjs/core";

import {
  loginWithEmail,
  hideLoginModal,
  sendResetPasswordEmail,
  signupWithEmail,
  showConfirmEmailModal,
  loginWithAuthProvider,
} from '../../actions';
import {connect} from 'react-redux';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loginOption: 'social',
      email: '',
      password: '',
      passwordConfirmation: '',
      view: this.props.view,
    }
  }

  close = () => {
    this.setState({
      loading: false,
      loginOption: 'social',
      email: '',
      password: '',
      passwordConfirmation: '',
      view: '',
    });
    this.props.dispatch(hideLoginModal());
  }

  handleChangeView = (newView) => {
    this.setState({
      view: newView,
      password: '',
      passwordConfirmation: '',
      loading: false,
    });
  }

  handleChangeLoginOption = (option) => {
    if (this.state.loading) {
      return;
    }
  
    this.setState({
      loginOption: option,
      password: '',
      passwordConfirmation: '',
      loading: false,
    });
  }

  handleSubmit = () => {
    if (this.state.view === 'reset_password') {
      this.resetPassword();
    } else if (this.state.view === 'signup') {
      this.signup();
    } else {
      this.login();
    }
  }

  handleSocialLogin = (social) => {
    this.setState({loading: true});
    this.props.dispatch(loginWithAuthProvider(social)).then(() => {
      this.setState({loading: false});
      this.close();
      AppToaster.show({ message: 'Logged in successfully!', intent: "success", icon: "tick" });
    }).catch(err => {
      console.log('couldnt sign in', err);
      this.setState({loading: false});
    });
  }

  resetPassword = () => {
    if (this.state.email === '') {
      AppToaster.show({ message: 'Email is required', intent: "danger", icon: "error" });
      return;
    }
    this.setState({loading: true});
    this.props.dispatch(sendResetPasswordEmail(this.state.email, this.state.password)).then(() => {
      this.close();
      AppToaster.show({ message: "Reset password email sent!", intent: "success", icon: "tick" });
    }).catch(error => {
      this.setState({loading: false});
      AppToaster.show({ message: error, intent: "danger", icon: "error" });
    });
  }

  signup = () => {
    if (this.state.email === '') {
      AppToaster.show({ message: 'Email is required', intent: "danger", icon: "error" });
      return;
    }
    if (this.state.password === '') {
      AppToaster.show({ message: 'Password is required', intent: "danger", icon: "error" });
      return;
    }
    if (this.state.passwordConfirmation === '') {
      AppToaster.show({ message: 'Confirm Password is required', intent: "danger", icon: "error" });
      return;
    }
    this.setState({loading: true});
    const data = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation,
    }
    this.props.dispatch(signupWithEmail(data)).then((user) => {
      this.close();
      AppToaster.show({ message: "Welcome, thanks for signing up!", intent: "success", icon: "tick" });
    }).catch(error => {
      if (error === 'email_confirmation') {
        this.props.dispatch(showConfirmEmailModal('signup', this.state.email));
        this.close();
      } else {
        this.setState({loading: false});
        AppToaster.show({ message: error, intent: "danger", icon: "error" });
      }
    });
  }

  login = () => {
    if (this.state.email === '') {
      AppToaster.show({ message: 'Email is required', intent: "danger", icon: "error" });
      return;
    }
    if (this.state.password === '') {
      AppToaster.show({ message: 'Password is required', intent: "danger", icon: "error" });
      return;
    }
    this.setState({loading: true});
    this.props.dispatch(loginWithEmail(this.state.email, this.state.password)).then(() => {
      this.close();
    }).catch(error => {
      if (error === 'email_confirmation') {
        this.props.dispatch(showConfirmEmailModal('login', this.state.email));
        this.close();
      } else {
        this.setState({loading: false});
        AppToaster.show({ message: error, intent: "danger", icon: "error" });
      }
    });
  }

  renderResetPasswordForm = () => {
    return (
      <div className="reset-password-form">
        <div className="form-group">
          <input 
            autoFocus={true}
            type="email" 
            className="form-control" 
            id="email-address" 
            aria-describedby="emailHelp" 
            autoComplete="username"
            placeholder="Email"
            onChange={(e) => this.setState({email: e.target.value})}
            onKeyDown={(e) => e.keyCode === 13 ? this.resetPassword() : null}
            value={this.state.email}
          />
        </div>
      </div>
    )
  }

  renderSignupForm = () => {
    return (
      <div className="signup-form">
        <div className="form-group">
          <input 
            autoFocus={true}
            type="email" 
            className="form-control" 
            id="email-address" 
            aria-describedby="emailHelp" 
            autoComplete="username"
            placeholder="Email"
            onChange={(e) => this.setState({email: e.target.value})}
            onKeyDown={(e) => e.keyCode === 13 ? this.signup() : null}
            value={this.state.email}
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Password" 
            autoComplete="new-password"
            onChange={(e) => this.setState({password: e.target.value})}
            onKeyDown={(e) => e.keyCode === 13 ? this.signup() : null}
            value={this.state.password}
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control" 
            id="password-confirmation" 
            autoComplete="new-password"
            placeholder="Confirm Password" 
            onChange={(e) => this.setState({passwordConfirmation: e.target.value})}
            onKeyDown={(e) => e.keyCode === 13 ? this.signup() : null}
            value={this.state.passwordConfirmation}
          />
        </div>
      </div>
    );
  }

  renderLoginForm = () => {
    return (
      <div className="login-form">
        <div className="form-group">
          <input 
            autoFocus={true}
            type="email" 
            className="form-control" 
            id="email-address" 
            aria-describedby="emailHelp" 
            placeholder="Email"
            autoComplete="username"
            onChange={(e) => this.setState({email: e.target.value})}
            onKeyDown={(e) => e.keyCode === 13 ? this.login() : null}
            value={this.state.email}
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            autoComplete="current-password"
            placeholder="Password" 
            onChange={(e) => this.setState({password: e.target.value})}
            onKeyDown={(e) => e.keyCode === 13 ? this.login() : null}
            value={this.state.password}
          />
          <div className="d-flex justify-content-end">
            <a className="small mt-2" href="#" onClick={() => this.handleChangeView('reset_password')}>Reset Password</a>
          </div>
        </div>
      </div>
    );
  }

  renderEmailLogin = () => {
    let form, title;
    if (this.state.view === 'reset_password') {
      form = this.renderResetPasswordForm();
      title = 'Reset Password';
    } else if (this.state.view === 'signup') {
      form = this.renderSignupForm();
      title = 'Sign Up';
    } else {
      form = this.renderLoginForm();
      title = 'Login';
    }
    
    return (
      <form onSubmit={() => this.handleSubmit()}>
        {form}
        <Button 
          disabled={this.state.loading} 
          loading={this.state.loading} 
          onClick={() => this.handleSubmit()}
          fill 
          intent="primary" 
          large
        >
          {title}
        </Button>
      </form>
    );
  }

  renderSocialLogins = () => {
    let {view} = this.state;
    return (
      <div className="signup-form d-flex flex-column align-items-center justify-content-between">
        <button disabled={this.state.loading} className="btn btn-block border d-flex justify-content-center align-items-center" onClick={() => this.handleSocialLogin('google')}>
          {this.state.loading ? <Spinner size="16" /> : (
            <span>
              <i className="icon-google-colored mr-2">
                <span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span>
              </i>
              {view === 'signup' ? 'Sign up' : 'Login'} with Google
            </span>
          )}
        </button>
        <button disabled={this.state.loading} className="btn btn-block border d-flex justify-content-center align-items-center" onClick={() => this.handleSocialLogin('facebook')}>
          {this.state.loading ? <Spinner size="16" /> : (
            <span>
              <i className="fab fa-facebook text-facebook-blue mr-2" />
              {view === 'signup' ? 'Sign up' : 'Login'} with Facebook
            </span>
          )}
        </button>
        <button disabled={this.state.loading} className="btn btn-block border d-flex justify-content-center align-items-center" onClick={() => this.handleChangeLoginOption('email')}>
          {this.state.loading ? <Spinner size="16" /> : (
            <span>
              <i className="far fa-envelope mr-2" />
              {view === 'signup' ? 'Sign up' : 'Login'} with Email
            </span>
          )}
        </button>
      </div>
    );
  }

  renderFooterLinks = () => {
    let content;
    let {view, loginOption} = this.state;

    if (loginOption === 'email') {
      content = (
        <div className="text-center">
          <a href="#" onClick={() => this.handleChangeLoginOption('social')}>
            &larr; Different {view === 'signup' ? 'sign up' : 'login'} options
          </a>
        </div>
      );
    } else {
      if (view === 'reset_password') {
        content = (
          <div className="text-center">
            <a href="#" onClick={() => this.handleChangeView('login')}>Remember it again? Login</a>
          </div>
        );
      } else if (view === 'signup') {
        content = (
          <div className="text-center">
            <a href="#" onClick={() => this.handleChangeView('login')}>Already have an account? Login</a>
          </div>
        );
      } else {
        content = (
          <div className="text-center">
            <a href="#" onClick={() => this.handleChangeView('signup')}>Need an account? Sign Up</a>
          </div>
        );
      }
    }

    return (
      <div className="footer-links">
        <hr/>
        {content} 
      </div>
    )
  }

  render() {
    let content, title, lead;
    let {visible} = this.props;

    if (this.state.view === 'reset_password') {
      title = 'Reset Password';
      lead = 'Enter your email below and we\'ll send you instructions on how to reset your password.';
    } else if (this.state.view === 'signup') {
      title = 'Sign Up';
      lead = 'Sign up to use Disagree with Me.';
    } else {
      title = 'Login';
      lead = 'Login to Disagree with Me to create, respond, upvote, and save posts.';
    }

    if (this.state.loginOption === 'email') {
      content = this.renderEmailLogin();
    } else {
      content = this.renderSocialLogins();
    }

    return (
      <AppModal shouldCloseOnOverlayClick={true} isOpen={visible} close={this.close} label={'Login'}>
        <div className="login-modal react-modal">
          <div className="dismiss-modal" onClick={this.close}><i className="fas fa-times" /></div>
          <h1 className="display-4 text-center">{title}</h1>
          <div>
            <p className="lead text-center">{lead}</p>
          </div>
          <hr />
          {content}
          {this.renderFooterLinks()}
        </div>
      </AppModal>
    );
  }
}

function select(store) {
  return {
    visible: store.loginModal.isVisible,
    view: store.loginModal.view,
  };
}

export default connect(select)(LoginModal);