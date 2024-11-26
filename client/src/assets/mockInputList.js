import { priorityEnum } from "./Priorities";
import { troopsEnum } from "./troops";
import { categories } from "./categories";

const now = new Date();

const inputList = [
  {
    id: 1,
    category: categories.ANWEISEUNG,
    value: "input1",
    priority: priorityEnum.LOW,
    sender: troopsEnum.ANGRIFFSTRUPP,
    reciever: troopsEnum.WASSERTRUPP,
    timestamp: now,
  },
  {
    id: 2,
    category: categories.FAHRZEUG,
    value: "input2",
    priority: priorityEnum.MEDIUM,
    sender: troopsEnum.SCHLAUCHTRUPP,
    reciever: troopsEnum.GRUPPENFÜHRER,
    timestamp: now,
  },
  {
    id: 3,
    category: categories.PERSON,
    value: "input3",
    priority: priorityEnum.HIGH,
    sender: troopsEnum.MASCHINIST,
    reciever: troopsEnum.ZUGFÜHRER,
    timestamp: now,
  },
  {
    id: 4,
    category: categories.GEBÄUDE,
    value: "input4",
    priority: priorityEnum.LOW,
    sender: troopsEnum.EINSATZLEITER,
    reciever: troopsEnum.MEDLER,
    timestamp: now,
  },
  {
    id: 5,
    category: categories.SONSTIGES,
    value: "input5",
    priority: priorityEnum.MEDIUM,
    sender: troopsEnum.ANGRIFFSTRUPP,
    reciever: troopsEnum.WASSERTRUPP,
    timestamp: now,
  },
  {
    id: 6,
    category: categories.ANWEISEUNG,
    value: "input6",
    priority: priorityEnum.HIGH,
    sender: troopsEnum.GRUPPENFÜHRER,
    reciever: troopsEnum.SCHLAUCHTRUPP,
    timestamp: now,
  },
  {
    id: 7,
    category: categories.FAHRZEUG,
    value: "input7",
    priority: priorityEnum.LOW,
    sender: troopsEnum.ZUGFÜHRER,
    reciever: troopsEnum.MASCHINIST,
    timestamp: now,
  },
  {
    id: 8,
    category: categories.PERSON,
    value: "input8",
    priority: priorityEnum.MEDIUM,
    sender: troopsEnum.MEDLER,
    reciever: troopsEnum.EINSATZLEITER,
    timestamp: now,
  },
  {
    id: 9,
    category: categories.GEBÄUDE,
    value: "input9",
    priority: priorityEnum.HIGH,
    sender: troopsEnum.WASSERTRUPP,
    reciever: troopsEnum.ANGRIFFSTRUPP,
    timestamp: now,
  },
  {
    id: 10,
    category: categories.SONSTIGES,
    value: "input10",
    priority: priorityEnum.LOW,
    sender: troopsEnum.GRUPPENFÜHRER,
    reciever: troopsEnum.SCHLAUCHTRUPP,
    timestamp: now,
  },
];

export default inputList;
