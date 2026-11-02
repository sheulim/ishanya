export type Place = { id: string; name: string; lat: number; lon: number };

export const PLACES: Place[] = [
  { id: "hyderabad", name: "Hyderabad", lat: 17.385, lon: 78.4867 },
  { id: "bengaluru", name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { id: "mysuru", name: "Mysuru", lat: 12.2958, lon: 76.6394 },
  { id: "mangaluru", name: "Mangaluru", lat: 12.9141, lon: 74.856 },
  { id: "hubballi", name: "Hubballi", lat: 15.3647, lon: 75.124 },
  { id: "chennai", name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { id: "coimbatore", name: "Coimbatore", lat: 11.0168, lon: 76.9558 },
  { id: "madurai", name: "Madurai", lat: 9.9252, lon: 78.1198 },
  { id: "vijayawada", name: "Vijayawada", lat: 16.5062, lon: 80.648 },
  { id: "visakhapatnam", name: "Visakhapatnam", lat: 17.6868, lon: 83.2185 },
  { id: "kochi", name: "Kochi", lat: 9.9312, lon: 76.2673 },
  { id: "thiruvananthapuram", name: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366 },
  { id: "mumbai", name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { id: "pune", name: "Pune", lat: 18.5204, lon: 73.8567 },
  { id: "nagpur", name: "Nagpur", lat: 21.1458, lon: 79.0882 },
  { id: "delhi", name: "Delhi", lat: 28.6139, lon: 77.209 },
  { id: "jaipur", name: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { id: "udaipur", name: "Udaipur", lat: 24.5854, lon: 73.7125 },
  { id: "ahmedabad", name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { id: "lucknow", name: "Lucknow", lat: 26.8467, lon: 80.9462 },
  { id: "varanasi", name: "Varanasi", lat: 25.3176, lon: 82.9739 },
  { id: "patna", name: "Patna", lat: 25.5941, lon: 85.1376 },
  { id: "kolkata", name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { id: "bhubaneswar", name: "Bhubaneswar", lat: 20.2961, lon: 85.8245 },
  { id: "guwahati", name: "Guwahati", lat: 26.1445, lon: 91.7362 },
  { id: "ranchi", name: "Ranchi", lat: 23.3441, lon: 85.3096 },
  { id: "bhopal", name: "Bhopal", lat: 23.2599, lon: 77.4126 },
  { id: "indore", name: "Indore", lat: 22.7196, lon: 75.8577 },
  { id: "raipur", name: "Raipur", lat: 21.2514, lon: 81.6296 },
  { id: "chandigarh", name: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  { id: "amritsar", name: "Amritsar", lat: 31.634, lon: 74.8723 },
  { id: "srinagar", name: "Srinagar", lat: 34.0837, lon: 74.7973 },
];

export function getPlace(id: string): Place {
  return PLACES.find((place) => place.id === id) ?? PLACES.find((place) => place.id === "hyderabad") ?? PLACES[0];
}
