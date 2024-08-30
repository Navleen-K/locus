import {URL} from "../config.js"
export default function Image({src,...rest}) {
  src = src && src.includes('https://')
    ? src
    : `${URL}/uploads/`+src;
  return (
    <img {...rest} src={src} alt={''} />
  );
}