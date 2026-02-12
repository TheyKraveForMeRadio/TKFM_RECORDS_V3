window.TKFM_OWNER = {
  automationEnabled: true,
  toggleAutomation() {
    this.automationEnabled = !this.automationEnabled;
    alert('Automation ' + (this.automationEnabled ? 'ENABLED' : 'DISABLED'));
  }
};
