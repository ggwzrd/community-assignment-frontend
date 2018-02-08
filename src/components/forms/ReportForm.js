import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Dropzone from 'react-dropzone'
import { uploadImage } from '../../actions/upload'

import TextField from 'material-ui/TextField'
import { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import '../styles/ReportForm.css'

class ReportForm extends PureComponent {

  state = {
    reportScreenshot: '',
  }

  onDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.props.uploadImage('reportScreenshot', files[0])
  }

  render() {
    return (
      <CardContent className="card-form" >
        <Typography type="headline">Report post</Typography>

        <div className="report-form">
          <div className="report-fields">
             <TextField
               onChange={this.props.handleChange('reportReason')}
               autoFocus
               multiline={true}
               required={true}
               margin="dense"
               id="reason"
               label="Reason"
               type="email"
               fullWidth
             />
             <div className="error">{this.props.reportError}</div>

             <TextField
               onChange={this.props.handleChange('reportLink')}
               margin="dense"
               id="link"
               label="Link"
               type="link"
               fullWidth
             />
           </div>

           <Dropzone
             id="photo"
             multiple={false}
             accept="image/*"
             onDrop={this.onDrop.bind(this)}
             style={{border: "none"}}>
             <CardMedia
               className="cover"
               image={this.props.reportScreenshot || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
             />
           </Dropzone>
       </div>

       <div className="report-buttons">
         <Button onClick={this.props.setReportState} color="default">Cancel</Button>
         <Button onClick={this.props.handleReportClick} color="primary">Report</Button>
       </div>
     </CardContent>
     )
   }
 }

 const mapStateToProps = state => ({
   reportScreenshot: state.posts.reportScreenshot
 })

 export default connect(mapStateToProps, { uploadImage })(ReportForm)
