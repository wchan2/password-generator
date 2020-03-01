import React from 'react';
import './App.css';

const generatorFunction = (chars, length = 8) => {
  return () => {
    const passwordArr = new Array(length);
    for (let i = 0; i < passwordArr.length; i++) {
      const randCharIndex = Math.floor(Math.random() * chars.length);
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

class PasswordRules extends React.Component {
  static rules = {
    uppercase: {
      chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      message: 'Include capital letters',
    },
    lowercase: {
      chars: 'abcdefghijklmnopqrstuvwxyz',
      message: 'Include lowercase letters',
    },
    numbers: {
      chars: '0123456789',
      message: 'Include numbers',
    },
    special: {
      chars: '!@#$%^&*()-_=+[]{}\\|/?<>,.?`~',
      message: 'Include special characters',
    },
  };

  static allChars() {
    return Object.keys(PasswordRules.rules).reduce((acc, ruleType) => acc + PasswordRules.rules[ruleType].chars, '');
  }

  constructor(props) {
    super(props);
    this.state = {};
    Object
      .keys(PasswordRules.rules)
      .forEach((ruleType) => this.state[ruleType] = true);
  }

  componentDidMount() {
    this.props.onChange(PasswordRules.allChars());
  }

  toggleChars(ruleType) {
    this.setState({ [ruleType]: !this.state[ruleType] }, () => {
      const chars = Object
        .keys(PasswordRules.rules)
        .filter((ruleType) => this.state[ruleType])
        .map((ruleType) => PasswordRules.rules[ruleType].chars)
        .join('');
      this.props.onChange(chars);
    });
  }

  render() {    
    return (
      <section>
        {
          Object.keys(PasswordRules.rules).map((ruleType, index) => {
            return (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    name={ruleType}
                    checked={this.state[ruleType]}
                    onChange={() => this.toggleChars(ruleType)}
                  />
                  {PasswordRules.rules[ruleType].message}
                </label>
              </div>
            );
          })
        }
      </section>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generatorFunction: generatorFunction(PasswordRules.allChars(), 12),
    };
    this.setPasswordRules = this.setPasswordRules.bind(this);
  }

  setPasswordRules(chars) {
    this.setState({
      generatorFunction: generatorFunction(chars, 12),
    });
  }

  render() {
    return (
      <div>
        <PasswordGenerator
          generatorFunction={this.state.generatorFunction}
        />
        <PasswordRules onChange={this.setPasswordRules} />
      </div>
    );
  }
}
