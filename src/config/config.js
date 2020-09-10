const development = {
  endpoints: {
    backend: 'http://localhost:8080/'
  }
};

const staging = {
  endpoints: {
    backend: 'https://api.staging.semillas.atixlabs.com/'
  }
};

const uat = {
  endpoints: {
    backend: 'https://api.uat.semillas.atixlabs.xyz/'
  }
};

const production = {
  endpoints: {
    backend: 'https://api.semillas.didi.org.ar/'
  }
};

const test = {
  endpoints: {
    backend: 'http://localhost:3011' // FIXME: Set this
  }
};

const configs = {
  development,
  staging,
  uat,
  production,
  test
};

let environment = window._env_ || 'development';

export const setEnvironment = customEnvironment => (environment = customEnvironment);

export const config = configs[environment];
