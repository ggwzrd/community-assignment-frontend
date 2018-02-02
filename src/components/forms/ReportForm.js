import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'

class ReportForm extends PureComponent {
  render() {
    return (
      <CardContent className="card-form" >
        <Typography type="title" >
          Report this post
        </Typography>
             <TextField
               onChange={this.props.handleChange('reason')}
               autoFocus
               multiline={true}
               required={true}
               margin="dense"
               id="reason"
               label="Reason"
               type="email"
               fullWidth
             />
             <TextField
               onChange={this.props.handleChange('link')}
               autoFocus
               margin="dense"
               id="link"
               label="Link"
               type="link"
               fullWidth
             />
             <TextField
               onChange={this.props.handleChange('screenshot')}
               autoFocus
               margin="dense"
               id="screenshot"
               label="Screenshot"
               type="screenshot"
               fullWidth
             />
           <Button onClick={this.props.setReportState} color="default">
               Cancel
             </Button>
             <Button onClick={this.props.handleReportClick} color="primary">
               Report
             </Button>

           </CardContent>
     )
   }
 }

 export default ReportForm;
