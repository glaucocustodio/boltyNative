import React, { Component } from 'react';
import { Container, View, Header, Content, Card, CardItem, Body, Item, Icon, Input, Button, Text, Spinner, List, ListItem } from 'native-base';
import { db } from '../../db'
import _ from 'lodash';

export default class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [], showSpinner: true }

    this.onChangeTextDelayed = _.debounce((text) => {
      this.searchTermChanged(text, this);
    }, 400);
  }

  componentWillMount() {
    db.all("card", { set_id: this.props.navigation.state.params.set._id }).then((result) => {
      console.log("total de cards:")
      this.setState({ items: result.docs, showSpinner: false })
    })
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Cards of ${navigation.state.params.set.name}`,
  });

  searchTermChanged(text, that){
    that.setState({ showSpinner: true, items: [] })

    db.all("card", {
      set_id: that.props.navigation.state.params.set._id,
      $or: [
        { front: { $regex: `.*?${text}.*?` } },
        { back: { $regex: `.*?${text}.*?` } }
      ]
    }).then((result) => {
      that.setState({ items: result.docs, showSpinner: false })
    })
  }

  render(){
    return (
      <Container>
        <View style={{flex: 1}}>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" onChangeText={this.onChangeTextDelayed} />
            </Item>
          </Header>
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
