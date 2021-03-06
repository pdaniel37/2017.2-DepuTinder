import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SaveAnswerQuestion } from '../actions/saveAnswerQuestion';
import { FetchPropositionData } from '../actions/fetchPropositionData';
import { SaveActualQuestionID } from '../actions/saveActualQuestionID';

class Question extends Component {

  static setButton(answer) {
    if (answer) {
      return 'waves-effect waves-light btn green darken-3';
    } else {
      return 'waves-effect waves-light btn black';
    }
  }

  constructor(props) {
    super(props);
    this.state = { answerYes: false, answerNo: false, answerAbstain: false };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      500,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  verifyAnswerInAnsweredQuestions(questions, answerID, answerValue, propositionID) {
    const MAX_INDEX_QUESTION_ARRAY = 9;
    const NEXT_QUESTION = 1;
    const answer = {
      answerID: propositionID,
      answer: answerValue,
    };

    this.props.sendAnswer(questions, answer);

    if (this.props.actualQuestionID < MAX_INDEX_QUESTION_ARRAY) {
      this.props.sendID(this.props.actualQuestionID + NEXT_QUESTION);
    } else {
      this.props.sendID(0);
    }
  }

  tick() {
    const answered = this.props.answeredQuestions;

    for (let answeredQuestionID = 0; answeredQuestionID < answered.length;
      answeredQuestionID += 1) {
      answeredQuestionID = this.changeStatusOfButton(answeredQuestionID, answered);
    }
  }

  changeStatusOfButton(answeredQuestionID, answered) {
    const answeredID = answeredQuestionID;
    const YES = 1;
    const NO = -1;
    if (answered[answeredID].answerID === (this.props.actualQuestionID + 1)) {
      if (answered[answeredID].answer === YES) {
        this.setState({ answerYes: true });
        this.setState({ answerNo: false });
        this.setState({ answerAbstain: false });
      } else if (answered[answeredID].answer === NO) {
        this.setState({ answerYes: false });
        this.setState({ answerNo: true });
        this.setState({ answerAbstain: false });
      } else {
        this.setState({ answerYes: false });
        this.setState({ answerNo: false });
        this.setState({ answerAbstain: true });
      }
      return answered.length;
    } else {
      this.setState({ answerYes: false });
      this.setState({ answerNo: false });
      this.setState({ answerAbstain: false });
    }
    return answeredID;
  }

  render() {
    const questionID = this.props.actualQuestionID;
    const propositions = this.props.propositions;
    const propositionID = this.props.propositions[questionID].id;
    const actionID = questionID;
    const YES = 1;
    const NO = -1;
    const ABSTAIN = 0;

    return (
      <div className="card" id="questionCard">
        <div className="card-content yellow accent-3" id="questionCardContent">
          <center>
            <h3 className="grey-text text-darken-3" id="cardTitle">
              <b>Votação { propositions[questionID].propositionID }</b>
            </h3>
            <i className="material-icons activator right" id="cardHelpIcon">help</i>
            <div className="card-title grey-text text-darken-3" id="questionText">
              <p>{ propositions[questionID].propositionTitle }</p>
            </div>
            <ul id="questionButtonsPanel">
              <li id="questionButtonsPanelFirstButton">
                <a id="yesButton" className={Question.setButton(this.state.answerYes)} onClick={() => this.verifyAnswerInAnsweredQuestions(this.props.answeredQuestions, actionID, YES, propositionID)}>
                Sou a favor
                </a>
              </li>
              <br />
              <li id="questionButtonsPanelSecondButton">
                <a id="noButton" className={Question.setButton(this.state.answerNo)} onClick={() => this.verifyAnswerInAnsweredQuestions(this.props.answeredQuestions, actionID, NO, propositionID)}>
                Sou contra
                </a>
              </li>
              <br />
              <li id="questionButtonsPanelThirdButton">
                <a id="abstainButton" className={Question.setButton(this.state.answerAbstain)} onClick={() => this.verifyAnswerInAnsweredQuestions(this.props.answeredQuestions, actionID, ABSTAIN, propositionID)}>
                Me abstenho
                </a>
              </li>
            </ul>
          </center>
        </div>
        <div className="card-reveal" id="cardReveal">
          <span id="cardRevealPropositionTitle" className="card-title grey-text text-darken-4">{ propositions[questionID].propositionTitle }<i className="material-icons right">close</i></span>
          <p id="cardRevealPropositionParagraph">{ propositions[questionID].propositionDescription }</p>
          <div className="propositionAuthor">{ propositions[questionID].propositionAuthor }</div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  actualQuestionID: PropTypes.number,
  propositions: PropTypes.array,
  sendAnswer: PropTypes.func,
  answeredQuestions: PropTypes.array,
  sendID: PropTypes.func,
};

Question.defaultProps = {
  actualQuestionID: 0,
  propositions: [],
  sendAnswer() {},
  answeredQuestions: [],
  sendID() {},
};

function mapStateToProps(state) {
  return {
    answeredQuestions: state.answeredQuestions,
    propositions: state.propositions,
    actualQuestionID: state.actualQuestionID,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDataForQuestion() {
      dispatch(FetchPropositionData());
    },
    sendAnswer(question, answer) {
      dispatch(SaveAnswerQuestion(question, answer));
    },
    sendID(questionID) {
      dispatch(SaveActualQuestionID(questionID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
