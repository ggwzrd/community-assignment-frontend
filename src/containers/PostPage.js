import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// material-ui
import Dialog from 'material-ui/Dialog';
import { withStyles, } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge';
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser';
import ReportIcon from 'material-ui-icons/Report';
import Tooltip from 'material-ui/Tooltip';

// components
import ReportForm from '../components/forms/ReportForm';
import TrustForm from '../components/forms/TrustForm';
import Comment from '../components/Comment';

// actions
import { fetchOnePost, fetchSources } from '../actions/posts/fetch';
import { reportPost } from '../actions/posts/report';
import { trustPost } from '../actions/posts/trust';

// selectors
import { selectComments, } from '../selectors/select-comments';

// styles
import './styles/PostPage.css';

const styles = {
  root: {
    overflow: 'scroll',
    maxHeight: '100vh',
    alignItems: 'flex-start',
  },
  paper: {
    display: 'block',
    overflow: 'visible',
    maxHeight: 'none',
    // backgroundColor: 'transparent',
  },
  subheading: {
    color: '#cccccc',
    marginLeft: '16px',
    borderBottom: '1px solid #cccccc',
  }
};

export const postShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  is_spam: PropTypes.bool,
  // user: PropTypes.arrayOf(userShape),
  trusts: PropTypes.array,
  reports: PropTypes.array,
  comments: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    content: PropTypes.object,
    source: PropTypes.object,
    type: PropTypes.string,
  })).isRequired,
})

class PostPage extends PureComponent {
  static propTypes = {
    ...postShape.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.handlePostClose    = this.handlePostClose.bind(this);
    this.handleReportSubmit = this.handleReportSubmit.bind(this);
    this.handleTrustSubmit  = this.handleTrustSubmit.bind(this);
  }

  componentDidMount() {
    const { params, } = this.props.match;

    this.props.fetchOnePost(params.postId)
    this.props.fetchSources()
  }

  state = {
    open: false,
    user_id: "1",
    trustFormIsOpen: false,
    reportFormIsOpen: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handlePostClose() {
    const { history, } = this.props;

    history.push('/posts');
  }

  setTrustState = () => {
    this.state.reportFormIsOpen && this.setState({ reportFormIsOpen: false})
    this.setState({ trustFormIsOpen: !this.state.trustFormIsOpen })
  }

  setReportState = () => {
    this.state.trustFormIsOpen && this.setState({ trustFormIsOpen: false})
    this.setState({ reportFormIsOpen: !this.state.reportFormIsOpen })
  }

  handleReportSubmit = (newReport) => {
    const { user_id, } = this.state;
    const { reportPost, } = this.props;
    const post_id = this.props.id

    reportPost(Object.assign({}, newReport, { user_id, post_id, }));

    this.setReportState()
  }

  handleTrustSubmit = (newTrust) => {
    const { user_id, } = this.state;
    const { id, trustPost, } = this.props;
    const post_id = id;

    trustPost(Object.assign({}, newTrust, { user_id, post_id, }));

    this.setTrustState();
  }


  render() {
    const { reportFormIsOpen, trustFormIsOpen, } = this.state;
    const {
      classes,
      content,
      trusts,
      reports,
      images,
      created_at,
      comments,
      sources,
    } = this.props;

    const date = new Date(created_at).toLocaleString("UTC", { hour12: false,
                                                             year:   'numeric',
                                                             month:  'numeric',
                                                             day:    'numeric',
                                                             hour:   'numeric',
                                                             minute: 'numeric' })
    return (
      <Dialog
        open
        onClose={this.handlePostClose}
        aria-labelledby="form-dialog-title"
        classes={{
          root: classes.root,
          paper: classes.paper,
        }}
      >
        <Card className="expanded-post-item"  elevation={0}>
          <CardMedia
            className="expanded-cover"
            image={images}
            />
          <div className="expanded-details">

            <div className="formwrapper">
               <ReportForm
                open={reportFormIsOpen}
                handleClose={this.setReportState}
                handleReportSubmit={this.handleReportSubmit}/>

               <TrustForm
                open={trustFormIsOpen}
                handleClose={this.setTrustState}
                handleTrustSubmit={this.handleTrustSubmit}
                sources={sources}/>
            </div>



            <CardHeader className="expanded-card-header"
              avatar={
                <Badge className="expanded-badge" badgeContent={100} color="primary">
                <Avatar
                  alt="Remy Sharp"
                  src="https://cdn2.f-cdn.com/files/download/24619452/natural+background.png"
                  />
                </Badge>

              }
              action={
                <Fragment>
                <IconButton onClick={this.setTrustState}>
                  <Tooltip id="tooltip-top" title="Trust this post" placement="top" className="tooltip">
                    <Badge className="badge trust" badgeContent={!!trusts ? trusts.length : 0} color="default">
                      <VerifiedUserIcon fontSize="true"/>
                    </Badge>
                </Tooltip>

                </IconButton>
                <IconButton onClick={this.setReportState}>
                  <Tooltip id="tooltip-top" title="Report this post" placement="top" className="tooltip">
                    <Badge className="badge report" badgeContent={!!reports ? reports.length : 0} color="default">
                      <ReportIcon fontSize="true" className="badgeIcon"/>
                    </Badge>
                </Tooltip>

                </IconButton>
              </Fragment>
              }
              title="Name Lastname"
              subheader={date}
            />
            <CardContent className="expanded-content">

              <Typography type="body1" >
                {content}
              </Typography>
            </CardContent>
          </div>
        </Card>
        <Fragment>
          <Typography
            type="subheading"
            gutterBottom
            classes={{ subheading: classes.subheading, }}>Comments</Typography>
          {comments.map((comment, key) => (
            <Comment key={key} {...comment} />
          ))}
        </Fragment>
      </Dialog>
    )
  }
}

PostPage.defaultProps = {
  id: -1,
  content: 'Ops, I think we missed it.',
  trusts: [],
  reports: [],
  images: 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png',
  created_at: new Date(),
  updated_at: new Date(),
}

const mapStateToProps = state => ({
  id: state.posts.selectedPost.id,
  content: state.posts.selectedPost.content,
  comments: selectComments(state),
  trusts: state.posts.selectedPost.trusts,
  reports: state.posts.selectedPost.reports,
  images: state.posts.selectedPost.images,
  created_at: state.posts.selectedPost.created_at,
  sources: state.sources,
  loading: state.loading,
})

export default connect(mapStateToProps, { fetchOnePost, fetchSources, reportPost, trustPost })(withStyles(styles)(PostPage))
