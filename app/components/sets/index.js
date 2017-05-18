import React, { Component } from 'react';
import { Container, View, Content, List, ListItem, Text, Spinner } from 'native-base';
import { db } from '../../db'

export default class Sets extends Component {
  constructor(props) {
    super(props);

    //this.setState({ items: [] });
    this.state = { items: [], showSpinner: true }
  }

  componentWillMount() {
    db.all("set", { user_id: db.currentUser._id }).then((result) => {
      this.setState({ items: result.docs, showSpinner: false })
    })
  }

  static navigationOptions = {
    title: 'Sets',
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
