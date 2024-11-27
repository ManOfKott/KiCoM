import { priorityEnum } from "./Priorities";
import { troopsEnum } from "./troops";
import { categories } from "./categories";

const now = new Date();

const inputList = [
  {
    id: 1,
    category: categories.ANWEISEUNG,
    value: "input1",
    sender: troopsEnum.ANGRIFFSTRUPP,
    reciever: troopsEnum.WASSERTRUPP,
    timestamp: now,
    isNew: true,
  },
  {
    id: 2,
    category: categories.FAHRZEUG,
    value: "input2",
    sender: troopsEnum.SCHLAUCHTRUPP,
    reciever: troopsEnum.GRUPPENFÜHRER,
    timestamp: now,
  },
  {
    id: 3,
    category: categories.PERSON,
    value: "input3",
    sender: troopsEnum.MASCHINIST,
    reciever: troopsEnum.ZUGFÜHRER,
    timestamp: now,
  },
  {
    id: 4,
    category: categories.GEBÄUDE,
    value: "input4",
    sender: troopsEnum.EINSATZLEITER,
    reciever: troopsEnum.MELDER,
    timestamp: now,
  },
  {
    id: 5,
    category: categories.SONSTIGES,
    value: "input5",
    sender: troopsEnum.ANGRIFFSTRUPP,
    reciever: troopsEnum.WASSERTRUPP,
    timestamp: now,
  },
  {
    id: 6,
    category: categories.ANWEISEUNG,
    value: "input6",
    sender: troopsEnum.GRUPPENFÜHRER,
    reciever: troopsEnum.SCHLAUCHTRUPP,
    timestamp: now,
  },
  {
    id: 7,
    category: categories.FAHRZEUG,
    value: "input7",
    sender: troopsEnum.ZUGFÜHRER,
    reciever: troopsEnum.MASCHINIST,
    timestamp: now,
  },
  {
    id: 8,
    category: categories.PERSON,
    value: "input8",
    sender: troopsEnum.MELDER,
    reciever: troopsEnum.EINSATZLEITER,
    timestamp: now,
  },
  {
    id: 9,
    category: categories.GEBÄUDE,
    value: "input9",
    sender: troopsEnum.WASSERTRUPP,
    reciever: troopsEnum.ANGRIFFSTRUPP,
    timestamp: now,
  },
  {
    id: 10,
    category: categories.SONSTIGES,
    value: "input10",
    sender: troopsEnum.GRUPPENFÜHRER,
    reciever: troopsEnum.SCHLAUCHTRUPP,
    timestamp: now,
  },
];

inputList.forEach((input) => {
  if (input.prioritized === undefined) {
    input.prioritized = Math.random() < 0.5;
  }
});

export default inputList;
