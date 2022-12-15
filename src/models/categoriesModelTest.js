let categories = [
  { id: 0, name: "IT & Software", numberCourse: 10 },
  { id: 1, name: "Network", numberCourse: 0 },
  { id: 2, name: "Operating System", numberCourse: 10 },
  { id: 3, name: "Web development", numberCourse: 10 },
  { id: 4, name: "Javascript", numberCourse: 10 },
  { id: 5, name: "ReactJS", numberCourse: 10 },
  { id: 6, name: "Nodejs", numberCourse: 0 },
  { id: 7, name: "Software testing", numberCourse: 0 },
  { id: 8, name: "Postman", numberCourse: 10 },
  { id: 9, name: "API testing", numberCourse: 10 },
  { id: 10, name: "Java", numberCourse: 10 },
];

export default {
  getAll() {
    return categories;
  },

  findById(id) {
    let result;

    categories.forEach((category) => {
      if (category.id === id) {
        result = category;
      }
    });

    return result;
  },
};
