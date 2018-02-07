// import React, { PureComponent } from 'react'
// import { connect } from 'react-redux'
//
// import TextField from 'material-ui/TextField'
// import Button from 'material-ui/Button'
// import { FormControl } from 'material-ui/Form'
//
// import '../styles/TrustForm.css'
//
// class TrustForm extends PureComponent {
//   render() {
//     return (
//         <Typography type="headline">Comment</Typography>
//           <TextField
//             onChange={this.props.handleChange('trustReason')}
//             autoFocus
//             margin="dense"
//             id="reason"
//             label="Why do you trust this post?"
//             type="text"
//             fullWidth
//           />
//           <p className="error">{this.props.trustReasonError}</p>
//           </div>
//
//           <Dropzone
//             id="photo"
//             multiple={false}
//             accept="image/*"
//             onDrop={this.onDrop.bind(this)}
//             style={{border: "none"}}>
//             <CardMedia
//               className="cover"
//               image={this.props.trustScreenshot || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
//               />
//           </Dropzone>
//           <p className="error">{this.props.trustScreenshotError}</p>
//         </div>
//
//         <div className="trust-buttons">
//           <Button onClick={this.props.setTrustState} color="default">Cancel</Button>
//           <Button onClick={this.props.handleTrustClick} color="primary">Trust</Button>
//         </div>
//
//       </CardContent>
//      )
//    }
//  }
//
//  const mapStateToProps = state => ({
//    trustScreenshot: state.posts.trustScreenshot
//  })
//
//  export default connect(mapStateToProps, { uploadImage })(TrustForm)
