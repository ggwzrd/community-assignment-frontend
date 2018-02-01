import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { createPost } from '../../actions/posts/create'
import '../styles/CreatePostForm.css'
import TextField from 'material-ui/TextField'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 60,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: 10,
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
  'Analisys',
  'News',
  'Technical',
  'Political',
  'Business',
  'Random',
  'Social'
]

export class CreatePostForm extends PureComponent {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

  state = {
    tag: [],
    images: "http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png"
  }

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value
   })
  }

  handleTagChange = event => {
    this.setState({ tag: event.target.value });
  }

  submitForm(event) {
    event.preventDefault()

    const newPost = this.state

    this.props.createPost(newPost)
  }

  // validateContent() {
  //   const { content } = this.state.content
  //
  //   if (content.getValue().length <= 500) {
  //     this.setState({
  //       contentError: null
  //     })
  //     return true
  //   }
  //
  //   this.setState({
  //     contentError: 'Max 500 characteres'
  //   })
  //   console.log('max 500 characteres')
  //   return false
  // }

  render() {
    const { classes } = this.props;

    return (
      <Card className="card" raised="false" elevation="0">
        <CardMedia
          className="cover"
          image='http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'
          />
        <div className="details">
          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-tags">Tags</InputLabel>
              <Select
                multiple
                value={this.state.tag}
                onChange={this.handleTagChange}
                input={<Input id="select-multiple-tags" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => <Chip key={value} label={value} className={classes.chip} style={{height: 20}}/>)}
                  </div>
                )}
                MenuProps={MenuProps}>
                {tags.map(tag => (
                  <MenuItem
                    key={tag}
                    value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <CardContent className="content">
            <form onSubmit={this.submitForm.bind(this)}>
              <div className="input-fields">
                <TextField
                   id="multiline-flex"
                   label="Your post here"
                   fullWidth="true"
                   multiline
                   rows="3"
                   margin="normal"
                   onChange={this.handleChange('content')}
                />
                <TextField
                   id="link"
                   label="Link"
                   margin="none"
                   fullWidth="true"
                   onChange={this.handleChange('link')}
                />
              </div>
              <div className="submit-button">
                <Button
                  size="small"
                  flat
                  color="secondary"
                  onClick={this.submitForm.bind(this)}>Submit</Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    )
  }
}

CreatePostForm = withStyles(styles, {name: 'CreatePostForm'})(CreatePostForm);
export default connect(null, {createPost})(CreatePostForm)
