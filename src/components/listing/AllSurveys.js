import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import decode from 'jwt-decode';
import _ from 'lodash';
import { Table, Menu, Icon, Dimmer, Loader, Segment, Dropdown } from 'semantic-ui-react';

import SurveyItem from './SurveyItem';
import { getAllSurveys, sendSurvey } from '../../actions/surveys';

class AllSurveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      success: false,
      pageNumber: 1,
      nPerPage: 5,
      nPerPageOptions: [
        {
          key: 1,
          text: '5',
          value: 5,
        },
        {
          key: 2,
          text: '10',
          value: 10,
        },
        {
          key: 3,
          text: '20',
          value: 20,
        },
        {
          key: 4,
          text: 'All',
          value: null,
        }
      ],
      totalPages: 0,
      activeItem: 1,
      column: null,
      direction: null,
      data: []
    };
  }
  async componentDidMount() {

    const userId = {...decode(this.props.user.token)}.id;
    const { pageNumber, nPerPage } = this.state;
    this.setState({ totalPages: Math.ceil(this.props.count / nPerPage) });
    const data = await this.props.getAllSurveys(userId, nPerPage, pageNumber);
    this.setState({ data });
    if (data) this.setState({ loading: false, success: true });

  }

  // Every time we refetch the DB, we can not use componentDidMount
  // to set data to the new surveys, instead we use componentWillReceiveProps
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.surveys })
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });
      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  sendSurvey(surveyId) {
    this.props.sendSurvey(surveyId)
      .then(() => {});
  }

  render() {
    const userId = {...decode(this.props.user.token)}.id;
    const { nPerPage, activeItem, column, direction, data } = this.state;
    const { count } = this.props;
    const handlePageNavigationPrev = () => {
      if (this.state.pageNumber > 1) {
        this.setState({ pageNumber: this.state.pageNumber - 1, activeItem: this.state.pageNumber - 1}, () =>
          this.props.getAllSurveys(userId, this.state.nPerPage, this.state.pageNumber));
      }
    };

    const handleSetPage = (page) => {
      this.setState({ pageNumber: page, activeItem: page }, () =>
        this.props.getAllSurveys(userId, this.state.nPerPage, this.state.pageNumber));
    };

    const handlePageNavigationNext = () => {
      this.setState({ pageNumber: this.state.pageNumber + 1, activeItem: this.state.pageNumber + 1}, () =>
        this.props.getAllSurveys(userId, this.state.nPerPage, this.state.pageNumber));
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(count / nPerPage); i++) {
      pageNumbers.push(i);
    }
    const { loading, nPerPageOptions } = this.state;

    return (<div>
        { loading ?
          <Segment>
            <Dimmer active inverted style={{ height: '100vh'}}>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment> :
      <div>
        <span># of Surveys: <Menu compact>
          <Dropdown
            style={{ padding: '5px 10px 0 10px'}}
            options={nPerPageOptions}
            defaultValue={nPerPageOptions[0].value}
            onChange={(value, data) => this.setState({ nPerPage: data.value })}
          />
        </Menu></span>
      <Table celled striped selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{ width: '60%'}}
              sorted={column === 'title' ? direction : null}
              onClick={this.handleSort('title')}
            >Title</Table.HeaderCell>
            <Table.HeaderCell
              style={{ width: '15%'}}
              sorted={column === 'status' ? direction : null} onClick={this.handleSort('status')}
            >Status</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '25%'}}>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(survey =>
            <SurveyItem
              key={survey._id}
              survey={survey}
              id={survey._id}
              title={survey.title}
              sent={!!survey.dateSent}
              sendSurvey={() => this.sendSurvey(survey._id)}
            />)}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item
                  as='a'
                  icon
                  onClick={() => handlePageNavigationPrev()}
                >
                  <Icon name='left chevron' />
                </Menu.Item>
                {pageNumbers.map(page => <Menu.Item
                  as='a'
                  active={activeItem === page}
                  key={page}
                  id={page}

                  onClick={() => handleSetPage(page)}
                >{page}</Menu.Item> )}
                <Menu.Item
                  as='a'
                  icon
                  onClick={() => handlePageNavigationNext()}
                >
                  <Icon name='right chevron' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      </div> }
      </div>
    )
  }
}

AllSurveys.propTypes = {
  getAllSurveys: PropTypes.func.isRequired,
  surveys: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    _user: PropTypes.string.isRequired
  }).isRequired).isRequired,
  count: PropTypes.number.isRequired,
  sendSurvey: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return ({
    surveys: state.surveys.surveys,
    count: state.surveys.count,
    user: state.user
  });
};

export default connect(mapStateToProps, { getAllSurveys, sendSurvey })(AllSurveys);
