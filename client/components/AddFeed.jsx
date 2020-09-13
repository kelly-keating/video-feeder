import React from 'react'
import { connect } from 'react-redux'

import { getChannelInfo, addGroup } from '../api'
import { saveOneGroup } from '../actions'


class AddFeed extends React.Component {

  state = {
    showModal: false,
    channelUrl: 'UC-7oMv6E4Uz2tF51w5Sj49w',
    data: null,
    loadingFeed: false,
    newGroupIsVisible: false,
    newGroup: '',
    currentGroup: 0,
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  showAddGroup = () => {
    this.setState({ newGroupIsVisible: true })
  }

  addNewGroup = () => {
    addGroup(this.state.newGroup)
    .then(id => {
        const newGroup = { name: this.state.newGroup, id }
        this.props.dispatch(saveOneGroup(newGroup))
        this.setState({ 
          newGroupIsVisible: false,
          newGroup: '',
          currentGroup: id
        })
      })
  }

  changeGroup = (evt) => {
    this.setState({ currentGroup: evt.target.value })
  }

  updateGroupText = (evt) => {
    this.setState({ newGroup: evt.target.value })
  }

  updateIdText = (evt) => {
    this.setState({ channelUrl: evt.target.value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.setState({ loadingFeed: true })
    getChannelInfo(this.state.channelUrl)
      .then(data => {
        this.setState({ 
          data,
          loadingFeed: false
        })
      })
  }

  renderInfo = () => {
    const {data} = this.state
    return (
      <>
      <div>
        <p>This is the feed for</p>
        <h2>{data.author}</h2>
      </div>
      <label className="label">Add feed to a group?</label>
      <div className="field is-grouped">
        <div className="control">
          <div className="select is-fullwidth">
            <select name="country" value={this.state.currentGroup} onChange={this.changeGroup}>
              {this.props.groups.map(g => <option value={g.id} key={g.id}>{g.name}</option>)}
            </select>
          </div>
        </div>
        {this.state.newGroupIsVisible && <p className="control is-expanded">
          <input className="input" type="text" 
            placeholder="New group name" 
            value={this.state.newGroup} 
            onChange={this.updateGroupText} 
          />
        </p>}
        <div className="control">
          {
            this.state.newGroupIsVisible ?
            <button className="button is-primary" onClick={this.addNewGroup}>+</button> :
            <button className="button is-primary" onClick={this.showAddGroup}>Add New Group</button>
          }
        </div>
      </div>
      </>
    )
  }

  renderForm = () => (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input className="input" type="text" 
          placeholder="Enter channel ID" 
          value={this.state.channelUrl} 
          onChange={this.updateIdText} 
        />
      </div>
      <div className="control">
        <div 
          className={"button is-primary" + (this.state.loadingFeed ? " is-loading" : "")} 
          onClick={this.handleSubmit} 
        >
          Search
        </div>
      </div>
    </div>
  )

  renderModal = () => (
    <div className="modal is-active">
      <div className="modal-background" onClick={this.closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add a new feed..</p>
          <button className="delete" onClick={this.closeModal} />
        </header>
        <section className="modal-card-body">
          {this.renderForm()}
          {this.state.data && this.renderInfo()}
        </section>
        <footer className="modal-card-foot footer-is-right">
          <button className="button is-primary" disabled={this.state.data ? false : true}>Save</button>
        </footer>
      </div>
    </div>
  )
 
  render() {
    return (
      <>
        <div className="container" >
          <p onClick={this.openModal}>Add Feed</p>
        </div>
        {this.state.showModal && this.renderModal()}
      </>
    )
  }
}

function reduxToProps(state) {
  return {
    groups: state.groups
  }
}

export default connect(reduxToProps)(AddFeed)
