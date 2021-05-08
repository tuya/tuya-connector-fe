import axios from 'axios';

export default function createRequest() {
  const instance = axios.create();

  return instance;
};
