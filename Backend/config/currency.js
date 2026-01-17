/**
 * Currency and Regional Configuration for Backend
 */

const CURRENCY = {
  code: 'INR',
  symbol: '₹',
  name: 'Indian Rupee',
};

const REGION = {
  country: 'India',
  city: 'Mumbai',
  state: 'Maharashtra',
  address: '123 Fashion Street, Mumbai, India 400001',
  phoneCode: '+91',
  timezone: 'IST',
};

const CONTACT = {
  email: 'hello@lunar.com',
  phone: '+91 (98765) 43210',
  address: REGION.address,
};

module.exports = {
  CURRENCY,
  REGION,
  CONTACT,
};
