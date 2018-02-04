import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';

// material-ui styles
import { withStyles, } from 'material-ui/styles';

const styles = theme => ({
  root: {
    position: 'relative',
    margin: '2px auto',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '100%',

    '&:hover': { backgroundColor: 'rgba(0,0,0, .1)', },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: '100%',
  },
  rounded: {
    display: 'inline-block',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexWrap: 'wrap',
    borderRadius: '15px',
    padding: '5px 10px',
    boxShadow: 'none',

    '&.comment': { backgroundColor: 'rgba(252, 216, 53, 0.5)', },
    '&.trust': { backgroundColor: 'rgba(30, 162, 8, 0.5)', },
    '&.report': { backgroundColor: 'rgba(194, 13, 13, 0.5)', }
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  badge: {
   margin: `0 ${theme.spacing.unit * 2}px`,
  },

  img: {
    objectFit: 'contain',
    padding: '2px',
  },
});


class Comment extends React.Component {
  render() {
    const { classes, avatar, type, content, actions, source, } = this.props;

    return (
      <Card classes= {{
        root: classes.root,
      }}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Badge className={classes.badge} badgeContent={50} color="primary">
              <Avatar src={avatar} />
            </Badge>
            {source ? <Tooltip title={source.name} placement="right">
              <Avatar src={source.logo} style={{ padding: '5px', }} classes={{ img: classes.img, }}/>
            </Tooltip> : null}

            <Paper className={type} classes={{
              rounded: classes.rounded,
            }}>
              {content}
            </Paper>
          </CardContent>
          <div className={classes.controls}>
            {actions}
          </div>
        </div>
      </Card>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  commentedAt: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  actions: PropTypes.node,
  source: PropTypes.object,
}

export default withStyles(styles, { withTheme: true, })(Comment);
