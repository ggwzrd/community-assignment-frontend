import React, { PureComponent, Fragment } from 'react'
import TextField from 'material-ui/TextField'
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControl } from 'material-ui/Form'
import Avatar from 'material-ui/Avatar'
import '../styles/TrustForm.css'


class TrustForm extends PureComponent {
  state = {
    link: [],
    screenshot: []
  }

  addLinkField = () => {
    this.setState({ link: ['link'] })
  }

  addScreenshotField = () => {
    this.setState({ screenshot: ['screenshot'] })
  }

  handleRemoveShareholder = (idx) => () => {
    this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
  }

  render() {
    return (
      <CardContent className="card-form" >
        <Typography type="title" >
          Trust this post
        </Typography>
        <FormControl component="fieldset" required>
          <div className="sources">
            {this.props.sources.map(source =>
              <div className="source-buttons" onClick={this.addLinkField} style={{ borderRadius: '50%', overflow: 'hidden', background: `url(${source.logo})`, backgroundSize: "70% 70%", backgroundRepeat: "no-repeat", backgroundPosition: "center center"}}>
              </div>
            )}
          </div>
        </FormControl>
        <div>
          {this.state.link.map(link =>
            <TextField
              onChange={this.props.handleChange('link')}
              autoFocus
              margin="dense"
              id="link"
              label="Link"
              type="link"
              fullWidth
            />
          )}
        </div>
        <div>
          <button type="button" onClick={this.addScreenshotField} className="small">Add Link</button>
            {this.state.screenshot.map(screenshot =>
              <TextField
                onChange={this.props.handleChange('screenshot')}
                autoFocus
                margin="dense"
                id="screenshot"
                label="Screenshot"
                type="screenshot"
                fullWidth
              />
          )}
        </div>
        <Button onClick={this.props.setReportState} color="default">Cancel</Button>
        <Button onClick={this.props.handleTrustClick} color="primary">Trust</Button>
      </CardContent>
     )
   }
 }

 // <RadioGroup
 //   aria-label="source"
 //   name="source"
 //   row={true}
 //   onChange={this.props.handleChange('source_id')}>
 //   {this.props.sources.map(source =>
 //     <Fragment>
 //       <Avatar src={source.logo} />
 //       <Radio
 //         style={{display: 'block'}}
 //         checked={this.props.sourceIdState === source.id}
 //         onChange={this.props.handleChange('source_id')}
 //         value={source.id}
 //         name={source.name}
 //         aria-label="A"
 //         />
 //     </Fragment>
 //   )}
 // </RadioGroup>

 export default TrustForm
