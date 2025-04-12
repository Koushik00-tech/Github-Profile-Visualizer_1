import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoLocationOutline} from 'react-icons/io5'
import {IoMdLink} from 'react-icons/io'
import UsernameContext from '../../context/UsernameContext'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    profileDetails: [],
    apiStatus: apiStatusConstants.initial,
    errorMsg: '',
  }

  getGitHubUserProfileDetails = async username => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    // My Api_Token = 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
    const GitHubUserProfileUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=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`
    const options = {method: 'GET'}

    try {
      const response = await fetch(GitHubUserProfileUrl, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = {
          avatarUrl: data.avatar_url,
          bio: data.bio,
          blog: data.blog,
          company: data.company,
          createdAt: data.created_at,
          email: data.email,
          eventsUrl: data.events_url,
          followers: data.followers,
          followersUrl: data.followers_url,
          following: data.following,
          followingUrl: data.following_url,
          gistsUrl: data.gists_url,
          gravatarId: data.gravatar_id,
          hireable: data.hireable,
          htmlUrl: data.html_url,
          id: data.id,
          location: data.location,
          login: data.login,
          name: data.name,
          nodeId: data.node_id,
          organizationsUrl: data.organizations_url,
          publicGists: data.public_gists,
          publicRepos: data.public_repos,
          receivedEventsUrl: data.received_events_url,
          reposUrl: data.repos_url,
          siteAdmin: data.site_admin,
          starredUrl: data.starred_url,
          subscriptionsUrl: data.subscriptions_url,
          twitterUsername: data.twitter_username,
          type: data.type,
          updatedAt: data.updated_at,
          url: data.url,
        }
        this.setState({
          profileDetails: [updatedData],
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          errorMsg: 'Failed to fetch data.',
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      this.setState({
        errorMsg: 'Something went wrong. Please try again later.',
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickSearch = username => {
    if (username.trim() === '') {
      this.setState({
        errorMsg: 'Enter a valid GitHub username.',
        profileDetails: [],
        apiStatus: apiStatusConstants.initial,
      })
    } else {
      this.getGitHubUserProfileDetails(username)
    }
  }

  onClickTryAgain = () => {
    const {changeUserName} = this.context
    this.setState({
      apiStatus: apiStatusConstants.initial,
      errorMsg: '',
      profileDetails: [],
    })
    changeUserName('')
  }

  renderGithubDetailsOfProfile = () => {
    const {profileDetails} = this.state
    const object = profileDetails[0]
    const {
      avatarUrl,
      name,
      login,
      bio,
      blog,
      followers,
      following,
      publicRepos,
      company,
      location,
      organizationsUrl,
    } = object

    return (
      <div data-testid="repoItem" className="repo-item">
        <div className="profileDetailsContainer">
          <img src={avatarUrl} alt={name} className="avatar-url" />
          <p className="login">{login}</p>
          <h1 className="name">{name}</h1>
          <p className="bio">BIO</p>
          <p className="bio">{bio}</p>
          <p className="bio">Blog</p>
          <p className="bio">{blog}</p>
          <div className="followers-following-public-container">
            <div className="followers-container">
              <p className="followers">{followers}</p>
              <p className="followers-heading">FOLLOWERS</p>
            </div>
            <hr className="hor-line" />
            <div className="following-container">
              <p className="followers">{following}</p>
              <p className="followers-heading">FOLLOWING</p>
            </div>
            <hr className="hor-line" />
            <div className="pubic-repos-container">
              <p className="followers">{publicRepos}</p>
              <p className="followers-heading">PUBLIC REPOS</p>
            </div>
          </div>
          <div className="bottom-container">
            <div className="company-container">
              <p className="company-heading">Company</p>
              <div className="companyUrl">
                <RiBuildingLine className="icon-style" />
                <p className="company">{company}</p>
              </div>
            </div>
            <div className="company-container">
              <p className="company-heading">Location</p>
              <div className="companyUrl">
                <IoLocationOutline className="icon-style" />
                <p className="company">{location}</p>
              </div>
            </div>
            <div className="company-container">
              <h1 className="company-heading">Company Url</h1>
              <div className="companyUrl">
                <IoMdLink className="icon-style" />
                <a href={organizationsUrl} className="company">
                  {organizationsUrl}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureContainer">
      <h1 className="heading">GitHub Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718604995/Group_7522_f4ueqy.png"
        alt="failure view"
        className="error-view"
      />
      <p className="errorName">Something went wrong. Please try again.</p>
      <button
        className="tryButton"
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderContent = () => {
    const {errorMsg, apiStatus, profileDetails} = this.state
    if (errorMsg) {
      return (
        <>
          <p className="inputErrorMsg">{errorMsg}</p>
          {this.renderFailureView()}
        </>
      )
    }

    if (apiStatus === apiStatusConstants.inProgress) {
      return this.renderLoaderView()
    }

    if (profileDetails.length === 0) {
      return (
        <div className="github-container">
          <h1 className="heading">GitHub Profile Visualizer</h1>
          <img
            src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718599647/Group_21x-mobileview_iyuarb.png"
            alt="gitHub profile visualizer home page"
            className="homeImage"
          />
        </div>
      )
    }

    return this.renderGithubDetailsOfProfile()
  }

  render() {
    const {username, changeUserName} = this.context

    const onChangeUserName = event => {
      changeUserName(event.target.value)
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <div className="input-container">
            <input
              type="search"
              value={username}
              onChange={onChangeUserName}
              placeholder="Enter GitHub username"
              className="input-search-style"
            />
            <div className="search-icon-container">
              <button
                type="button"
                onClick={() => this.onClickSearch(username)}
                className="search-button"
                data-testid="searchButton"
                aria-label="Search GitHub username"
              >
                <HiOutlineSearch className="search-icon" />
              </button>
            </div>
          </div>
          {this.renderContent()}
        </div>
      </>
    )
  }
}

Home.contextType = UsernameContext

export default Home
