import axios from 'axios';
import config from '../config.js';

const baseURL = config.graphql_base_url;
const deviceManagerBatchUrl = config.device_manager_batch_url;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
});

export const getTemplateById = (token, id) => axios.get(`${baseURL}/template/${id}`, getHeader(token));

export const getTemplateWithParams = (token, params) => axios.get(`${baseURL}/template?${params}`, getHeader(token));

export const getTemplatesInfo = async (token, ids) => {
  const promises = [];
  const values = [];
  ids.forEach((id) => {
    promises.push(axios.get(`${baseURL}/template/${id}`, getHeader(token)).then((response) => {
      if (response.data) {
        const { data } = response;
        values.push({ id: data.id, label: data.label });
      }
    }).catch(() => Promise.resolve(null)));
  });
  await (Promise.all(promises));
  return values;
};


export const deleteTemplate = async (token, id) => axios.delete(`${baseURL}/template/${id}`, getHeader(token));


export const deleteMultipleTemplates = async (token, templateIds) => axios.put(`${deviceManagerBatchUrl}/templates_batch`, { templates: templateIds }, getHeader(token));

export const createTemplate = async (token, template) => axios.post(`${baseURL}/template`, template, getHeader(token));

export const editTemplate = async (token, id, template) => axios.put(`${baseURL}/template/${id}`, template, getHeader(token));
