import React, { Component } from 'react';

class AdminFormQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '', subtitle: '', description: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const valor = target.id;
    if (valor === 'questionTitle') {
      this.setState({ title: event.target.value });
    } else {
      this.setState({ subtitle: event.target.value });
    }
  }

  handleSubmit(event) {
    console.log(this.state.title);
    event.preventDefault();
  }

  render() {
    console.log(this.state.title);
    console.log(this.state.subtitle);
    return (
      <div>
        <div className="card-content white accent-3">
          <i className="material-icons activator right" id="cardHelpIcon">help</i>
          <form onSubmit={this.handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="input-field col s12" id="inputTitle">
                  <input
                    id="questionTitle"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    data-length="50"
                  />
                  <label htmlFor="questionTitle">Titulo</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12" id="inputSubtitle">
                  <input
                    id="questionSubTitle"
                    type="text"
                    value={this.state.subtitle}
                    onChange={this.handleChange}
                    data-length="50"
                  />
                  <label htmlFor="questionSubTitle">SubTitulo</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12" id="inputDescription">
                  <textarea
                    id="questionDescription" className="materialize-textarea" data-length="120"
                    onChange={event => this.handleDescriptionChange(event.target.value)}
                  />
                  <label htmlFor="questionDescription">Descrição</label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="row" id="adminQuestionButtonsRow">
          <div className="col s6 m6 l6" id="sendButtonCollumn">
            <center>
              <a
                className="waves-effect waves-light btn black yellow-text text-accent-3"
                id="sendButton"
              >
                <i className="material-icons right" id="sendButtonIcon">send</i>Enviar
              </a>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminFormQuestion;
