import React, { Component } from 'react';
import { Container, View, Content, List, ListItem, Text } from 'native-base';
import { db } from '../../db'

export default class Sets extends Component {
  constructor(props) {
    super(props);

    //this.setState({ items: [] });
    this.state = { items: [] }
  }

  componentWillMount() {
    db.all("set", { user_id: db.currentUser._id }).then((result) => {
      this.setState({ items: result.docs })
    })
  }

  static navigationOptions = {
    title: 'Set',
  }

  render(){
    return (
      <Container>
        <View style={{flex: 1}}>
          <Content>
            <List dataArray={this.state.items}
                renderRow={(item) =>
                    <ListItem>
                        <Text>{item.name}</Text>
                    </ListItem>
                }>
            </List>
          </Content>
        </View>
      </Container>
    )
  }
}
