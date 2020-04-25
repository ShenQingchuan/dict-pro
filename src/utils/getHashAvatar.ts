import crypto from "crypto";
import Identicon from "identicon.js";

// 生成默认头像
export function getHashAvatar(userName: string | undefined): string {
  let hash = crypto.createHash("md5");
  hash.update(userName || "default-dict-pro-user"); // 传入用户名
  let imgData = new Identicon(hash.digest("hex")).toString();
  return "data:image/png;base64," + imgData; // 这就是头像的base64码
}
