const URL=`https://github.com/login/oauth/authorize`;
const option={
  client_id:'v1.6387712a29956c3b',
};
const queryString=Object.keys(option).map((key)=>{
  return `${key}=${encodeURIComponent(option[key])}`;
}).join('&');

const authUrl=`${URL}?${queryString}`;
const link=document.getElementById('oauth');
link.setAttribute('href',authUrl);