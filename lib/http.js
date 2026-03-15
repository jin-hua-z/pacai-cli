// 通过 axios 处理请求
const axios = require('axios');

axios.interceptors.response.use(res => {
  return res.data;
}, error => {
  console.error(`GitHub API request failed: ${error.message}`);
  return Promise.reject(error);
});

/**
 * 获取模板列表
 * @returns Promise<Array>
 */
async function getRepoList() {
  return axios.get('https://api.github.com/users/jin-hua-z/repos');
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise<Array>
 */
async function getTagList(repo) {
  return axios.get(`https://api.github.com/repos/jin-hua-z/${repo}/tags`);
}

module.exports = {
  getRepoList,
  getTagList
};
