import React, { Component } from 'react';
import { Nav } from './stack_navigator';

export default class setup extends Component {
  render() {
    return (
      <Nav />
    )
  }
}
// import { db } from './db'

// react-native run-android
// react-native log-android

// export default class setup extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { items: [] }

//     db.all("card", {}).then((result) => {
//       this.setState({items: result.docs})
//     })
//   }

//   render() {
//     return (
//       <Login/>
//     )
//     // return (
//     //   <Container>
//     //     <Header>
//     //       <Left>
//     //           <Button transparent>
//     //               <Icon name='menu' />
//     //           </Button>
//     //       </Left>
//     //       <Body>
//     //           <Title>Header</Title>
//     //       </Body>
//     //       <Right />
//     //     </Header>
//     //     <Content>
//     //         <List dataArray={this.state.items}
//     //             renderRow={(item) =>
//     //                 <ListItem>
//     //                     <Text>{item.front}</Text>
//     //                 </ListItem>
//     //             }>
//     //         </List>
//     //     </Content>
//     //     <Footer>
//     //         <FooterTab>
//     //             <Button full>
//     //                 <Text>Footer</Text>
//     //             </Button>
//     //         </FooterTab>
//     //     </Footer>
//     //   </Container>
//     // );
//   }
// }
