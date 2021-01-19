export const OPTIONS = {
  asthmaTypeOptions: [
    "allergisch astma",
    "ernstig astma",
    "inspanningsastma",
    "niet-allergisch astma"
  ],
  triggerOptions: [
    {
      id: 0,
      db_id: "5fd203f58808e50da4b20ffb",
      key:'Pollen',
      checked:false,
    },
    {
      id: 1,
      db_id: "5fd203f58808e50da4b20ffc",
      key: 'Koud weer',
      checked: false,
    },
    {
      id: 2,
      db_id: "5fd205a7ae9e8830a0b4144c",
      key:'Mist',
      checked: false,
    },
    {
      id: 3,
      db_id: "5fd72c36159ec224dcf5bba8",
      key: 'Parfum',
      checked: false,
    },
    {
      id: 4,
      db_id: "5fd72caf159ec224dcf5bba9",
      key:'Huisstofmijt',
      checked:false,
    },
    {
      id: 5,
      db_id: "5fd72caf159ec224dcf5bbaa",
      key: 'Huisdieren',
      checked:false,
    },
    {
      id: 6,
      db_id: "5fd72caf159ec224dcf5bbab",
      key: 'Huidschilfers',
      checked:false,
    },
    {
      id: 7,
      db_id: "5fd72caf159ec224dcf5bbac",
      key: 'Stuifmeel',
      checked:false,
    },
    {
      id: 8,
      db_id: "6000a181928b7a18041b5657",
      key: 'Vocht',
      checked:false,
    },
    {
      id: 9,
      db_id: "6000a181928b7a18041b5658",
      key: 'Regen',
      checked:false,
    },
    {
      id: 10,
      db_id: "6000a181928b7a18041b5659",
      key: 'Warmte',
      checked:false,
    },
  ],
  medicationOptions: [
    {
      id: 0,
      db_id: "5fd24528c2b3e20d18bb00b9",
      key:'Budesonide',
      checked:false,
    },
    {
      id: 1,
      db_id: "5fd24528c2b3e20d18bb00ba",
      key: 'Salbutamol',
      checked:false,
    },
    {
      id: 2,
      db_id: "5ffecbc315e9e4415c9d2f28",
      key: 'Vilanterol',
      checked:false,
    },
    {
      id: 3,
      db_id: "5ffecbc415e9e4415c9d2f29",
      key: 'Fenoterol',
      checked:false,
    },
    {
      id: 4,
      db_id: "5ffecbc415e9e4415c9d2f2a",
      key: 'Beclomethason',
      checked:false,
    },
    {
      id: 5,
      db_id: "5ffecbc415e9e4415c9d2f2b",
      key: 'Cidesonide',
      checked:false,
    },
    {
      id: 6,
      db_id: "5ffecbc415e9e4415c9d2f2c",
      key: 'Terbutaline',
      checked:false,
    },
    {
      id: 7,
      db_id: "5ffecbc415e9e4415c9d2f2d",
      key: 'Tioropium',
      checked:false,
    },
    {
      id: 8,
      db_id: "5ffecbc415e9e4415c9d2f2e",
      key: 'Olodaterol',
      checked:false,
    },
    {
      id: 9,
      db_id: "5ffecbc415e9e4415c9d2f2f",
      key: 'Salmeterol',
      checked:false,
    },

  ],
  ademrem: {
    title: 'Ademrem',
    explanation: 'De ademrem is bedoeld om kortademigheidsklachten te verlichten. Hierbij is het de bedoeling om zowel langzamer als ook minder diep te gaan ademen.',
    stepOne: 'Langzaam inademen via de neus. Let er op dat je hierbij niet diep inademt. Bij de inademing dient de neus goed doorgankelijk te zijn.',
    stepTwo: 'Hierna direct rustig uitademen via de getuite lippen. De uitademing wordt hiermee langer dan de inademing.',
  },
  diepInademen: {
    title: 'Diep inademen',
    explanation: 'Diep inademen zorgt ervoor dat de longen en luchtwegen zich goed ontplooien. Dit kan verklevingen van longblaasjes (atelectase) voorkomen en verbetert de luchtverversing.',
    stepOne: 'Langzaam inademen (maximaal) via de neus. Bij de inademing dient de neus goed doorgankelijk te zijn. Dit mag niet te veel inspanning kosten.',
    stepTwo: 'Rustig uitademen via de getuite lippen',
  },
  diepUitademen: {
    title: 'Diep uitademen',
    explanation: 'Diep uitademen zorgt voor een betere luchtverversing. Met deze oefening wordt bovendien het middenrif extra opgerekt.',
    stepOne: 'Rustig inademen (niet maximaal) via de neus. Bij de inademing dient de neus goed doorgankelijk te zijn. Dit mag niet te veel inspanning kosten',
    stepTwo: 'Langzaam maximaal uitademen met getuite lippen.',
  },
  huffen: {
    title: 'Huffen',
    explanation: 'Bespreek deze techniek altijd eerst met uw arts. Bij huffen wordt het vastzittende slijm in de longen los gemaakt.',
    stepOne: 'Adem normaal of diep in via de neus. Bij de inademing dient de neus goed doorgankelijk te zijn.',
    stepTwo: 'Open de mond en stoot de ingeademde lucht in een keer krachtig of rustig uit.',
  }
}
