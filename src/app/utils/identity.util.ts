import {
  GB2260
} from './identity.data';

export const extractInfo = (idNo: string) => {
  let addrPart = idNo.substring(0, 6);
  let birthPart = idNo.substring(6, 14);
  return {
    addrCode: addrPart,
    dateOfBirth: birthPart
  }
}
export const isValidAddr = (addr: string) => {
  return GB2260[addr] !== undefined;
}

export const getAddrByCode = (code: string) => {
  let province = GB2260[code.substring(0, 2) + '0000'];
  let city = GB2260[code.substring(0, 4) + '00'].replace(province, '');
  let district = GB2260[code].replace(province + city, '');
  return {
    province: province,
    city: city,
    district
  }
}
