const development = {
  endpoints: {
    backend: 'http://localhost:8080/'
  }
};

const next = {
  endpoints: {
    backend: 'https://api.semillas.next.didi.org.ar/'
  }
};

const alpha = {
  endpoints: {
    backend: 'https://api.semillas.didi.org.ar/'
  }
};

const beta = {
  endpoints: {
    backend: 'https://api.semillas.beta.didi.org.ar/'
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
  next,
  alpha,
  beta,
  production,
  test
};

let environment = window._env_ || 'development';

export const setEnvironment = customEnvironment => (environment = customEnvironment);

export const config = configs[environment];
