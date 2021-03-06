// Modify selected event
// Typically seen in a modal
// Not limited to EventKind (Course or Global)

// Still a work in progess

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class UpdateEvent extends Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    desc: this.props.desc,
    eventKind: this.props.eventKind,
    date: this.props.date.split(".")[0],
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Update Event</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            type="text"
            value={this.state.name}
          />
          <select
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ eventKind: e.target.value })}
            placeholder="Type"
            value={this.state.eventKind}
          >
            <option value="GRADUATION">GRADUATION</option>
            <option value="ORIENTATION">ORIENATION</option>
            <option value="VACATION">VACATION</option>
            <option value="WORKSHOP">WORKSHOP</option>
            <option value="HOLIDAY">HOLIDAY</option>
            <option value="MEETUP">MEETUP</option>
            <option value="OPENHOUSE">OPENHOUSE</option>
            <option value="SHOWCASE">SHOWCASE</option>
          </select>
          <input
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ date: e.target.value })}
            placeholder="Date"
            type="datetime-local"
            value={this.state.date}
          />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            onChange={e => this.setState({ desc: e.target.value })}
            placeholder="Description"
            rows={8}
            value={this.state.desc}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.name &&
            this.state.eventKind && this.state.date && this.state.desc &&
            'dim pointer'}`}
            disabled={!this.state.name || !this.state.eventKind || !this.state.date || !this.state.desc }
            type="submit"
            value="Update"
          />
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { id, name, eventKind, date, desc } = this.state
    await this.props.updateEventMutation({
      variables: { id, name, eventKind, date, desc },
    })
    this.props.history.replace('/events')
  }
}

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEventMutation($id: ID!, $name: String!, $eventKind: EventKind!, $date: DateTime!, $desc: String!) {
    updateEvent(id: $id, name: $name, eventKind: $eventKind, date: $date, desc: $desc) {
      id
      name
      eventKind
      date
      desc
    }
  }
`

const UpdateEventWithMutation = graphql(UPDATE_EVENT_MUTATION, {
  name: 'updateEventMutation', // name of the injected prop: this.props.createDraftMutation...
})(UpdateEvent)

export default withRouter(UpdateEventWithMutation)
