import layout1 from './layout1/Layout1Config';
import layout2 from './layout2/Layout2Config';
import layout3 from './layout3/Layout3Config';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import kr from './navigation-i18n/kr';

i18next.addResourceBundle('en', 'FuseLayout', en);
i18next.addResourceBundle('tr', 'FuseLayout', tr);
i18next.addResourceBundle('ar', 'FuseLayout', ar);
i18next.addResourceBundle('kr', 'FuseLayout', kr);
const FuseLayoutConfigs = {
	layout1,
	layout2,
	layout3
};

export default FuseLayoutConfigs;
