import React, { Component } from 'react';
import { Container, View, Content, List, ListItem, Text, Spinner, Toast } from 'native-base';
import { db, syncHandler } from '../../db'

export default class Sets extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], showSpinner: true, showToast: false }
  }

  componentWillMount() {
    syncHandler.on('change', (_) => {
      // handle change
      if (this.state.showToast == false) {
        this.setState({ showToast: true })
      }
    }).on('paused', (_) => {
      // replication paused (e.g. replication up to date, user went offline)
      this.getSets()
    })

    this.getSets()
  }

  getSets(){
    db.all("set", { user_id: db.currentUser._id }).then((result) => {
      console.log("docs length: " + result.docs.length)
      if (result.docs.length > 0) {
        this.setState({ items: result.docs, showSpinner: false, showToast: false })
      }
    })
  }

  static navigationOptions = {
    title: 'Sets',
  }

  itemPressed(item){
    this.props.navigation.navigate('Cards', { set: item });
  }

  render(){
    return (
      <Container>
        <View style={{flex: 1}}>
          <Content>
            { this.state.showToast &&
              (
                Toast.show({
                  supportedOrientations: ['potrait','landscape'],
                  text: 'Synchronizing..',
                  position: 'bottom',
                  buttonText: 'OK'
                })
              )
            }
            {this.state.showSpinner && (<Spinner color='blue'/>)}
            <List dataArray={this.state.items}
                renderRow={(item) =>
                    <ListItem onPress={ () => { this.itemPressed(item) } }>
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
