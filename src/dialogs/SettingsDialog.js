import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import SwipeableViews from 'react-swipeable-views';

import AccountTab from '../tabs/settings/AccountTab';
import AppearanceTab from '../tabs/settings/AppearanceTab';

const styles = {
  light: {
    color: '#000000'
  },

  dark: {
    color: '#ffffff'
  }
};

class SettingsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0
    };
  }

  handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.props.onClose();
    }
  };

  changeTab = (event, value) => {
    this.setState({
      selectedTab: value
    });
  };

  changeIndex = (index) => {
    this.setState({
      selectedTab: index
    });
  };

  render() {
    // Properties
    const { classes, open, fullScreen, user, isVerifyingEmailAddress, colors, types, primaryColor, secondaryColor, type } = this.props;

    // Events
    const { onClose, onVerifyEmailAddressClick, onPrimaryColorChange, onSecondaryColorChange, onTypeChange, onResetClick } = this.props;

    const { selectedTab } = this.state;

    return (
      <Dialog open={open} fullScreen={fullScreen} onClose={onClose} onKeyPress={this.handleKeyPress}>
        <DialogTitle>Settings</DialogTitle>

        <Tabs onChange={this.changeTab} value={selectedTab} variant="fullWidth">
          <Tab classes={{ label: type === 'light' ? classes.light : classes.dark }} label="Account" />
          <Tab classes={{ label: type === 'light' ? classes.light : classes.dark }} label="Appearance" />
        </Tabs>

        <DialogContent>
          <SwipeableViews index={selectedTab} onChangeIndex={this.changeIndex}>
            <AccountTab
              user={user}
              isVerifyingEmailAddress={isVerifyingEmailAddress}
              onVerifyEmailAddressClick={onVerifyEmailAddressClick}
            />

            <AppearanceTab
              colors={colors}
              types={types}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              type={type}
              onPrimaryColorChange={onPrimaryColorChange}
              onSecondaryColorChange={onSecondaryColorChange}
              onTypeChange={onTypeChange}
            />
          </SwipeableViews>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" variant="outlined" onClick={() => { setTimeout(onResetClick, 137.5) }}>Reset</Button>
          <Button color="primary" variant="contained" onClick={onClose}>OK</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool,
  user: PropTypes.object.isRequired,
  isVerifyingEmailAddress: PropTypes.bool.isRequired,
  colors: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

  onClose: PropTypes.func.isRequired,
  onVerifyEmailAddressClick: PropTypes.func.isRequired,
  onPrimaryColorChange: PropTypes.func.isRequired,
  onSecondaryColorChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired
};

export default withStyles(styles)(SettingsDialog);