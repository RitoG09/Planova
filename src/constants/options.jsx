export const selectTravelesList = [
  {
    id: 1,
    title: "Solo",
    desc: "A sole travels in exploration",
    icon: "🚵",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two traveles in tandem",
    icon: "🧑‍🤝‍🧑",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A gorup of fun loving people",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "🚌",
    people: "5 to 10 People",
  },
];

export const selectBudgetOption = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay concious about expenditure",
    icon: "$",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Average expenditure",
    icon: "$$",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "$$$",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for location :{location}, for {totalDays} for {traveller} with a {budget} budget, Give me a Hotels options list with Hotel name, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place details, place image url, geo coordinates, ticket pricing, rating, time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format";
