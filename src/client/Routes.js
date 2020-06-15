import Website from "./layout/Website/Website";
import PrimaryCategory, { loadHomeData } from "./components/views/PrimaryCategory";
import Login from "./components/views/Login";
import  AddPrimaryCategory from "./components/views/AddPrimaryCategory";
import EditPrimaryCategory from "./components/views/EditPrimaryCategory";
import ChangePassword from "./components/views/ChangePassword";
import SecondaryCategory from "./components/views/SecondaryCategory";
import AddSecondaryCategory from "./components/views/AddSecondaryCategory";
import EditSecondaryCategory from "./components/views/EditSecondaryCategory";
import VehicleManagement from "./components/views/VehicleManagement";
import EditVehicleData from "./components/views/Edit_vehicle_data";
import RpiManagement from "./components/views/RpiManagement";
import AddRpiManagement from "./components/views/AddRpi";
import EditRpiList from "./components/views/EditRpi";
import ArvalManagement from "./components/views/ArvalManagement";
import TertiaryCategory from "./components/views/TertiaryCategory";
import EditTertiaryTag  from "./components/views/EditTertiary";
import AddtertiaryTag  from "./components/views/AddTertiary";
import TheElectricRevolution from "./components/views/TheElectricRevolution";
import OurMission from "./components/views/OurMission";
import ElectricVehicleEvGuide from "./components/views/ElectricVehicleEvGuide";
import EvCharges from "./components/views/EvCharges";
import Partners from "./components/views/Partners";
import Hyrdrogen from "./components/views/Hydrogen";
import FullElectric from "./components/views/FullElectric";
import HybridVehicleHevGuide from "./components/views/HybridVehicleHevGuide";
import TermsAndCondition from "./components/views/Terms";
import PrivacyAndPolicy from "./components/views/PrivacyPolicy";
import LeasingExplained from "./components/views/LeasingExplained";
import PlugInHybridPhevGuide from  './components/views/PlugInHybridPhevGuide';
import BuyingCar from './components/views/BuyingCar';
import SellingCar from './components/views/SellingCar';
import ChargingGuide from './components/views/ChargingGuide';
import Cookie from "./components/views/Cookie";
import URLS from "./utils/urlConstant";

const appRoutes = [
  {
    component: Website,
    routes: [
      {
        path: URLS.PrimaryCategory,
        exact: true,
        component: PrimaryCategory
        // loadData: loadHomeData
      },
      {
        path: URLS.Login,
        exact: true,
        component: Login
      },

      {
        path: URLS.AddPrimaryCategory,
        exact: true,
        component: AddPrimaryCategory
      },

      {
        path: `${URLS.EditPrimaryCategory}/:id`,
        exact: true,
        component: EditPrimaryCategory
      },

      {
        path: `${URLS.EditSecondaryCategory}/:id`,
        exact: true,
        component: EditSecondaryCategory
      },

      {
        path: URLS.ChangePassword,
        exact: true,
        component: ChangePassword
      },
      {
        path: URLS.SecondaryCategory,
        exact: true,
        component: SecondaryCategory
      },
      {
        path: URLS.AddSecondaryCategory,
        exact: true,
        component: AddSecondaryCategory
      },
      {
        path: URLS.VehicleManagement,
        exact: true,
        component: VehicleManagement
      },
      {
        path: `${URLS.EditVehicleData}/:id`,
        exact: true,
        component: EditVehicleData
      },
      {
        path: URLS.RpiManagement,
        exact: true,
        component: RpiManagement
      },
      {
        path: `${URLS.EditRpiList}/:id`,
        exact: true,
        component: EditRpiList
      },
      {
        path: URLS.AddRpiManagement,
        exact: true,
        component: AddRpiManagement
      },
      {
        path: URLS.ArvalManagement,
        exact: true,
        component: ArvalManagement
      },
      {
        path: URLS.TertiaryCategory,
        exact: true,
        component: TertiaryCategory,
      },
      {
        path: URLS.AddtertiaryTag,
        exact: true,
        component: AddtertiaryTag,
      },
      {
        path: `${URLS.EditTertiaryTag}/:id`,
        exact: true,
        component: EditTertiaryTag,
      },
      {
        path: URLS.TermsAndCondition,
        exact: true,
        component: TermsAndCondition,
      }, 
      {
        path: URLS.OurMission,
        exact: true,
        component: OurMission,
      }, 
      {
        path: URLS.ElectricVehicleEvGuide,
        exact: true,
        component: ElectricVehicleEvGuide,
      },
      {
        path: URLS.Partners,
        exact: true,
        component: Partners,
      },

      {
        path: URLS.EvCharges,
        exact: true,
        component: EvCharges,
      },
      {
        path: URLS.Hyrdrogen,
        exact: true,
        component: Hyrdrogen,
      },
      {
        path: URLS.HybridVehicleHevGuide,
        exact: true,
        component: HybridVehicleHevGuide,
      },
      {
        path: URLS.FullElectric,
        exact: true,
        component: FullElectric,
      },
      {
        path: URLS.TheElectricRevolution,
        exact: true,
        component: TheElectricRevolution,
      },
      {
        path: URLS.Cookie,
        exact: true,
        component: Cookie,
      },
      {
        path: URLS.PrivacyAndPolicy,
        exact: true,
        component: PrivacyAndPolicy,
      },
      {
        path: URLS.LeasingExplained,
        exact: true,
        component: LeasingExplained,
      },
      {
        path: URLS.PlugInHybridPhevGuide,
        exact: true,
        component: PlugInHybridPhevGuide,
      },
      {
        path: URLS.BuyingCar,
        exact: true,
        component:  BuyingCar,
      },
      {
        path: URLS.SellingCar,
        exact: true,
        component: SellingCar,
      },
      {
        path: URLS.ChargingGuide,
        exact: true,
        component: ChargingGuide,
      },
  
      /* Parameterized data */
      /* {
		path: '/route/:slug',
		exact: true,
		component: Home,
		loadDataWithMatch: loadHomeData
		}, */
    ]
  }
];

export default appRoutes;
