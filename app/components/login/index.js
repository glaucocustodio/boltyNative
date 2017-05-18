import React, { Component } from 'react';
import { Container, Content, Item, Input, Button, Icon, View, Text, Form } from 'native-base';

export default class Login extends Component {
  loginPressed() {
    console.log("loginPressed")
  }

  render(){
    return (
      <Container>
        <View style={{flex: 1}}>
          <Content>
            <Form>
                <Item inlineLabel>
                  <Icon active name="person" />
                  <Input placeholder="E-mail"/>
                </Item>
                <Item inlineLabel last>
                  <Icon name="unlock" />
                  <Input placeholder="Password" secureTextEntry />
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
