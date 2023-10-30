export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const radius = 6371.0;
  
    const lat1Rad = (Math.PI / 180) * lat1;
    const lon1Rad = (Math.PI / 180) * lon1;
    const lat2Rad = (Math.PI / 180) * lat2;
    const lon2Rad = (Math.PI / 180) * lon2;

    const dLon = lon2Rad - lon1Rad;
    const dLat = lat2Rad - lat1Rad;
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 
    const distance = radius * c;
  
    return distance;
  }