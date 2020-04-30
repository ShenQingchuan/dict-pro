import crypto from "crypto";
import IdentIcon  from "identicon.js";

// 生成默认头像
export function getHashAvatar(userName: string | undefined): string {
  let hash = crypto.createHash("md5");
  hash.update(userName || "default-dict-pro-user"); // 传入用户名
  let imgData = new IdentIcon(hash.digest("hex"), {
    format: 'svg',
    margin: 0.25,
  }).toString();
  return "data:image/svg+xml;base64," + imgData; // 这就是头像的base64 URL
}
