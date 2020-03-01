import React from 'react';
import './App.css';

const generatorFunction = (chars, length = 8) => {
  return () => {
    const passwordArr = new Array(length);
    for (let i = 0; i < passwordArr.length; i++) {
      const randCharIndex = Math.floor(Math.random() * passwordArr.length);
      passwordArr[i] = chars[randCharIndex];
    }
    return passwordArr.join('');
  };
};

const PasswordInput = (props) => {
  return (
    <input
      type={props.visible ? 'text' : 'password'}
      name={props.name}
      value={props.value}
      onChange={props.onChange} />
  );
};

class PasswordGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false,
    };

    this.generatePassword = this.generatePassword.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  generatePassword() {
    this.setState({ password: this.props.generatorFunction() });
  }

  togglePasswordVisibility() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    return (
      <div>
        <PasswordInput visible={this.state.showPassword} name="password" value={this.state.password} onChange={this.generatePassword} />
        <input type="button" value="Generate Password" onClick={this.generatePassword} />
        <input
          type="button"
          value={!this.state.showPassword ? 'Show Password' : 'Hide Password'}
          onClick={this.togglePasswordVisibility}
        />
      </div>
    );
  }
};

export default function App() {
  return <PasswordGenerator
    generatorFunction={generatorFunction('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 12)}
  />
}
