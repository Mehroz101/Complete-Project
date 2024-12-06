export const reservations = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    spaceId: "A101",
    reservationId: "RES123456",
    startDateAndTime: "2023-10-01T10:00:00Z",
    requestTime: "2023-10-01T10:00:00Z",
    endDateAndTime: "2023-10-01T12:00:00Z",
    status: "confirmed",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    spaceId: "B202",
    reservationId: "RES123457",
    startDateAndTime: "2023-10-02T14:00:00Z",
    requestTime: "2023-10-02T14:00:00Z",
    endDateAndTime: "2023-10-02T16:00:00Z",
    status: "pending",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    spaceId: "C303",
    reservationId: "RES123458",
    startDateAndTime: "2023-10-03T09:00:00Z",
    requestTime: "2023-10-03T09:00:00Z",
    endDateAndTime: "2023-10-03T11:00:00Z",
    status: "canceled",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    spaceId: "D404",
    reservationId: "RES123459",
    startDateAndTime: "2023-10-04T13:00:00Z",
    requestTime: "2023-10-04T13:00:00Z",
    endDateAndTime: "2023-10-04T15:00:00Z",
    status: "confirmed",
  },
];

export const usersData = [
  {
    id: 1,
    sno: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    phoneNumber: "1234567890",
    noOfReservations: 5,
    noOfSpaces: 3,
    active: true,
  },
  {
    id: 2,
    sno: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password456",
    phoneNumber: "0987654321",
    noOfReservations: 2,
    noOfSpaces: 1,
    active: false,
  },
  {
    id: 3,
    sno: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "password789",
    phoneNumber: "5551234567",
    noOfReservations: 10,
    noOfSpaces: 5,
    active: true,
  },
  {
    id: 4,
    sno: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    password: "password101",
    phoneNumber: "5557654321",
    noOfReservations: 0,
    noOfSpaces: 2,
    active: true,
  },
  {
    id: 5,
    sno: 5,
    name: "Charlie Black",
    email: "charlie.black@example.com",
    password: "password202",
    phoneNumber: "5559876543",
    noOfReservations: 3,
    noOfSpaces: 4,
    active: false,
  },
  {
    id: 6,
    sno: 6,
    name: "Diana White",
    email: "diana.white@example.com",
    password: "password303",
    phoneNumber: "5556543210",
    noOfReservations: 1,
    noOfSpaces: 3,
    active: true,
  },
  {
    id: 7,
    sno: 7,
    name: "Ethan Green",
    email: "ethan.green@example.com",
    password: "password404",
    phoneNumber: "5553210987",
    noOfReservations: 4,
    noOfSpaces: 2,
    active: true,
  },
  {
    id: 8,
    sno: 8,
    name: "Fiona Blue",
    email: "fiona.blue@example.com",
    password: "password505",
    phoneNumber: "5557890123",
    noOfReservations: 6,
    noOfSpaces: 1,
    active: false,
  },
];
export const spaces = [
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "active",
    CompletedRequests: 12,
    rating: 3.5,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1001,
    name: "Josephine Darakjy",
    country: {
      name: "Egypt",
      code: "eg",
    },
    company: "Chanay, Jeffrey A Esq",
    date: "2019-02-09",
    status: "deactiveted",
    CompletedRequests: 112,
    rating: 3.5,
    representative: {
      name: "Amy Elsner",
      image: "amyelsner.png",
    },
    balance: 82429,
  },
  {
    id: 1002,
    name: "Art Venere",
    country: {
      name: "Panama",
      code: "pa",
    },
    company: "Chemel, James L Cpa",
    date: "2017-05-13",
    status: "deactiveted",
    CompletedRequests: 2,
    rating: 3.5,
    representative: {
      name: "Asiya Javayant",
      image: "asiyajavayant.png",
    },
    balance: 28334,
  },
  {
    id: 1003,
    name: "Lenna Paprocki",
    country: {
      name: "Slovenia",
      code: "si",
    },
    company: "Feltz Printing Service",
    date: "2020-09-15",
    status: "active",
    CompletedRequests: 10,
    rating: 3.5,
    representative: {
      name: "Xuxue Feng",
      image: "xuxuefeng.png",
    },
    balance: 88521,
  },
  {
    id: 1004,
    name: "Donette Foller",
    country: {
      name: "South Africa",
      code: "za",
    },
    company: "Printing Dimensions",
    date: "2016-05-20",
    status: "deactiveted",
    verified: true,
    rating: 3.5,
    representative: {
      name: "Asiya Javayant",
      image: "asiyajavayant.png",
    },
    balance: 93905,
  },
  {
    id: 1005,
    name: "Simona Morasca",
    country: {
      name: "Egypt",
      code: "eg",
    },
    company: "Chapman, Ross E Esq",
    date: "2018-02-16",
    status: "active",
    verified: false,
    activity: 68,
    representative: {
      name: "Ivan Magalhaes",
      image: "ivanmagalhaes.png",
    },
    balance: 50041,
  },
];

export const notifications = [
  {
    id: 1,
    type: "Joined New User",
    title: "New Registration: Finibus Bonorum et Malorum",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    user: "Allen Deu",
    time: "24 Nov 2018 at 9:30 AM",
    color: "bg-green-500",
    textColor: "text-green-500",
  },
  {
    id: 2,
    type: "Space",
    title: "Darren Smith sent new message",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    user: "Darren",
    time: "24 Nov 2018 at 9:30 AM",
    color: "bg-orange-500",
    textColor: "text-orange-500",
  },
  {
    id: 3,
    type: "Review",
    title: "Arin Ganshiram Commented on post",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    user: "Arin Ganshiram",
    time: "24 Nov 2018 at 9:30 AM",
    color: "bg-purple-500",
    textColor: "text-purple-500",
  },
  {
    id: 3,
    type: "Reservation",
    title: "New Reservation: Finibus Bonorum et Malorum",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    user: "Arin Ganshiram",
    time: "24 Nov 2018 at 9:30 AM",
    color: "bg-blue-500",
    textColor: "text-purple-500",
  },
];
export const accounts = [
  {
    id: 1,
    name: "Alice Smith",
    phoneNumber: "123-456-7890",
    amount: 1000.5,
    accountName: "Alice's Savings",
    accountType: "Savings",
    date: new Date().toLocaleDateString(),
    status: "pending",
  },
  {
    id: 2,
    name: "Bob Johnson",
    phoneNumber: "987-654-3210",
    amount: 2500.75,
    accountName: "Bob's Checking",
    accountType: "Checking",
    date: new Date().toLocaleDateString(),
    status: "paid",
  },
  {
    id: 3,
    name: "Charlie Brown",
    phoneNumber: "555-555-5555",
    amount: 1500.0,
    accountName: "Charlie's Business",
    accountType: "Business",
    date: new Date().toLocaleDateString(),
    status: "cancelled",
  },
  {
    id: 4,
    name: "David Wilson",
    phoneNumber: "444-444-4444",
    amount: 3000.0,
    accountName: "David's Investment",
    accountType: "Investment",
    date: new Date().toLocaleDateString(),
    status: "pending",
  },
  {
    id: 5,
    name: "Eva Green",
    phoneNumber: "222-222-2222",
    amount: 500.25,
    accountName: "Eva's Savings",
    accountType: "Savings",
    date: new Date().toLocaleDateString(),
    status: "paid",
  },
  {
    id: 6,
    name: "Frank White",
    phoneNumber: "111-111-1111",
    amount: 750.0,
    accountName: "Frank's Checking",
    accountType: "Checking",
    date: new Date().toLocaleDateString(),
    status: "cancelled",
  },
  {
    id: 7,
    name: "Grace Lee",
    phoneNumber: "333-333-3333",
    amount: 1200.0,
    accountName: "Grace's Savings",
    accountType: "Savings",
    date: new Date().toLocaleDateString(),
    status: "paid",
  },
  {
    id: 8,
    name: "Henry Black",
    phoneNumber: "666-666-6666",
    amount: 900.5,
    accountName: "Henry's Business",
    accountType: "Business",
    date: new Date().toLocaleDateString(),
    status: "paid",
  },
  {
    id: 9,
    name: "Ivy Adams",
    phoneNumber: "777-777-7777",
    amount: 450.0,
    accountName: "Ivy's Checking",
    accountType: "Checking",
    date: new Date().toLocaleDateString(),
    status: "pending",
  },
  {
    id: 10,
    name: "Jack White",
    phoneNumber: "888-888-8888",
    amount: 3000.0,
    accountName: "Jack's Savings",
    accountType: "Savings",
    date: new Date().toLocaleDateString(),
    status: "cancelled",
  },
];