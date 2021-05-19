import React from "react";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";
import { Game } from "../../components/types/Games";
import Link from "next/link";

const GamesMainPage: React.FC<{ games: Game[] }> = ({ games }) => {
  return (
    <div>
      <h1>GAME PAGE</h1>
      <div>
        <ul>
          {games.map((game, index) => {
            if (game.cover === undefined) {
              return (
                <li key={game.id}>
                  <Link href={`/games/${game.slug}`}>{game.name}</Link>,
                  {game.price / 100}$
                </li>
              );
            } else {
              return (
                <div>
                  <li key={index}>
                    <Link href={`/games/${game.slug}`}>{game.name}</Link>,{" "}
                    {game.price / 100}$
                  </li>
                  <img src={game.cover.url} alt="" />
                </div>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default GamesMainPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const games = await mongodb.db().collection("games").find().toArray();

  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  };
};
