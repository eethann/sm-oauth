
import crypto from 'crypto';
import * as secrets from "docker-secrets-nodejs";
import dotenv from 'dotenv';

dotenv.config();

export const ov_config = {
  server_port: getConfig("server_port", false, 8080),
  wsbase: getConfig("wsbase", false, 'http://localhost:8080'),
  wabase: getConfig("wabase", false, 'http://localhost:3000'),
  ip_header: getConfig("client_ip_header", false, null),
  redis_host: getConfig("redis_host", false, 'localhost'),
  redis_port: getConfig("redis_port", false, 6379),
  session_secret: getConfig("session_secret", false, crypto.randomBytes(48).toString('hex')),
  jwt_pub_key: getConfig("jwt_pub_key", true, null),
  jwt_prv_key: getConfig("jwt_prv_key", true, null),
  jwt_iss: getConfig("jwt_iss", false, 'example.com'),
  jwt_token_test: getConfig("jwt_token_test", false, false),
  token_disclaimer: getConfig("token_disclaimer", true, null),
  DEBUG: getConfig("debug", false, false),
};

export function getConfig(item, required, def) {
  let value = secrets.get(item);
  if (!value) {
    if (required) {
      let msg = "Missing config: "+item.toUpperCase();
      console.log(msg);
      throw msg;
    } else {
      return def;
    }
  }
  return value;
}
