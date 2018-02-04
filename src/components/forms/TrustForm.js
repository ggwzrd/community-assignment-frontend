import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Dropzone from 'react-dropzone';
import request from 'superagent'

// material-ui
import TextField from 'material-ui/TextField'
import { CardContent, CardMedia, } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'
import { FormControl } from 'material-ui/Form'
import Avatar from 'material-ui/Avatar'

// material-ui styles
import { withStyles, } from 'material-ui/styles';

import '../styles/TrustForm.css'

// constants
const CLOUDINARY_UPLOAD_PRESET = 'hhstyojs'
const CLOUDINARY_UPLOAD_URL = '	https://api.cloudinary.com/v1_1/dyyxiefx5/upload'

const styles = theme => ({
  avatar: {
    padding: '10px',
    margin: '5px',
    transition: '.3s',
    border: '1px solid #f5f8fa',

    '&:hover': { boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, .3)', },
    '&:active': {
      boxShadow: 'inset 0px 2px 5px 0px rgba(0, 0, 0, .3)',
      border: `1px solid ${theme.palette.primary.main}`
    },
    '&.selected': {
      boxShadow: 'inset 0px 2px 5px 0px rgba(0, 0, 0, .3)',
      border: `1px solid ${theme.palette.primary.main}`
    },
  },
  img: { objectFit: 'contain', },
});

class TrustForm extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      uploadedFileCloudinaryUrl: '',
      selectedSource: -1,
      comment: '',
      link: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDrop            = this.onDrop.bind(this);
    this.handleSubmit      = this.handleSubmit.bind(this);
  }

  handleSourceSelection = selection => () => {
    const { selectedSource, } = this.state;

    if (selectedSource === selection) return;

    this.setState({ selectedSource: selection, });
  }

  handleInputChange(event) {
    const input = event.target || event.currentTarget;
    const attr  = input.name;

    if (this.state[attr] === input.value) return;

    this.setState({
      [attr]: input.value,
    });
  }

  handleSubmit = () => {
    const { handleTrustSubmit, sources, } = this.props;
    const { selectedSource, comment, link, } = this.state

    const newTrust = {
      source_id: sources[selectedSource].id,
      comment,
      link,
      screenshot: this.state.uploadedFileCloudinaryUrl,
    }

    handleTrustSubmit(newTrust);
  }

  onDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.handleImageUpload(files[0])
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        })
      }
    })
  }

  render() {
    const { selectedSource, } = this.state;
    const { classes, sources, open, handleClose, } = this.props;

    return (
      <CardContent className={`card-form ${open ? 'open' : ''}`} >
        <Typography type="title" className="form-title" >
          Trust this post
        </Typography>
        <FormControl component="fieldset" required>
          <div className="sources">
            {sources.map((source, key) =>
              <Avatar
                key={key}
                src={source.logo}
                className={ClassNames(classes.avatar, selectedSource === key ? 'selected' : '')}
                classes={{
                img: classes.img,
                }}
                onClick={this.handleSourceSelection(key)}
              />
            )}
          </div>
        </FormControl>
        <div className="cols-2">
          <div>
            <TextField
              id="multiline-flex"
              autoFocus
              label="Why do you trust this post?"
              margin="dense"
              placeholder="Type here.."
              name="comment"
              disabled={selectedSource < 0}
              rows={2}
              multiline
              fullWidth
              onBlur={this.handleInputChange}
            />

            <TextField
              onBlur={this.handleInputChange}
              margin="dense"
              name="link"
              label="Where did you find this information?"
              placeholder="https://www.domain.com/information"
              type="link"
              disabled={selectedSource < 0}
              fullWidth
            />
          </div>
          <Dropzone
            disabled={selectedSource < 0}
            multiple={false}
            accept="image/*"
            onDrop={this.onDrop}
            style={{border: "none"}}>
            <CardMedia
              className="cover"
              image={this.state.uploadedFileCloudinaryUrl || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
              />
          </Dropzone>
        </div>

        <Button onClick={handleClose} color="default">Cancel</Button>
        <Button onClick={this.handleSubmit} disabled={selectedSource < 0} color="primary">Trust</Button>
      </CardContent>
     )
   }
 }

 TrustForm.propTypes = {
   open: PropTypes.bool.isRequired,
   sources: PropTypes.arrayOf(PropTypes.shape({
     logo: PropTypes.string.isRequired,
   })).isRequired,
   handleTrustSubmit: PropTypes.func.isRequired,
   handleClose: PropTypes.func.isRequired,
 };

 export default withStyles(styles, { withTheme: true, })(TrustForm);
