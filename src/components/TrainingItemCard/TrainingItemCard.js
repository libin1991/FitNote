import React, { Component } from 'react';
import { Card, Typography, IconButton } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import RecorderDialog from '../RecorderDialog';
import PropTypes from 'prop-types';
import RecorderService from '../../service/RecorderService';
import ProgressBar from './ProgressBar';
import DropDownMenu from '../DropDownMenu';
import Notify from '../../utils/Notify';

class TrainingItemCard extends Component {
  state = {
    open: false,
    recordData: [],
    goalProgress: 0,
    extraProgress: 0
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleSubmit = value => {
    const { data } = this.props;
    RecorderService.add({
      training_id: data.id,
      ...value
    }).then(res => {
      this.handleClose();
      this.fetchData(data.id);
    });
  };
  componentDidMount() {
    const { data } = this.props;
    this.fetchData(data.id);
  }
  fetchData = id => {
    const { data } = this.props;
    RecorderService.getTrainingRecord(id).then(res => {
      if (res.data.length <= data.goal) {
        this.setState({
          recordData: res.data,
          goalProgress: (res.data.length / data.goal).toFixed(2) * 100
        });
      } else {
        this.setState({
          recordData: res.data,
          goalProgress: 100,
          extraProgress: (res.data.length / data.goal - 1).toFixed(2) * 100
        });
      }
    });
  };
  handleRemove = () => {
    const { data, remove } = this.props;
    remove(data.id);
  };
  handleBackout = () => {
    const { recordData } = this.state;
    const lastOne = recordData[recordData.length - 1];
    RecorderService.remove(lastOne.id).then(res => {
      this.fetchData(this.props.data.id);
      Notify.success(res.message);
    });
  };

  render() {
    const { classes, data, exhibition } = this.props;
    const { recordData, goalProgress, extraProgress } = this.state;
    return (
      <Card className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h6" gutterBottom>
            {data.name || '---'}
            <sup className={classes.supText}>
              目标组数：
              {data.goal}
            </sup>
          </Typography>
          {!exhibition && (
            <DropDownMenu
              className={classes.test}
              remove={this.handleRemove}
              backout={recordData.length > 0 ? this.handleBackout : null}
            />
          )}
        </div>
        <div className={classes.table}>
          <div className={classNames(classes.col, classes.tableHeader)}>
            <span>重量(KG)</span>
            <span>次数(RM)</span>
          </div>
          <div className={classes.recordItemWrap}>
            {recordData.map(item => (
              <div
                key={item.id}
                className={classNames(classes.col, classes.recordItem)}
              >
                <span>{item.weight}</span>
                <span>{item.set}</span>
              </div>
            ))}
          </div>
          {!exhibition && (
            <IconButton
              className={classes.iconButton}
              aria-label="add"
              onClick={this.handleClickOpen}
            >
              <Add />
            </IconButton>
          )}
        </div>
        <ProgressBar goal={goalProgress} extra={extraProgress} />
        {!exhibition && (
          <RecorderDialog
            title={data.name}
            open={this.state.open}
            close={this.handleClose}
            submit={this.handleSubmit}
          />
        )}
      </Card>
    );
  }
}

TrainingItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  exhibition: PropTypes.bool,
  remove: PropTypes.func
};

export default withStyles(styles)(TrainingItemCard);
