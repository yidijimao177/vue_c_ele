import { request } from "../utils/request";

//获取验证码接口
export const getVerificationCode = (data) => {
  return request({
    url: "posts/sms_send",
    method: "post",
    data,
  });
};

//验证手机号和验证码的接口
export const verification=(data)=>{
    return request({
        url:'posts/sms_back',
        method:'post',
        data
    })
}
