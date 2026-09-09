const problems = [
    {
        id: 1,
        title: "Parking Lot",
        difficulty: "Medium",
        description:
            "Design a parking lot system that supports multiple vehicle types, parking spots, entry, exit and ticket generation.",
        requirements: [
            "Support multiple vehicle types",
            "Support multiple parking spots",
            "Generate parking tickets",
            "Handle vehicle entry and exit",
            "Calculate parking fees"
        ],
        constraints: [
            "System should be extensible",
            "New vehicle types should be easy to add",
            "Parking allocation logic should be flexible"
        ]
    },

    {
        id: 2,
        title: "Elevator System",
        difficulty: "Medium",
        description:
            "Design an elevator system that handles multiple floors, elevator requests and efficient movement.",
        requirements: [
            "Support multiple floors",
            "Handle elevator requests",
            "Move elevators between floors",
            "Handle multiple elevators"
        ],
        constraints: [
            "System should support multiple elevators",
            "Request handling should be flexible",
            "Design should be extensible"
        ]
    },

    {
        id: 3,
        title: "Vending Machine",
        difficulty: "Easy",
        description:
            "Design a vending machine that allows users to select products, make payments and receive products.",
        requirements: [
            "Display available products",
            "Select a product",
            "Accept payment",
            "Return change",
            "Dispense product"
        ],
        constraints: [
            "Machine should handle different products",
            "Payment methods should be extensible",
            "Machine should handle insufficient payment"
        ]
    }
];

const getAllProblems = () => {
    return problems;
};


const getProblemById = (id) => {
    return problems.find((problem) => problem.id === Number(id));
};
module.exports = {
    getAllProblems,
    getProblemById
};