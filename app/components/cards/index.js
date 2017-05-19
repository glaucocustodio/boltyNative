import React, { Component } from 'react';
import { Container, View, Content, Card, CardItem, Body, Text, Spinner } from 'native-base';
import { db } from '../../db'

export default class Cards extends Component {
  constructor(props) {
    super(props);
console.log(this.props.navigation.state.params.set)
    this.state = { items: [], showSpinner: true }
  }

  componentWillMount() {
    db.all("card", { set_id: this.props.navigation.state.params.set._id }).then((result) => {
      this.setState({ items: result.docs, showSpinner: false })
      console.log("total de cards:")
      console.log(result.docs.length)
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
            {
               this.state.items.map((item, index) => {
                 return (
                  <Card key={index}>
                    <CardItem header >
                      <Text>{item.front}</Text>
                    </CardItem>
                    <CardItem header>
                      <Text>{item.back}</Text>
                    </CardItem>
                  </Card>
                 )
               })
            }

          </Content>
        </View>
      </Container>
    )
  }
}
