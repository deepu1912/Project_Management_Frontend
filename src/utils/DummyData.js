const DummyData = [
    {
        id: 1,
        projectName: "Project X",
        tasksCompleted: 5,
        totalTasks: 10,
        status: "In Progress",
        members: ["Alice", "Bob"],
        subTasks: [
            {
              id: "1a",
              name: "Task 1",
              status: "Done",
              completedTasks: 1,
              totalTasks: 1,
              members: ["Alice"]
            },
            {
              id: "1b",
              name: "Task 2",
              status: "In Progress",
              completedTasks: 2,
              totalTasks: 5,
              members: ["Bob"]
            },
            {
              id: "1c",
              name: "Task 3",
              status: "Pending",
              completedTasks: 0,
              totalTasks: 3,
              members: ["Alice", "Bob"]
            }
          ]
          
      },
      {
        id: 2,
        projectName: "Project Y",
        tasksCompleted: 2,
        totalTasks: 5,
        status: "In Progress",
        members: ["John", "Sara"],
        subTasks: [
            {
              id: "1a",
              name: "Task 1",
              status: "Done",
              completedTasks: 1,
              totalTasks: 1,
              members: ["John"]
            },
            {
              id: "1b",
              name: "Task 2",
              status: "In Progress",
              completedTasks: 2,
              totalTasks: 5,
              members: ["Sara"]
            },
            {
              id: "1c",
              name: "Task 3",
              status: "Pending",
              completedTasks: 0,
              totalTasks: 3,
              members: ["John","Sara"]
            }
          ]
          
      },
]

export default DummyData