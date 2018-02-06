import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchOnePost, fetchSources } from '../actions/posts/fetch'
import { reportPost } from '../actions/posts/report'
import { trustPost } from '../actions/posts/trust'

import ReportForm from '../components/forms/ReportForm'
import TrustForm from '../components/forms/TrustForm'

import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge'
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser'
import ReportIcon from 'material-ui-icons/Report'
import Tooltip from 'material-ui/Tooltip'

import './styles/PostPage.css'

export const postShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  is_spam: PropTypes.bool,
  trusts: PropTypes.array,
  reports: PropTypes.array
})

class PostPage extends PureComponent {

  static propTypes = {
    ...postShape.isRequired,
  }

  componentWillMount() {
    this.props.fetchOnePost(this.props.postId)
    this.props.fetchSources()
  }

  state = {
    open: false,
    user_id: "1",
    trustFormIsOpen: false,
    reportFormIsOpen: false,
    reportReason: '',
    trustReason: '',
    trustLink: '',
    trustScreenshot: '',
    source_id: ''
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  setTrustState = () => {
    this.state.reportFormIsOpen && this.setState({ reportFormIsOpen: false})
    this.setState({ trustFormIsOpen: !this.state.trustFormIsOpen })
  }

  setReportState = () => {
    this.state.trustFormIsOpen && this.setState({ trustFormIsOpen: false})
    this.setState({ reportFormIsOpen: !this.state.reportFormIsOpen })
  }

  validateReportReason() {
    const reason = this.state.reportReason

    if (reason.length > 1) {
      this.setState({
        reportError: null
      })

      return true
    }

    this.setState({
      reportError: `You can't report a post without a reason`
    })

    return false
  }

  handleReportClick = () => {
    if (this.validateReportReason()) {
      const postId = this.props.selectedPost.id

      const newReport = {
        reason: this.state.reportReason,
        link: this.state.link,
        screenshot: this.state.reportScreenshot || null,
        user_id: this.state.user_id,
        post_id: postId
      }

      this.props.reportPost(newReport)
      this.setReportState()
    }

    return false
  }

  validateTrust() {
    const reason = this.state.trustReason
    const link = this.state.trustLink

    if (reason.length > 1 && link.length > 1) {
      this.setState({
        reportError: null
      })

      return true
    }

    if (reason.length <= 1) {
      this.setState({
        trustReasonError: `You can't trust a post without a reason`
      })
      return false
    }

    if (link.length <= 1) {
      this.setState({
        trustLinkError: `You can't trust a post without a link`
      })

      return false
    }
  }

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value
   })
  }

  getSource = event => {
    const sourceId = event.target.getAttribute('data-id')

    this.setState({
      source_id: sourceId
    })
  }

  handleTrustClick = () => {
    if (this.validateTrust()) {
      const postId = this.props.selectedPost.id

      const newTrust = {
        source_id: this.state.source_id,
        comment: this.state.trustReason,
        link: this.state.link,
        screenshot: this.state.trustScreenshot,
        user_id: this.state.user_id,
        post_id: postId
      }

      this.props.trustPost(newTrust)
      this.setTrustState()
    }

    return false
  }

  render() {
    if (!!this.props.selectedPost) {
      var { content, trusts, reports, images, created_at } = this.props.selectedPost
    }

    const date = new Date(created_at).toLocaleString("UTC", { hour12: false,
                                                             year:   'numeric',
                                                             month:  'numeric',
                                                             day:    'numeric',
                                                             hour:   'numeric',
                                                             minute: 'numeric' })

    return (
      <Card className="expanded-post-item"  elevation={0}>
        <CardMedia
          className="expanded-cover"
          image={images}
          />
        <div className="expanded-details">

          <div className="formwrapper">
            {this.state.reportFormIsOpen ? <ReportForm
                                            handleChange={this.handleChange}
                                            setReportState={this.setReportState}
                                            reportError={this.state.reportError}
                                            handleReportClick={this.handleReportClick}/> : null}

            {this.state.trustFormIsOpen ? <TrustForm
                                            handleChange={this.handleChange}
                                            setTrustState={this.setTrustState}
                                            handleTrustClick={this.handleTrustClick}
                                            sources={this.props.sources}
                                            getSource={this.getSource}
                                            trustScreenshotError={this.state.trustScreenshotError}
                                            trustLinkError={this.state.trustLinkError}
                                            trustReasonError={this.state.trustReasonError}
                                            sourceIdState={this.state.source_id}/> : null}
          </div>

          <CardHeader className="expanded-card-header"
            title="Name Lastname"
            subheader={date}
            avatar={
              <Badge className="expanded-badge" badgeContent={100} color="default">
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
          />
          <CardContent className="expanded-content">
            <Typography type="body1" >{content}</Typography>
          </CardContent>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  selectedPost: state.posts.selectedPost,
  sources: state.sources,
  loading: state.loading,
  userTrustiness: state.posts.user
})

export default connect(mapStateToProps, { fetchOnePost, fetchSources, reportPost, trustPost })(PostPage)
