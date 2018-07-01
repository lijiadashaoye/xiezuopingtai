import {
  city_data
} from './area.data';
export const getProvince = () => {
  let provindes = [];
  for (let pro in city_data) {
    provindes.push(pro)
  }
  return provindes;
}
export const getCitiesByProvince = (province: string) => {
  if (!province || !city_data[province]) {
    return []
  }
  let cities = [];
  let val = city_data[province];
  for (let city in val) {
    cities.push(city)
  }
  return cities
}
export const getAreaByCity = (province: string, city: string) => {
  if (!province || !city_data[province] || !city_data[province][city]) {
    return []
  }
  return city_data[province][city];
}
