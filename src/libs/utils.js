import _ from "lodash";
import Validator from 'is_js';
  
export function getUser() {
  if (window && window.localStorage) {
    return window.localStorage.getObject('user');
  }
  return null;
}

export function saveUser(value) {
  if (window && window.localStorage) {
    return window.localStorage.saveObject("user", value);
  }

  return null;
}

export function getVendorList(brandList, vendorList, selBrandId) {
  if (!selBrandId) {
    return [];
  }
  const filBrands = brandList.filter(x => x.id === selBrandId);
  const vendors = filBrands[0].vendorList || [];
  let vendorsData = [];
  vendors.forEach(function(vendor, index) {
    const vendors = vendorList.filter(x => x.id === vendor);
    if (vendors.length > 0) {
      vendorsData.push(vendors[0]);
    }
  });
  return vendorsData;
}

export const formatErrors = ({ graphQLErrors, networkError, message }) => {
  let retError = ``;
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      retError += `${retError}
      [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
    });
  }
  if (networkError) {
    retError += `${retError}
    [Network error]: ${networkError}`;
  }
  if (message) {
    retError += `${retError}
    Message: ${message}`;
  }
  retError = 'Something went wrong..!';
  return retError;
};

export function setGridData(gridApi, data = []) {
  if (gridApi) {
    let temp = [];
    data.forEach(function(comp, index) {
      let newComp = { ...comp };
      newComp.id = index + 1;
      temp.push(newComp);
    });
    var server = new FakeServer(temp);
    var datasource = new ServerSideDatasource(server);
    gridApi.setServerSideDatasource(datasource);
  }
}

export const generateCode = (length = 5) => {
  const _getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let timestamp = +new Date();
  let ts = timestamp.toString();
  let parts = ts.split('').reverse();
  let id = '';
  for (let i = 0; i < length; ++i) {
    let index = _getRandomInt(0, parts.length - 1);
    id += parts[index];
  }
  return id;
};

export const trimObject = (obj) => {
  _.each(obj, (v, k) => {
    if (v !== undefined) {
      if (_.isObject(v)) {
        obj[k] = trimObject(v)
      } else {
        obj[k] = typeof v === 'string' ? v.replace(/\s\s+/g, ' ') : v
      }
    }
  });
  return obj;
}

export default function validateInput(data) {
  let errors = {};

  if(Validator.empty(data.email))
      errors.email = 'Email is required.';
  
  if(!Validator.empty(data.email) && !Validator.email(data.email))
      errors.email = 'Invalid Email.'      ;  

  if(Validator.empty(data.password))
      errors.password = 'Password is required.'

  return {
      errors,
      isValid: Object.entries(errors).length === 0 ? true : false
  }
}