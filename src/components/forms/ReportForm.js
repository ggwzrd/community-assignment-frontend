import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import request from 'superagent';

// material-ui
import TextField from 'material-ui/TextField'
import { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'

// constants
const CLOUDINARY_UPLOAD_PRESET = 'hhstyojs'
const CLOUDINARY_UPLOAD_URL = '	https://api.cloudinary.com/v1_1/dyyxiefx5/upload'

class ReportForm extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      reason: '',
      link: '',
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDrop            = this.onDrop.bind(this);
    this.handleSubmit      = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const input = event.target || event.currentTarget;
    const attr  = input.name;

    if (this.state[attr] === input.value) return;

    this.setState({
      [attr]: input.value,
    });
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

  handleSubmit = () => {
    const { handleReportSubmit, } = this.props;
    const { reason, link, } = this.state

    const newReport = {
      reason,
      link,
      screenshot: this.state.uploadedFileCloudinaryUrl,
    }

    handleReportSubmit(newReport);
  }

  render() {
    const { open, handleClose, } = this.props;

    return (
      <CardContent className={`card-form ${open ? 'open' : ''}`} >
        <Typography type="title" >
          Report this post
        </Typography>
        <div className="cols-2">
          <div>
            <TextField
              onBlur={this.handleInputChange}
              autoFocus
              multiline
              required
              rows={2}
              margin="dense"
              id="reason"
              name="reason"
              label="Why you want to report this post?"
              placeholder="Type here.."
              type="email"
              fullWidth
            />
            <TextField
              onBlur={this.handleInputChange}
              margin="dense"
              id="link"
              name="link"
              label="Where did you find this information?"
              placeholder="https://www.domain.com/information"
              type="link"
              fullWidth
            />
          </div>
          <Dropzone
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
        <Button onClick={handleClose} color="default">
         Cancel
        </Button>
        <Button onClick={this.handleSubmit} color="primary">
          Report
       </Button>
     </CardContent>
     )
   }
 }

 ReportForm.propTypes = {
   open: PropTypes.bool.isRequired,
   handleReportSubmit: PropTypes.func.isRequired,
   handleClose: PropTypes.func.isRequired,
 };

 export default ReportForm;
