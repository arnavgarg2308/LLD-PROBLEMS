export const problems = [
  {
    id: "parking-lot",
    title: "Parking Lot System",
    difficulty: "Medium",
    icon: "🅿️",
    description:
      "Design a scalable parking lot system that supports multiple vehicle types, parking floors, ticket generation, and payments.",
    requirements: [
      "Support multiple vehicle types",
      "Multiple parking floors",
      "Automatic spot allocation",
      "Ticket generation",
      "Payment handling",
    ],
    constraints: [
      "The design should be extensible",
      "New vehicle types should be easy to add",
      "Parking allocation logic should be flexible",
    ],
    hints: [
      "Think about which class owns parking spots.",
      "Separate allocation logic from the ParkingLot class.",
      "Consider using Strategy Pattern for allocation.",
    ],
  },

  {
    id: "elevator-system",
    title: "Elevator System",
    difficulty: "Hard",
    icon: "🛗",
    description:
      "Design an elevator control system that manages multiple elevators and efficiently handles requests.",
    requirements: [
      "Support multiple elevators",
      "Handle internal requests",
      "Handle external requests",
      "Efficient elevator scheduling",
    ],
    constraints: [
      "System should support additional elevators",
      "Scheduling logic should be replaceable",
    ],
    hints: [
      "Separate elevator state from scheduling logic.",
      "Think about request prioritization.",
    ],
  },

  {
    id: "vending-machine",
    title: "Vending Machine",
    difficulty: "Medium",
    icon: "🥤",
    description:
      "Design a vending machine that handles products, inventory, payments, and state transitions.",
    requirements: [
      "Product selection",
      "Inventory management",
      "Payment handling",
      "Return change",
      "State transitions",
    ],
    constraints: [
      "Support new payment methods",
      "Products should be easily configurable",
    ],
    hints: [
      "Think about State Pattern.",
      "Separate payment processing from inventory.",
    ],
  },
];

export const progress = {
  problemsPracticed: 3,
  latestScore: 78,
  improvement: 15,
};