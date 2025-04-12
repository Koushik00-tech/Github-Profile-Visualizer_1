import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Languages from '../Languages'
import Contributors from '../Contributors'
import Piechart from '../Piechart'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RepositoryItemDetails extends Component {
  state = {
    repositoryItemDetailsList: {},
    apiStatus: apiStatusConstants.initial,
    isValidUser: true, // To handle the case of invalid or empty username
  }

  componentDidMount() {
    const {username} = this.props
    if (username) {
      this.getGitHubUserRepositoryItemDetails()
    } else {
      this.setState({isValidUser: false})
    }
  }

  getGitHubUserRepositoryItemDetails = async () => {
    const {username, repoName} = this.props

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=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`
    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = {
          name: data.name,
          description: data.description,
          languages: data.lanuages,
          stargazersCount: data.stargazers_count,
          forksCount: data.forks_count,
          commitsCount: data.network_count,
          issuesCount: data.open_issues_count,
          contributors: data.contributors.map(contributor =>
            this.getContributors(contributor),
          ),
          owner: this.getOwner(data.owner),
          watchersCount: data.watchers_count,
        }
        this.setState({
          repositoryItemDetailsList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getContributors = contributor => ({
    avatarUrl: contributor.avatar_url,
    contribution: contributor.contribution,
    eventsUrl: contributor.events_url,
    followersUrl: contributor.followers_url,
    followingUrl: contributor.following_url,
    gistsUrl: contributor.gists_url,
    gravatarId: contributor.gravatar_id,
    htmlUrl: contributor.html_url,
    id: contributor.id,
    login: contributor.login,
    nodeId: contributor.node_id,
    organizationsUrl: contributor.organizations_url,
    receivedEventsUrl: contributor.received_events_url,
    reposUrl: contributor.repos_url,
    siteAdmin: contributor.site_admin,
    starredUrl: contributor.starred_url,
    subscriptionsUrl: contributor.subscriptions_url,
    type: contributor.type,
    url: contributor.url,
  })

  getOwner = owner => ({
    avatarUrl: owner.avatar_url,
    eventsUrl: owner.events_url,
    followersUrl: owner.followers_url,
    followingUrl: owner.following_url,
    gistsUrl: owner.gists_url,
    gravatarId: owner.gravatar_id,
    htmlUrl: owner.html_url,
    id: owner.id,
    login: owner.login,
    nodeId: owner.node_id,
    organizationsUrl: owner.organizations_url,
    receivedEventsUrl: owner.received_events_url,
    reposUrl: owner.repos_url,
    siteAdmin: owner.site_admin,
    starredUrl: owner.starred_url,
    subscriptionsUrl: owner.subscriptions_url,
    type: owner.type,
    url: owner.url,
  })

  onClickTryAgain = () => {
    this.getGitHubUserRepositoryItemDetails()
  }

  renderFailureView = () => (
    <div className="repositoryFailureContainer">
      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718604995/Group_7522_f4ueqy.png"
        alt="failure view"
        className="error-view"
      />
      <p className="errorName">Something went wrong. Please try again</p>
      <button
        className="tryButton"
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )

  renderNoDataView = () => (
    <div className="noDataFoundContainer">
      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718949987/Repository-NoDataFound-2x_dzw1h2.png"
        alt="empty repositories"
        className="repo-no-data-img"
      />
      <h1 className="repo-no-data-heading">No Data Found</h1>
      <p className="repo-no-data-desc">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
    </div>
  )

  renderLoaderView = () => (
    <div className="repository-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderGitRepositoryItemDetails = () => {
    const {apiStatus, isValidUser} = this.state

    if (!isValidUser) {
      return this.renderNoDataView()
    }

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItemSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderRepositoryItemSuccessView = () => {
    const {repositoryItemDetailsList} = this.state
    const {
      name,
      description,
      languages,
      forksCount,
      stargazersCount,
      watchersCount,
      issuesCount,
      contributors,
      owner,
    } = repositoryItemDetailsList
    const {avatarUrl, login} = owner

    return (
      <div data-testid="repoItem" className="repo-item">
        <div className="repoItemDetailsContainer">
          <div className="repositoryItemContainer1">
            <div className="repoHeaderContainer">
              <h1 className="repoItemHeading">{name}</h1>
              <img src={avatarUrl} alt={login} className="repoAvatarUrl" />
            </div>

            <p className="repoItemDesc">{description}</p>
            <div className="languagesListContainer">
              {languages.map(eachLanguage => (
                <Languages
                  key={eachLanguage.value}
                  languageDetails={eachLanguage}
                />
              ))}
            </div>
            <div className="repoCountContainer">
              <div className="starContainer">
                <img
                  src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Star_-_16px.1_cpjsj4.png"
                  alt="star"
                  className="start-image"
                />
                <p className="repoItemStar">{stargazersCount}</p>
              </div>
              <div className="forksContainer">
                <img
                  src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Git_3_w5zp4b.png"
                  alt="git"
                  className="git-image"
                />
                <p className="repoItemForks">{forksCount} </p>
              </div>
            </div>
            <div className="commit-issues-count-container">
              <div className="repo-item-counts-container">
                <p className="repo-item-count-heading">Watchers Counts</p>
                <p className="repo-item-counts">{watchersCount}</p>
              </div>
              <div className="repo-item-counts-container">
                <p className="repo-item-count-heading">Issues Counts</p>
                <p className="repo-item-counts">{issuesCount}</p>
              </div>
            </div>
            <div className="contributors-container">
              <h1 className="contributors-heading">Contributors :</h1>
              <p className="contributors-desc">{contributors.length} Members</p>
              <div className="contributors-images-container">
                {contributors.map(eachContributor => (
                  <Contributors
                    contributorDetails={eachContributor}
                    key={eachContributor.id}
                  />
                ))}
              </div>
            </div>
            <div className="pieChart-container">
              <h1 className="pieChart-language-heading">Languages :</h1>
              <Piechart pieLanguages={languages} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="repositoriesContainer">
          {this.renderGitRepositoryItemDetails()}
        </div>
      </>
    )
  }
}

export default RepositoryItemDetails
