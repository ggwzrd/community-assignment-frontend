import React, { PureComponent, Fragment } from 'react'
import TextField from 'material-ui/TextField'
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControl } from 'material-ui/Form'
import Avatar from 'material-ui/Avatar'

class TrustForm extends PureComponent {
  render() {
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
                onChange={this.props.handleChange('source_id')}
              >
              {this.props.sources.map(source =>
                <Fragment>
                  <Avatar src={source.logo} />
                  <Radio
                    style={{display: 'block'}}
                    checked={this.props.sourceIdState === source.id}
                    onChange={this.props.handleChange('source_id')}
                    value={source.id}
                    name={source.name}
                    aria-label="A"
                    />
                </Fragment>
              )}
              </RadioGroup>
            </FormControl>
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

 export default TrustForm;