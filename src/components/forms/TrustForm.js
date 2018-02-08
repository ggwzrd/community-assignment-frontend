import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Dropzone from 'react-dropzone'
import { uploadImage } from '../../actions/upload'

import TextField from 'material-ui/TextField'
import { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { FormControl } from 'material-ui/Form'

import '../styles/TrustForm.css'


class TrustForm extends PureComponent {

  state = {
    trustScreenshot: '',
  }

  onDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.props.uploadImage('trustScreenshot', files[0])
  }

  render() {
    return (
      <CardContent className="card-form">

        <Typography type="headline">Trust post</Typography>

        <FormControl component="fieldset" required>
            <div className="sources">
              {this.props.sources.map(source =>
                <div className="source-buttons"
                     data-id={source.id}
                     onClick={this.props.getSource}
                     style={{ background: `url(${source.logo})`,
                              backgroundSize: '70% 70%',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center center'
                     }}>
                </div>
              )}
            </div>
          </FormControl>

        <div className="trust-form">
          <div className="trust-fields">
            <TextField
              value={this.state.trustReason}
              onChange={this.props.handleChange('trustReason')}
              autoFocus
              margin="dense"
              id="reason"
              label="Why do you trust this post?"
              type="text"
              fullWidth
            />
            <p className="error">{this.props.trustReasonError}</p>

            <TextField
              value={this.state.trustLink}
              onChange={this.props.handleChange('trustLink')}
              margin="dense"
              id="link"
              label="Link"
              type="text"
              fullWidth
            />
            <p className="error">{this.props.trustLinkError}</p>
          </div>

          <Dropzone
            id="photo"
            multiple={false}
            accept="image/*"
            onDrop={this.onDrop.bind(this)}
            style={{border: "none"}}>
            <CardMedia
              className="cover"
              image={this.props.trustScreenshot || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
              />
          </Dropzone>
          <p className="error">{this.props.trustScreenshotError}</p>
        </div>

        <div className="trust-buttons">
          <Button onClick={this.props.setTrustState} color="default">Cancel</Button>
          <Button onClick={this.props.handleTrustClick} color="primary">Trust</Button>
        </div>

      </CardContent>
     )
   }
 }

 const mapStateToProps = state => ({
   trustScreenshot: state.posts.trustScreenshot
 })

 export default connect(mapStateToProps, { uploadImage })(TrustForm)
