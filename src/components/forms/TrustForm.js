import React, { PureComponent, Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import Avatar from 'material-ui/Avatar'

const TrustForm = props => {
  const {  } = props;
  return (
    <CardContent className="card-form" >
      <Typography type="title" >
        Trust this post
      </Typography>
      <FormControl component="fieldset" required>

            <RadioGroup
              aria-label="source"
              name="source"
              row={true}
              onChange={props.handleChange('source_id')}
            >
            {props.sources.map(source =>
              <Fragment>
                <Avatar src={source.logo} />
                <Radio
                  style={{display: 'block'}}
                  checked={props.sourceIdState === source.id}
                  onChange={props.handleChange('source_id')}
                  value={source.id}
                  name={source.name}
                  aria-label="A"
                  />
              </Fragment>
            )}
            </RadioGroup>
          </FormControl>
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

 export default TrustForm;
