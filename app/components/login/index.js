import React, { Component } from 'react';
import { Container, Content, Item, Input, Button, Icon, View, Text, Form } from 'native-base';
import { db } from '../../db'
import { Alert } from 'react-native';

export default class Login extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {
    this.setState({email: "foo", password: "123"});
  }

  static navigationOptions = {
    title: 'Login',
  }

  loginPressed = () => {
    if(this.state && this.state.email && this.state.password){

      db.loginUser(
        { username: this.state.email, password: this.state.password },
        (err, response) => {
          Alert.alert("Sorry", err.message)
        },
        (response) => {
          console.log(response)
          this.props.navigation.navigate('Sets');
        }
      )
    }
  };

  render(){
    return (
      <Container>
        <View style={{flex: 1}}>
          <Content>
            <Form>
                <Item inlineLabel>
                  <Icon active name="person" />
                  <Input placeholder="E-mail" onChangeText={(email) => this.setState({email})} value={this.state.email}/>
                </Item>
                <Item inlineLabel last>
                  <Icon name="unlock" />
                  <Input placeholder="Password" secureTextEntry onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                </Item>
                <Button full onPress={this.loginPressed}>
                  <Text>Login</Text>
                </Button>
            </Form>
          </Content>
        </View>
      </Container>
    )
  }
}
