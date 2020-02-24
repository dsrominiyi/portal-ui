import React, { FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';

import PasswordIcon from 'uikit-icons/lib/Lock';
import UserIcon from 'uikit-icons/lib/User';

import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Link from '../../components/Link';
import TextField from '../../components/TextField';

import Logo from '../../assets/images/logo-coversure.png';
import styles from './styles.scss';

interface State {
  email: string;
  password: string;
  rememberMe: boolean;
}

export class Login extends React.Component {
  public state: State = {
    email: '',
    password: '',
    rememberMe: false
  };

  private handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.location.assign('/dashboard');
  };

  private renderEmailField = () => (
    <TextField
      password={false}
      label="Email Address"
      value={this.state.email}
      icon={<UserIcon />}
      additionalClasses={[styles.textField]}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value });
      }}
    />
  );

  private renderPasswordField = () => {
    return (
      <TextField
        password
        label="Password"
        value={this.state.password}
        icon={<PasswordIcon />}
        additionalClasses={[styles.textField]}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          this.setState({ password: event.target.value });
        }}
      />
    );
  };

  private renderButton = () => {
    return (
      <Button
        label="Login"
        additionalClasses={[styles.loginButton]}
        onClick={(event: React.MouseEvent) => this.handleSubmit(event)}
        status={Status.Success}
      />
    );
  };

  private renderRememberMeCheckbox = () => (
    <Checkbox
      label="Remember me"
      checked={this.state.rememberMe}
      onChange={() => this.setState((prevState: State) => ({ rememberMe: !prevState.rememberMe }))}
    />
  );

  private renderforgottenPasswordLink = () => <Link label="Forgot password" href="/forgot" />;

  public render() {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.imageContainer} />
        <div className={styles.formGroup}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={Logo} alt="Coversure" />
          </div>
          <div className={styles.formField}>{this.renderEmailField()}</div>
          <div className={styles.formField}>{this.renderPasswordField()}</div>
          <div className={styles.formLinks}>
            <div className={[styles.formLinkContainer, styles.rememberMe].join(' ')}>
              {this.renderRememberMeCheckbox()}
            </div>
            <div className={[styles.formLinkContainer, styles.forgotPassword].join(' ')}>
              {this.renderforgottenPasswordLink()}
            </div>
          </div>
          <div className={styles.formLinks}>{this.renderButton()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (_state: CombinedState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
