import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, List, ListItem, Text } from 'native-base';

import PouchDB from 'pouchdb-react-native'
//import PouchDB from 'pouchdb-core'
import find from 'pouchdb-find'
PouchDB.plugin(find)

let options = {
  skipSetup: true,
}

const db = new PouchDB("http://198.199.78.214:5984/bolty", options)
//const db = new PouchDB('myDB')

// react-native run-android
// react-native log-android

export default class setup extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [] }

    db.find({
      selector: { type: "card" },
      limit: 999
    }).then((result) => {
      this.setState({items: result.docs})
    })
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
              <Button transparent>
                  <Icon name='menu' />
              </Button>
          </Left>
          <Body>
              <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
            <List dataArray={this.state.items}
                renderRow={(item) =>
                    <ListItem>
                        <Text>{item.front}</Text>
                    </ListItem>
                }>
            </List>
        </Content>
        <Footer>
            <FooterTab>
                <Button full>
                    <Text>Footer</Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}
