// AppInsights.js
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import history from './history';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: window._ikey_ || process.env.REACT_APP_INSIGTHS_IKEY,
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history }
        }
    }
});
appInsights.loadAppInsights();
export { reactPlugin, appInsights };