import React, { PureComponent, Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'




const ReportForm = props => {
  const {  } = props;
  return (
    <CardContent className="card-form" >
      <Typography type="title" >
        Report this post
      </Typography>
           <TextField
             onChange={props.handleChange('reason')}
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
             onChange={props.handleChange('link')}
             autoFocus
             margin="dense"
             id="link"
             label="Link"
             type="link"
             fullWidth
           />
           <TextField
             onChange={props.handleChange('screenshot')}
             autoFocus
             margin="dense"
             id="screenshot"
             label="Screenshot"
             type="screenshot"
             fullWidth
           />
         <Button onClick={props.setReportState} color="default">
             Cancel
           </Button>
           <Button onClick={props.handleReportClick} color="primary">
             Report
           </Button>

         </CardContent>
   );
 };

 export default ReportForm;
