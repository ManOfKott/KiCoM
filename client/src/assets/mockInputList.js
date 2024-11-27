import { troopsEnum } from "./troops";
import { categories } from "./categories";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";
const now = new Date();

const inputList = [
  {
    id: 1,
    category: categories.ANWEISEUNG,
    sender: troopsEnum.ANGRIFFSTRUPP,
    reciever: troopsEnum.WASSERTRUPP,
    timestamp: now,
    isNew: true,
    message: loremIpsum,
  },
  {
    id: 2,
    category: categories.FAHRZEUG,
    sender: troopsEnum.SCHLAUCHTRUPP,
    reciever: troopsEnum.GRUPPENFÜHRER,
    timestamp: now,
    message: loremIpsum,
  },
  {
    id: 3,
    category: categories.PERSON,
    sender: troopsEnum.MASCHINIST,
    reciever: troopsEnum.ZUGFÜHRER,
    timestamp: now,
    message: loremIpsum,
  },
  {
    id: 4,
    category: categories.GEBÄUDE,
    sender: troopsEnum.EINSATZLEITER,
    reciever: troopsEnum.MELDER,
    timestamp: now,
    message: loremIpsum,
  },
  {
    id: 5,
    category: categories.SONSTIGES,
    sender: troopsEnum.ANGRIFFSTRUPP,
    reciever: troopsEnum.WASSERTRUPP,
    timestamp: now,
    message: loremIpsum,
  },
  {
    id: 6,
    category: categories.ANWEISEUNG,
    timestamp: now,
    message: loremIpsum,
  },
  {
    id: 6,
    category: categories.ANWEISEUNG,
    value: "input6",
    sender: troopsEnum.GRUPPENFÜHRER,
    reciever: troopsEnum.SCHLAUCHTRUPP,
    timestamp: now,
    message: loremIpsum,
  },
  {
    id: 7,
    category: categories.FAHRZEUG,
    value: "input7",
    sender: troopsEnum.ZUGFÜHRER,
    reciever: troopsEnum.MASCHINIST,
    timestamp: now,
    message: loremIpsum,
  },
  {
    id: 8,
    category: categories.PERSON,
    value: "input8",
    sender: troopsEnum.MELDER,
    reciever: troopsEnum.EINSATZLEITER,
    timestamp: now,
    message: loremIpsum,
  },
  {
    id: 9,
    category: categories.GEBÄUDE,
    value: "input9",
    sender: troopsEnum.WASSERTRUPP,
    reciever: troopsEnum.ANGRIFFSTRUPP,
    timestamp: now,
    message: loremIpsum,
  },
  {
    id: 10,
    category: categories.SONSTIGES,
    value: "input10",
    sender: troopsEnum.GRUPPENFÜHRER,
    reciever: troopsEnum.SCHLAUCHTRUPP,
    timestamp: now,
    message: loremIpsum,
  },
];

inputList.forEach((input) => {
  if (input.prioritized === undefined) {
    input.prioritized = Math.random() < 0.5;
  }
});

export default inputList;
