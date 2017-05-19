import React, { Component } from 'react';
import { Container, View, Content, Card, CardItem, Body, Text, Spinner, List, ListItem } from 'native-base';
import { db } from '../../db'

export default class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [], showSpinner: true }
  }

  componentWillMount() {
    db.all("card", { set_id: this.props.navigation.state.params.set._id }).then((result) => {
      console.log("total de cards:")
      this.setState({ items: result.docs, showSpinner: false })
    })
  }

  static navigationOptions = {
    title: 'Cards',
  }

  render(){
    return (
      <Container>
        <View style={{flex: 1}}>
          <Content>
            {this.state.showSpinner && (<Spinner color='blue'/>)}
            <List dataArray={this.state.items}
                renderRow={(item) =>
                  <ListItem>
                      <Card>
                        <CardItem header >
                          <Text>{item.front}</Text>
                        </CardItem>
                        <CardItem header>
                          <Text>{item.back}</Text>
                        </CardItem>
                      </Card>
                  </ListItem>
                }>
            </List>

          </Content>
        </View>
      </Container>
    )
  }
}
