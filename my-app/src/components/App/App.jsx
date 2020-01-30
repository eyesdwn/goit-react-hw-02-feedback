import React, { Component} from 'react';
import Statistics from "../Statistics/Statistics";
import Section from "../Section/Section";
import FeedbackOptions from "../FeedbackOptions/FeedbackOptions";
import Notification from "../Notification/Notification";


export default class App extends Component {
    state = {
      good: 0,
      neutral: 0,
      bad: 0
    };

    static defaultProps = {
        title: 'Please leave feedback'
    };

    onLeaveFeedback = (e) => {
        const step = 1;
        const { name } = e.target;
        this.setState(state => ({
            [name]: state[name] + step
        }));
    };

    countTotalFeedback = () => {
        const { good, neutral, bad} = this.state;
        return good + neutral + bad;
    };

    countPositivePercentage = () => {
        const { good } = this.state;
        const total = this.countTotalFeedback();
        return Math.round((good * 100) / total);
    };

    render() {
        const { good, neutral, bad } = this.state;
        return (
            <>
              <Section title={this.props.title}>
                <FeedbackOptions onLeaveFeedback={this.onLeaveFeedback} />
                {this.countTotalFeedback() > 0 ? (
                    <Statistics good={good} neutral={neutral} bad={bad} total={this.countTotalFeedback()} positivePercentage={this.countPositivePercentage()}/>
                ) : (
                    <Notification message="No feedback given" />
                )}
              </Section>
            </>
        );
    }
}


