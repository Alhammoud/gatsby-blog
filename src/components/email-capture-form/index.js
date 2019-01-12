import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import PropTypes from 'prop-types'

class EmailCaptureForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
    }
  }

  // Update state each time user edits their email address
  _handleEmailChange = e => {
    this.setState({ email: e.target.value })
  }

  // Post to MC server & handle its response
  _postEmailToMailchimp = (email, attributes) => {
    addToMailchimp(email, attributes)
      .then(result => {
        // Mailchimp always returns a 200 response
        // So we check the result for MC errors & failures
        if (result.result !== 'success') {
          this.setState({
            status: 'error',
            msg: result.msg,
          })
        } else {
          // Email address succesfully subcribed to Mailchimp
          this.setState({
            status: 'success',
            msg: result.msg,
          })
        }
      })
      .catch(err => {
        // Network failures, timeouts, etc
        this.setState({
          status: 'error',
          msg: err,
        })
      })
  }

  _handleFormSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    this.setState(
      {
        status: 'sending',
        msg: null,
      },
      // setState callback (subscribe email to MC)
      this._postEmailToMailchimp(this.state.email, {
        pathname: document.location.pathname,
      })
    )
  }

  render() {
    const { signupMessage, confirmMessage } = this.props

    return (
      <div>
        {this.state.status === 'success' ? (
          <article className="message is-success">
            <div className="message-body">{this.state.msg}</div>
          </article>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: '800' }}>{signupMessage}</p>
            <form id="email-capture" method="post" noValidate>
              <div>
                <div
                  className="field is-grouped"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <input
                    type="email"
                    name="email"
                    className="input"
                    style={{ textAlign: 'center' }}
                    placeholder="you@email.com"
                    onChange={this._handleEmailChange}
                  />
                  <button
                    className="subscribe-button"
                    style={{
                      backgroundColor: '#2962ff',
                      borderRadius: '24px',
                      width: '100px',
                      color: 'white',
                      fontWeight: 700,
                    }}
                    type="submit"
                    onClick={this._handleFormSubmit}
                  >
                    Subscribe
                  </button>
                </div>

                {this.state.status === 'error' && (
                  <article className="message is-danger">
                    <div
                      className="message-body"
                      dangerouslySetInnerHTML={{ __html: this.state.msg }}
                    />
                  </article>
                )}
                <div
                  data-element="guarantee"
                  className="formkit-guarantee"
                  style={{
                    color: 'rgb(77, 77, 77)',
                    fontSize: '13px',
                    fontWeight: 400,
                    fontSize: '13px',
                    textAlign: 'center',
                    margin: '0 0 15px 0',
                  }}
                >
                  <p style={{ margin: 0 }}>I won't send you spam.</p>
                  <p style={{ margin: 0 }}>
                    Unsubscribe at <em>any</em> time.
                  </p>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

EmailCaptureForm.propTypes = {
  signupMessage: PropTypes.string,
  confirmMessage: PropTypes.string,
  containerCss: PropTypes.object,
}
EmailCaptureForm.defaultProps = {
  signupMessage: 'Enjoyed this post? Receive the next one in your inbox!',
  confirmMessage: 'Thank you! Youʼll receive your first email shortly.',
  containerCss: {},
}

export default EmailCaptureForm
