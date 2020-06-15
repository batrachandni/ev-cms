import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import URLS from "../../../utils/urlConstant";
import "./sidenav.scss";

class Sidenav extends Component {
  constructor(props) {
    super(props);
  }

  showPrimaryCategory = () => {
    this.props.history.push(URLS.PrimaryCategory);
  };
  showDashboardPage = () => {
    this.props.history.push(URLS.Dashboard);
  };
  // showSecondaryCategory() {
  //   this.props.history.push(URLS.SecondaryCategory);
  // }
  showVehicleManagement = () => {
    this.props.history.push(URLS.VehicleManagement);
  };
  showRpiManagement = () => {
    this.props.history.push(URLS.RpiManagement);
  };
  showArvalUploads = () => {
    this.props.history.push(URLS.ArvalManagement);
  };
  showTertiaryCategory = () => {
    this.props.history.push(URLS.TertiaryCategory);
  };
  showTermsCondition = () => {
    this.props.history.push(URLS.TheElectricRevolution);
  };
  showOurMission = () => {
    this.props.history.push(URLS.OurMission);
  };
  showFullyElectric = () => {
    this.props.history.push(URLS.ElectricVehicleEvGuide);
  };
  showPartners = () => {
    this.props.history.push(URLS.Partners);
  };

  showEvCharges = () => {
    this.props.history.push(URLS.EvCharges);
  };
  showHyrdrogen = () => {
    this.props.history.push(URLS.Hyrdrogen);
  };

  showHybridPlugin = () => {
    this.props.history.push(URLS.HybridVehicleHevGuide);
  };

  showFullElectric = () => {
    this.props.history.push(URLS.FullElectric);
  };

  showTermsAndCondition = () => {
    this.props.history.push(URLS.TermsAndCondition);
  };

  showCookie = () => {
    this.props.history.push(URLS.Cookie);
  };

  showPrivacyAndPolicy = () => {
    this.props.history.push(URLS.PrivacyAndPolicy);
  };
  showLeasingExplained = () => {
    this.props.history.push(URLS.LeasingExplained);
  };
  showAboutUs = () => {
    this.props.history.push(URLS.PlugInHybridPhevGuide);
  };

  showBuyingCar = () => {
    this.props.history.push(URLS.BuyingCar);
  };
  showSellingCar = () => {
    this.props.history.push(URLS.SellingCar);
  };

  showChargingGuide = () => {
    this.props.history.push(URLS.ChargingGuide);
  };

  render() {
    const { isOpen } = this.props;
    return (
      <div className={`left-sidebar ${isOpen ? "active" : "inactive"}`}>
        <nav className="sidenav">
          <div className="sidebar-header">
            <span className="logo">
              <img
                className="main-logo"
                src="/images/CarverterLogo.svg"
                alt="image"
              />
            </span>
          </div>
          <nav className="sidebar-nav">
            <ul>
              {/* <li>
                <a onClick={this.showDashboardPage}>
                  <span>
                    <i className="fa fa-user"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">Dashboard</span>
                </a>
              </li> */}
              <li>
                <a onClick={this.showVehicleManagement}>
                  <span>
                    <i className="fa fa-car"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">Vehicle Management</span>
                </a>
              </li>
              <li>
                <a onClick={this.showPrimaryCategory}>
                  <span>
                    <i className="fa fa-th-large"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">Primary Category</span>
                </a>
              </li>
              {/* <li>
                <a onClick={this.showSecondaryCategory}>
                  <span>
                    <i className="fa fa-file-text"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">Secondary Category</span>
                </a>
              </li> */}
              <li>
                <a onClick={this.showTertiaryCategory}>
                  <span>
                    <i className="fa fa-upload"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">End Use Tags</span>
                </a>
              </li>

              <li>
                <a onClick={this.showRpiManagement}>
                  <span>
                    <i className="fa fa-percent"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">RPI Management</span>
                </a>
              </li>
              <li>
                <a onClick={this.showArvalUploads}>
                  <span>
                    <i className="fa fa-upload"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">Arval Uploads</span>
                </a>
              </li>
              <li>
                <a onClick={this.showHybridPlugin}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">hybrid-vehicle-hev-guide</span>
                </a>
              </li>
              <li>
                <a onClick={this.showAboutUs}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">plug-in-hybrid-phev-guide</span>
                </a>
              </li>
              <li>
                <a onClick={this.showFullyElectric}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">electric-vehicle-ev-guide</span>
                </a>
              </li>
              <li>
                <a onClick={this.showChargingGuide}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">charging-guide</span>
                </a>
              </li>
              <li>
                <a onClick={this.showEvCharges}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">ev-chargers</span>
                </a>
              </li>
              <li>
                <a onClick={this.showLeasingExplained}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">leasing-a-car</span>
                </a>
              </li>
              <li>
                <a onClick={this.showBuyingCar}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">buying-a-car</span>
                </a>
              </li>
              <li>
                <a onClick={this.showSellingCar}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">selling-a-car</span>
                </a>
              </li>
              <li>
                <a onClick={this.showOurMission}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">mission-statement</span>
                </a>
              </li>
              <li>
                <a onClick={this.showTermsCondition}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">the-electric-revolution</span>
                </a>
              </li>
              <li>
                <a onClick={this.showPartners}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">our-partners</span>
                </a>
              </li>

              <li>
                <a onClick={this.showTermsAndCondition}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">terms-and-conditions</span>
                </a>
              </li>
              <li>
                <a onClick={this.showPrivacyAndPolicy}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">privacy-policy</span>
                </a>
              </li>
              <li>
                <a onClick={this.showCookie}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">cookie</span>
                </a>
              </li>

              <li>
                <a onClick={this.showHyrdrogen}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">hydrogen-vehicle-guide</span>
                </a>
              </li>
              {/* <li>
                <a onClick={this.showFullElectric}>
                  <span>
                    <i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;
                  </span>
                  <span className="hide">Full Electric</span>
                </a>
              </li> */}
            </ul>
          </nav>
        </nav>
      </div>
    );
  }
}

export default withRouter(Sidenav);
