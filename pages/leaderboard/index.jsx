import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";

const columns = [
  { name: "RANK", uid: "rank" },
  { name: "NAME", uid: "name" },
  { name: "SCORE", uid: "score" },
  { name: "REWARD", uid: "reward" },
];

const users = [
  {
    id: 1,
    name: "Anmol Wadhwa",
    score: 900,
    reward: "Redeem",
    link: "https://mintable.app/collectibles/item/CARBON-CLOUD-GOLD-FIRST-NFT-Mintable-Shared-Gasless-store/0xc23d925684919c1619f13427817d3fee6c24debb:63111728731176396800665891498485385040166873119701738623491888632060168127592",
  },
  {
    id: 2,
    name: "Chandan Kumar",
    score: 850,
    reward: "Redeem",
    link: "https://mintable.app/collectibles/item/CARBON-CLOUD-GOLD-SECOND-NFT-Mintable-Shared-Gasless-store/0xc23d925684919c1619f13427817d3fee6c24debb:63111728731176396800665891498485385040166873119714122716572507788423093057621",
  },
  {
    id: 3,
    name: "Sairam",
    score: 700,
    reward: null,
    link: null,
  },
  {
    id: 4,
    name: "Sahil",
    score: 650,
    reward: null,
    link: null,
  },
  {
    id: 5,
    name: "Aayush",
    score: 500,
    reward: null,
    link: null,
  },
  {
    id: 6,
    name: "Shreya",
    score: 450,
    reward: null,
    link: null,
  },
  {
    id: 7,
    name: "Pranav",
    score: 400,
    reward: null,
    link: null,
  },
  {
    id: 8,
    name: "Gautam",
    score: 350,
    reward: null,
    link: null,
  },
];

export default function Leaderboard() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "rank":
        return (
          <div>
            <p className="text-bold text-lg capitalize text-default-400">
              {user?.id}
            </p>
          </div>
        );
      case "name":
        return (
          <div>
            <p className="text-bold text-lg capitalize text-default-400">
              {user?.name}
            </p>
          </div>
        );
      case "score":
        return (
          <div>
            <p className="text-bold text-lg capitalize text-default-400">
              {user?.score}
            </p>
          </div>
        );
      case "reward":
        return (
          <div>
            <p className="text-bold text-lg capitalize text-blue-400">
              <Link href={user?.link} isExternal>
                {user?.reward}
              </Link>
            </p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex justify-center text-xl gap-3 mx-40 pl-6 pt-10 pb-5 rounded-lg">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns} className="">
          {(column) => (
            <TableColumn key={column.uid} align="start" className="text-lg">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
